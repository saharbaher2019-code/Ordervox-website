# Security Threat Model & Audit Log Design

Scope: the platform stores the most identity-theft-valuable data that exists (SSN + income + bank + address + dependents). Assume we are a target from day one. FTC Safeguards Rule + IRS Pub 4557 make most of this legally mandatory, not optional.

## 1. Assets
Taxpayer PII (SSN/TIN, DOB), income documents, bank account numbers (refund direct deposit), authentication credentials/sessions, signed return records, audit logs, signing/consent records, encryption keys, admin access.

## 2. Actors & top threats (STRIDE summary)

| Threat | Vector | Mitigations |
|---|---|---|
| Account takeover → refund redirection | credential stuffing, phishing, SIM swap | mandatory MFA (TOTP/passkeys; SMS discouraged), breached-password checks, rate limiting, device/session management, re-auth + out-of-band confirm on bank-detail changes, short-lived sessions |
| Bulk data theft | SQLi/app vuln, stolen cloud creds, misconfigured storage | private-by-default object storage w/ signed URLs, field-level envelope encryption (per-user data keys in KMS) for SSN/bank/DOB, least-privilege IAM, network isolation, WAF, dependency & container scanning in CI |
| Malicious uploads | malware, decompression bombs, polyglot PDFs | quarantine bucket → AV scan + type/structure validation + size limits → re-encode images/rasterize PDFs before processing; processing in sandboxed workers |
| Insider access | support/admin overreach | RBAC (CUSTOMER/SUPPORT/TAX_REVIEWER/COMPLIANCE/ADMIN/SUPER_ADMIN), masked-by-default views, purpose-required break-glass reveal with immutable logging + alerting, no direct prod DB access |
| Prompt injection via documents | uploaded doc contains adversarial text steering the AI | AI outputs are never authoritative (architecture principle); extraction outputs validated against schemas + user confirmation; AI cannot mutate facts or calculations directly |
| Fraudulent filers (stolen identity used *through* us) | synthetic accounts | identity signals, velocity limits, risk engine flags (many returns to one bank account/IP), prior-year AGI checks at signing, IP capture per Pub 1345 |
| Supply chain | compromised dependency, CI | lockfiles, provenance/scanning, protected branches, mandatory review, secrets in secrets manager only, OIDC deploy creds (no long-lived keys) |
| Data in logs | accidental PII leakage | structured logging w/ schema-allowlisted fields + scrubber, no raw documents/prompts in logs, log access itself audited |

## 3. Cryptography
TLS 1.2+ everywhere; storage encryption at rest (provider) **plus** application-layer field encryption for SSN/TIN, DOB, bank details, document blobs; KMS-managed keys, rotation, per-user data keys enabling crypto-shredding on account deletion; Argon2id password hashing.

## 4. Availability & recovery
Encrypted automated backups, tested restores, filing-season load planning (April/October spikes), incident-response runbook incl. IRS/state breach-notification duties (Pub 4557), status page.

## 5. Secure SDLC
Threat-model review per feature touching taxpayer data; SAST/dependency/secret scanning in CI; pen test before first real-data launch and annually; security review is part of Definition of Done.

## 6. Admin platform security
All privileged views masked by default; every privileged read/write recorded (who, role, subject user, fields, justification); SUPER_ADMIN actions require second-party approval for destructive operations; separate admin identity provider/origin.

## 7. AUDIT LOG DESIGN

- **Store:** append-only event table (no UPDATE/DELETE grants) + periodic export to WORM object storage; hash-chained (each event stores hash of predecessor) so tampering is detectable.
- **Event shape:** `{event_id, occurred_at, actor {user|agent|system|admin}, actor_ip, session_id, subject_user, return_id?, tax_year?, action, object {type,id}, before_hash/after_hash for fact changes, rule_ids_used?, details (PII-scrubbed), prev_event_hash}`.
- **Mandatory events:** document uploaded/scanned/classified; field extracted (method+confidence); field corrected (old→new, by whom); interview answer recorded; fact created/updated in fact graph; calculation run (engine version, rule module versions, input snapshot hash, output snapshot hash); validation run + results; return draft generated; risk score assigned/changed; escalation opened/resolved; consent granted/revoked; user approved return; signature captured; submission attempt; acknowledgment received; privileged (admin) access; auth events (login, MFA, password/bank changes).
- **Why not chat history:** conversations are UX, not evidence. Every legally meaningful action must exist as a structured audit event independent of the transcript.
- Retention per legal requirements; audit log readable by COMPLIANCE role; access to audit log is itself audited.
