# Data Privacy Plan & AI Data Boundary

> **Disclaimer:** This document is engineering/compliance research prepared with AI assistance. It is **not legal advice**. Items whose legal interpretation is uncertain are marked **LEGAL REVIEW REQUIRED** and must be confirmed by qualified counsel before launch.

## 1. Legal frame (why a generic privacy policy is not enough)

- **IRC §7216** (criminal) and **§6713** (civil) restrict use/disclosure of tax return information by tax return preparers, including providers of software used to prepare returns. Not all third-party processing requires taxpayer consent — the regulations (Treas. Reg. §§301.7216-2 and -3) distinguish permitted activities from consent-required ones. The categories below drive design; the classification of each concrete data flow is **LEGAL REVIEW REQUIRED**:
  1. **Uses/disclosures permitted as part of return preparation** — processing needed to prepare, calculate, validate and (eventually) file the return; no separate consent expected. (Treas. Reg. §301.7216-2 auxiliary-services provisions — verify applicability.)
  2. **Processing covered by regulatory exceptions** — e.g., disclosures pursuant to legal process, certain quality/peer reviews. Enumerate per §301.7216-2 before relying on any.
  3. **Uses requiring taxpayer consent** (§301.7216-3) — using return info for purposes beyond preparation.
  4. **Disclosures requiring taxpayer consent** — providing return info to third parties beyond permitted categories.
  5. **Offshore disclosures/processing** — additional consent/SSN-redaction constraints apply to disclosures outside the U.S. **LEGAL REVIEW REQUIRED** before any offshore processing; default: none.
  6. **Marketing or unrelated use** — consent-required; consent language/format is regulator-prescribed and must not be bundled with service acceptance.
  7. **Service-provider processing** (hosting, storage, OCR vendors) — likely permissible as auxiliary services under contract without taxpayer consent, but classification per provider is **LEGAL REVIEW REQUIRED**.
  8. **AI-provider processing** — treated conservatively as potentially consent-relevant; whether an LLM provider under a zero-retention service contract is an "auxiliary service" (no consent) or a consent-required disclosure is **unsettled — LEGAL REVIEW REQUIRED**. Our AI Data Boundary minimizes what could be at issue either way.
  9. **Analytics** — operational/service analytics vs. product/marketing analytics must be separated; the latter is treated as consent-required. Boundary line: **LEGAL REVIEW REQUIRED**.
  10. **Professional-review disclosure** (future marketplace) — disclosure to a reviewing preparer; consent and PTIN/due-diligence implications to be analyzed at that stage.

**Requirement provenance labels** used throughout this plan: **[LEGAL]** = legal requirement (statute/regulation), **[POLICY]** = product-owner privacy policy choice (stricter than law), **[PRACTICE]** = security best practice. Example: SSNs never sent to any LLM = [POLICY]+[PRACTICE] (conservative; not asserted as a settled legal mandate). Separate, unbundled consent for marketing use = [LEGAL].
- **FTC Safeguards Rule** (GLBA): tax prep software firms are "financial institutions" — requires a written information security plan, designated qualified individual, risk assessment, MFA, encryption, vendor oversight, incident response, and (per Pub 4557) reporting of data breaches to the IRS/states.
- **State privacy laws** (CCPA/CPRA etc.) layer on top; design for the strictest.

## 2. Consent architecture

- Mandatory service processing (preparation, calculation, validation, filing) is covered by the engagement — no optional-consent bundling.
- Separate, versioned, individually revocable consents for: analytics beyond operations, marketing, third-party offers, AI-provider processing (if any leaves our boundary), cross-border processing, professional-review disclosure.
- Consent records: immutable rows (user, consent text version hash, timestamp, IP, granted/revoked). Consent text lives in version control.

## 3. Data lifecycle

- Collection minimization: interview asks only branch-relevant questions; documents store only extracted fields + encrypted original.
- Retention: return + records retained per IRS record rules and user agreement; user-initiated document deletion and full account deletion workflows (with legal-hold carve-outs) are V1 features, not afterthoughts.
- Deletion is cryptographic where feasible (per-user data keys destroyed).

## 4. Handling rules (absolute)

Never: log full SSNs/TINs/bank numbers anywhere (structured logger enforces denylist + format-detection scrubber); send taxpayer data to analytics; expose sensitive fields in frontend logs/error reporters; use production documents in development; train models on customer tax data absent explicit lawful §7216-compliant authorization. SSNs display masked (`***-**-1234`) everywhere except a deliberate, audited "reveal" on final review/signature screens.

## 5. AI DATA BOUNDARY (specification)

Principle: the LLM sees the **minimum** data needed for its narrow task; deterministic code sees everything.

| Flow | WHAT goes to AI | WHY | PROVIDER | RETENTION | ALTERNATIVE |
|---|---|---|---|---|---|
| Document classification | First-page image/text, **PII redacted where feasible** | identify doc type | LLM provider via abstraction layer | zero-retention API terms required | layout/ML classifier (roadmap) |
| Extraction assist | Document image + schema of expected boxes | fill structured schema when OCR uncertain | same | zero retention | pure OCR + templates for standard forms (preferred path; LLM is fallback) |
| Interview conversation | User's free-text answers + minimal fact summaries (no SSN/DOB/account numbers; dollar amounts allowed, IDs tokenized) | natural dialogue, branching | same | zero retention | forms-only UI mode (always available) |
| Explanations | Calculation trace (rule IDs, line values) — no identity data | translate trace to plain English | same | zero retention | template-generated explanations |
| Anomaly description | Field values flagged by deterministic checks | phrase the question to user | same | zero retention | canned messages |

Controls: single egress module `ai-gateway` is the only code path allowed to call an LLM (lint/CI rule enforces); every call logs purpose, prompt-template ID, redaction profile, provider, token counts (never raw prompt bodies containing taxpayer data — store a redacted rendering); provider contracts must guarantee no training on our data and zero/limited retention; per-purpose kill switches; SSN/TIN/bank-account/DOB never leave the boundary in any flow — tokenized placeholders (`[TAXPAYER_1]`) are re-substituted after the model call.

**Decision — DECISION:** LLM never receives raw full documents when structured extraction succeeds. **WHY:** minimizes §7216 exposure and breach blast radius. **ALTERNATIVES:** full-document prompting (simpler, rejected). **RISK:** slightly worse extraction on unusual layouts → mitigated by human-confirmation step that exists anyway. **RECOMMENDATION:** adopt.
