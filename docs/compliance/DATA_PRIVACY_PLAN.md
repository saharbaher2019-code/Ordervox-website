# Data Privacy Plan & AI Data Boundary

## 1. Legal frame (why a generic privacy policy is not enough)

- **IRC §7216** (criminal) and **§6713** (civil): tax return preparers — explicitly including providers of software used to prepare returns — may not use or disclose tax return information except as permitted. Treas. Reg. §301.7216-3 requires **separate, specific, taxpayer-signed consent** with mandated language/format for any use beyond preparation (marketing, analytics beyond service operation, disclosure to third parties, offshore processing). Consent must not be a condition of service where the regs forbid bundling.
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
