# Build Roadmap & Risk Register

## 1. Stages (sequential; no stage starts before its gate)

| Stage | Deliverable | Gate to proceed |
|---|---|---|
| 0 | This research/architecture package | **Product-owner review & approval of V1 boundaries** |
| 1 | Repo, IaC, CI/CD, secrets, logging w/ scrubber, audit-event framework | security review of foundation |
| 2 | Auth: MFA, sessions, device mgmt, RBAC skeleton | authz tests green |
| 3 | Taxpayer profile + household interview (identity/household facts) | fact graph rows w/ provenance |
| 4 | Document intake pipeline (upload→scan→classify→quality) | malicious-upload tests |
| 5 | W-2 extraction + confirmation UX | fixture accuracy threshold |
| 6 | Tax Fact Graph service (proposed/confirmed lifecycle) | append-only + provenance tests |
| 7 | Guided interview engine w/ branching + missing-info rules | no-irrelevant-question tests |
| 8 | Deterministic TY2025 1040 engine (W-2-only path first): status, std deduction, tax tables, withholding, refund | golden Scenario A exact match vs authoritative worksheet |
| 9 | Explanation system (trace→plain English) | every line explainable |
| 10 | Additional doc families (1099-INT/DIV/G/R, SSA-1099, 1098-E, 1098-T, 1098, 1095-A) | per-family fixtures + register rows |
| 11 | Deductions/credits (Sch 1, 1-A, A, C+SE simple, CTC/8812, EITC, 8863, 8880, 2441, 8962, 8889) | Scenarios B–G exact match |
| 12 | Validation engine (document/cross-doc/logic/form layers, PASS/WARNING/BLOCKING) + risk engine + escalation queue | blocking errors halt progression |
| 13 | First state (CA pending approval) | state golden scenarios |
| 14 | Internal review workflow + admin platform (masked views, privileged-access logging) | insider-threat review |
| 15 | E-file integration **only after** compliance decision per IRS_EFILE_ROADMAP | owner + legal sign-off |

Definition of Done for every tax feature (per spec §40): authoritative rule documented in register · schema defined · deterministic calc · provenance · edge cases · validation · tests · user explanation · security review · audit logging · scope boundaries documented.

## 2. Owner decisions — RESOLVED (2026-08)
- (a) **Hybrid e-file strategy: APPROVED** (no vendor selection/integration before the appropriate stage; Stage 15 separately gated). (b) **California first state: APPROVED** (Stage 13). (c) **Vendor evaluation: APPROVED — evaluation only, no commitment.** (d) **Tax-year correction: TY2025 = reference/golden validation year, TY2026 = production target**; engine builds/validates against finalized TY2025 sources while TY2026 artifacts are tracked through the DRAFT→PRODUCTION_VALID lifecycle.
- Stage 8+ engine work: golden tests target TY2025; TY2026 modules are populated as IRS artifacts finalize. Capability rollout follows the progressive tiers in `PRODUCT_REQUIREMENTS.md` §2a.
- Implementation happens in the dedicated tax repository (see SYSTEM_ARCHITECTURE §8a); this repo retains Stage 0 documentation as evidence.

## 3. Risk register

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Incorrect calculation harms a taxpayer | Med | Critical | deterministic engine, authoritative-source tests, golden scenarios, never-guess policy, accuracy review before launch; E&O-style legal review of terms |
| R2 | Data breach of SSN/income data | Med | Critical | THREAT_MODEL controls, field encryption, WISP, pen test, minimal AI egress |
| R3 | §7216 violation via AI/analytics data flows | Med | High | AI Data Boundary, consent system, legal review, single egress gateway |
| R4 | Regulatory: e-filing without proper authorization | Low (gated) | Critical | hard product gate — no transmit path exists until Stage 15 approval |
| R5 | OBBBA/new-law churn breaks 2025 logic mid-season | Med | High | versioned rules, source register re-verification, change-impact via rule IDs |
| R6 | LLM extraction/hallucination corrupts a return | Med | High | proposal-only AI, schema validation, mandatory user confirmation, provenance |
| R7 | Scope creep into unsupported tax situations | High | High | capability matrix + detectors + escalation; "never silently calculate" tests |
| R8 | E-file vendor risk (Option B) | Med | Med | diligence checklist, contract terms, exit plan to direct MeF |
| R9 | Filing-season load/availability | Med | Med | load testing, autoscaling, season freeze windows |
| R10 | EITC/CTC eligibility errors (audit-prone credits) | Med | High | strict rule tests from Pub 596/8812, conservative asks, risk-engine weighting |
| R11 | Product-owner tax assumptions wrong (by design assumption) | High | Med | this process: every spec claim verified against primary sources before implementation; discrepancies surfaced to owner |
| R12 | Fraudulent use of platform for stolen-identity refunds | Med | High | identity verification, velocity checks, risk engine, bank-change controls |
