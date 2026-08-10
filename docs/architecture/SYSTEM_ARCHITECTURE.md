# System Architecture

## 1. The three-layer principle (system invariant)

```
┌────────────────────────────────────────────────────────┐
│ AI INTERPRETATION LAYER (LLM via ai-gateway)           │
│ classify · assist extraction · converse · explain ·    │
│ detect anomalies — MAY PROPOSE, NEVER DECIDE           │
├────────────────────────────────────────────────────────┤
│ DETERMINISTIC TAX ENGINE (pure, typed, versioned)      │
│ all math, eligibility, thresholds, forms, validation   │
├────────────────────────────────────────────────────────┤
│ AUTHORITATIVE KNOWLEDGE LAYER                          │
│ versioned IRS forms/instructions/schemas/business      │
│ rules + source register + state materials              │
└────────────────────────────────────────────────────────┘
```
Enforced structurally: the engine package has **no dependency on any AI module**; AI outputs enter the system only as *proposals* (e.g., `ProposedFact{value, confidence, provenance}`) that become facts solely via deterministic validation + user confirmation.

## 2. Recommended stack (DECISION blocks)

- **Frontend:** Next.js + TypeScript + React + Tailwind + accessible components (Radix-based). WHY: guided-interview UX is form-heavy and stateful; SSR helps performance; team-standard ecosystem. ALTERNATIVES: Remix, SvelteKit. RISK: none significant. **RECOMMENDED.**
- **Backend:** TypeScript (Node/NestJS or equivalent) services. WHY: one language across stack incl. tax engine → shared types from fact graph to UI; strong typing is the engine's safety net. ALTERNATIVE: Python (better ML libs — but doc processing is provider-abstracted anyway). RISK: heavy numeric work needs a decimal library (never IEEE floats for money — use integer cents / big-decimal). **RECOMMENDED: TypeScript everywhere; Python only inside document-processing workers if a specific OCR stack demands it.**
- **Database:** PostgreSQL. Row-level security, JSONB for fact provenance, mature encryption story. **RECOMMENDED.**
- **Object storage:** S3-compatible private buckets, SSE + app-layer encryption, signed URLs.
- **Queue:** Redis + BullMQ for the document pipeline and long-running jobs.
- **Doc processing:** provider abstraction (`DocumentProcessor` interface) over OCR vendors (e.g., Textract/Document AI) + form-template extractors; swappable.
- **AI:** provider-abstracted `ai-gateway` (model/vendor configurable), zero-retention contracts (see AI Data Boundary).
- **Auth:** production IdP (e.g., self-hosted or managed OIDC) with MFA/passkeys, not hand-rolled.
- **Infra:** single cloud, IaC (Terraform), isolated prod account, KMS, secrets manager, private networking.

## 3. Service decomposition (modular monolith first)

`web` (Next.js) · `api` (BFF/REST) · `interview-service` · `document-pipeline` (workers) · `fact-graph-service` · `tax-engine` (pure library, embedded) · `validation-service` · `risk-service` · `explanation-service` · `ai-gateway` · `audit-service` · `admin`. DECISION: modular monolith with enforced module boundaries, extract services later. WHY: small team, transactional consistency around the fact graph. RISK: boundary erosion → enforced by lint rules and package structure.

## 4. Document processing architecture

```
upload → quarantine store → AV/type/structure scan → re-encode
 → classify (template match → ML/LLM fallback) → quality check (blur/crop → ask re-upload)
 → extract (per-doc-type template/OCR; LLM assist only on low-confidence fields)
 → field-level confidence scoring → schema validation (impossible values, checksum rules,
   e.g. Box 4 ≈ 6.2% of Box 3) → duplicate/correction detection (W-2C supersedes)
 → user confirmation screen (side-by-side source image + extracted values)
 → normalized document record → proposed facts → fact graph
```
Every extracted field stores: value, document_id, page, box/field, confidence, extraction_method (template|ocr|llm|manual), confirmation status, correction history. Each supported document family gets its own schema + parser module (W-2 ≠ 1099-NEC ≠ 1099-K, per the document matrix).

## 5. Database model (core entities)

```
users, auth_identities, mfa_factors, sessions, devices
consents(user, purpose, text_version, granted_at, revoked_at)
tax_returns(id, user, tax_year IMMUTABLE, status, engine_version, risk_level)
documents(id, user, return?, type, storage_key, status, tax_year_detected, superseded_by?)
document_fields(document, field_key, value, page, box, confidence, method,
                confirmed_at, correction_of?)
facts(id, return, path, value_json, tax_year, status{proposed|confirmed|superseded},
      confirmed_by_user, superseded_by?)
fact_provenance(fact, kind{document_field|interview_answer|derived|prior_year}, ref_id)
interview_sessions, interview_answers(question_id, answer, fact_ids...)
missing_items(return, fact_path_needed, reason_rule_id, status)
calculations(return, engine_version, input_snapshot_hash, output_json, trace_ref, run_at)
calc_trace_nodes(calculation, line_ref, value, rule_id, input_refs[])
validations(return, layer, code, severity{PASS|WARNING|BLOCKING}, message, refs)
risk_assessments(return, level, factors_json)
escalations(return, reason, status, assignee?)
form_instances(return, form_id, version, field_values_json)  -- rendered mapping
signatures(return, kind, signed_at, ip, verification_json)   -- immutable
submissions(return, channel, state, ack_payload, occurred_at)
audit_events(append-only, hash-chained — see THREAT_MODEL §7)
admin_access_log
```
Facts are **append-only with supersession** (never destructive update) so provenance and audit hold.

## 6. Tax Fact Graph design

- Canonical tree: `taxpayer / household / residency / dependents[] / income{wages[], interest[], dividends[], business[], capital[], retirement[], other[]} / adjustments / deductions / credits / payments / carryovers / state`.
- Facts are typed leaves addressed by path (e.g. `income.wages[0].box1`), each carrying provenance, tax_year, confidence, confirmation status (example JSON shape per product spec §7).
- **Lifecycle:** `proposed` (from extraction/AI/interview) → `confirmed` (user or deterministic rule) → optionally `superseded`. The tax engine reads **confirmed facts only**; unconfirmed required facts appear as missing items.
- Derived facts (e.g. AGI) are never stored as user facts — they live in calculation outputs with traces.
- The graph, not documents and not the chat transcript, is the single input to the engine.

## 7. Agent architecture

Specialized modules over one mega-prompt: **Intake**, **Document Classification**, **Document Extraction**, **Interview**, **Missing Information**, **Tax Opportunity**, **Explanation**, **Risk**, **Research**, **Support** agents.

Key design choices:
- The **Missing Information engine is deterministic first**: requirement rules ("1099-NEC present → require business-activity facts, expense inquiry, estimated payments"; "1095-A present → require 8962 reconciliation facts") are code with rule IDs; the LLM only *phrases* the questions and interprets free-text answers into proposed facts. Same pattern for **Tax Opportunity** (deterministic eligibility gates; LLM explains and asks).
- Agents communicate through the fact graph and typed task objects, not shared prompts.
- **No agent can write to the tax engine, rule modules, or confirmed facts.** Interfaces make this impossible, not just discouraged.
- Never-guess policy is implemented as engine/agent middleware: confidence below threshold → user question; unsupported scope detector fires → escalation; contradictory facts → blocking validation; unverifiable rule → flagged, not invented.

## 8. Tax rule engine architecture

```
tax-engine/
  core/            # decimal math (integer cents), trace framework, types
  federal/2025/    # rules/, tables/, forms/, worksheets/, index.ts (frozen at season end)
  federal/2026/
  states/CA/2025/ ...
```
- Pure functions: `(ConfirmedFactSnapshot, TaxYearModule) → CalculationResult{lines, forms, trace}` — no I/O, no clock, no randomness → perfectly reproducible and property-testable.
- Every rule function declares `rule_id` linking to SOURCE_REGISTER; the trace records rule IDs per line so explanations and change-impact analysis ("which calcs does this law change touch?") are queries, not archaeology.
- Tax tables ship as data files with checksums, sourced from IRS publications.
- Form mapping is a separate layer: `CalculationResult → form_instances` per tax-year form versions.

## 9. Tax-year versioning strategy

`tax_year` is immutable on a return; engine resolution is `registry.get(tax_year)` — there is no "current year" default in engine code. Old-year modules are frozen (CI blocks edits after season close except flagged corrections, which bump a module patch version recorded on every calculation). Tests are partitioned per year; a 2026 rule change can never alter a 2025 test result. New-year onboarding checklist = re-verification process in `CURRENT_TAX_YEAR_STATUS.md`.

## 10. Explanation system

Explanations are generated from calculation traces + fact provenance: "Why do I owe?" walks total tax vs payments; "Where did this number come from?" resolves trace → fact → document box image. LLM renders the walk into plain English but every sentence cites a trace node or rule ID; template fallback exists. No trace, no claim.

## 11. Human review / escalation system

- Risk engine (deterministic scorecard: unsupported forms, OCR uncertainty, contradictions, outlier deductions vs income, multi-state, incomplete basis, identity mismatch, complex SE) → LOW / MEDIUM / HIGH / EXPERT_REVIEW_REQUIRED.
- HIGH+ blocks automatic progression to signing; EXPERT_REVIEW_REQUIRED creates an escalation ticket with a masked-by-default reviewer workspace showing facts, documents, validations, and trace.
- V1 "expert" = internal reviewer queue + honest user messaging ("this return needs situations we don't support yet — here's what we found and what to take to a professional"). Marketplace of external pros is future work (PTIN/8867 obligations documented in e-file roadmap).

## 12. Testing strategy

- **Engine:** per-rule unit tests with authoritative expected values (from IRS instructions' examples and worksheets); golden-file scenario tests (Scenarios A–H per product spec: single W-2; MFJ+children; W-2+1099-NEC; retiree SSA/1099-R; education; investments; 1095-A; multi-state routing→escalation); property tests (monotonicity, bracket continuity, refund = payments − tax identity); per-tax-year regression suites, frozen.
- **Extraction:** fixture corpus of synthetic filled forms per document family; accuracy thresholds gate deploys.
- **Validation/permissions/security:** RBAC matrix tests, masked-view tests, log-scrubber tests, authz fuzzing.
- **E2E:** scripted taxpayer journeys through interview→upload→confirm→calc→review.
- **Eventually:** MeF business-rule conformance tests and ATS scenarios (Stage 15).
- Every calculation test cites its authoritative expected-result source in the test file header. No tax feature merges without tests + register row (Definition of Done, product spec §40).

## 13. State tax expansion strategy

Federal and state engines are separate modules; state modules consume the federal `CalculationResult` (most states start from federal AGI) plus state-specific facts. Each state = interview pack + residency rules + rules/tables + forms + validations + sources, all per-tax-year. Multi-state/part-year returns are out of V1 scope → detection + escalation. **Recommended first state: California** (largest market; FTB documentation is good; conformity differences from federal are well documented) — product-owner decision.

## 14. Dashboard & progress UX

Six-step frame (About You / Family / Income / Deductions & Credits / Review / File) with per-section status (Completed / Needs attention / Not started); dashboard cards: documents received, questions remaining, federal & state estimate (clearly labeled *estimate*), review status, filing state, tasks, messages, downloads, account/security. Every ask shows *why* ("You uploaded a 1099-NEC, so I need to ask about business expenses").
