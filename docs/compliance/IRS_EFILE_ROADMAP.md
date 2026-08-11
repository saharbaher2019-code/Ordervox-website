# IRS E-File Compliance Roadmap

**Hard rule: no return is transmitted to the IRS, and the product never claims "Filed with IRS," until the product owner formally approves a filing path documented here.** Until then the product offers only: Prepare return · Review return · Generate draft (watermarked "DRAFT — NOT FILED").

## 1. The regulatory landscape (researched from IRS primary sources)

- **Authorized IRS e-file Provider program** (Pub 3112): anyone participating in e-file must apply via the online IRS e-file Application and pass suitability review (background, credit, tax-compliance checks on principals). Provider roles: **ERO** (originates returns), **Transmitter** (sends to IRS), **Software Developer** (writes software that formats returns per MeF), **Online Provider** (lets taxpayers self-prepare online — our model), Intermediate Service Provider.
- **Identifiers:** **EFIN** assigned to all providers (Online Providers get special prefix codes 10/21/32/44/53); **ETIN** assigned to Transmitters/Software Developers.
- **Pub 1345**: operating rules for e-filing individual returns — advertising standards, taxpayer consent, IP-address capture, security requirements (incl. FTC Safeguards Rule compliance), Form 8879 e-signature rules, record keeping, timely-transmission and reject-handling duties.
- **MeF (Modernized e-File):** XML-based transmission. **Pub 4164** = software developer technical guide (schemas, transmission, acknowledgments); **Pub 4163** = MeF info for authorized providers. Schemas + business rules are versioned per tax year; software must pass **ATS (Assurance Testing System)** scenarios each year before production approval.
- **Pub 4557**: safeguarding taxpayer data (FTC Safeguards Rule applies to tax preparers — WISP required).
- **Form 8879 / self-select PIN:** taxpayer authorization/signature for e-file; self-prepared online returns use Self-Select PIN with prior-year AGI verification.
- **PTIN:** required for *paid preparers*; DIY software users self-prepare so no PTIN, but any future professional-review marketplace (doc §25) makes reviewers paid preparers → PTIN + due-diligence obligations (esp. EITC due diligence, Form 8867).
- **IRC §7216 / §6713:** criminal/civil penalties for unauthorized use/disclosure of tax return information by preparers **including software providers** — governs consent design (see DATA_PRIVACY_PLAN).
- **State e-file:** most states use Fed/State MeF piggyback through the IRS, but each state has its own approval/testing (e.g., CalFile/FTB software approval).

## 2. The decision — Option A vs Option B

### Option A — Become an IRS Software Developer + Online Provider/ERO/Transmitter ourselves
- **Advantage:** full control, no per-return vendor fees at scale, no vendor dependence, direct MeF integration.
- **Disadvantage:** e-file application + suitability (weeks–months), annual ATS certification against every schema/business-rule release, we build acknowledgment/reject infrastructure, state-by-state certifications, heavy ongoing regulatory burden; mistakes risk EFIN sanctions that would halt the business.
- **Cost/time:** low direct fees but very high engineering + compliance labor; realistically a full filing-season cycle before production approval.

### Option B — Integrate an established authorized e-file vendor/API (e.g., a certified transmitter/white-label filing partner)
- **Advantage:** fastest to market; vendor carries MeF certification, ATS, ack/reject plumbing, many state approvals; our exposure narrows.
- **Disadvantage:** per-return fees, vendor lock-in risk, dependence on their schema coverage and uptime, data-sharing must be papered under §7216, we may still need our own EFIN depending on the arrangement.
- **Cost/time:** integration in weeks; unit economics worse at scale.

### RECOMMENDATION
**Phase-appropriate hybrid: launch with Option B, plan migration to Option A.**
- **WHY:** V1's risk is product-market fit and correctness, not transmission plumbing; a vendor lets us file real returns a full season earlier while we harden the engine. The deterministic engine and MeF-shaped internal return format keep the door open to direct MeF later.
- **ALTERNATIVES:** A-only (slow, risky first season); B-forever (margin erosion, strategic dependence); "print-and-mail PDF" interim (worth offering regardless — zero e-file compliance needed for a taxpayer who prints and mails their own self-prepared return, though accuracy liability and marketing rules still apply).
- **RISK:** vendor diligence is itself a project — security posture, §7216 handling, form coverage vs our capability matrix, SLA during filing-season peaks. Also: even under Option B, Pub 1345/4557 duties and FTC Safeguards apply to us.
- **DECISION NEEDED FROM PRODUCT OWNER:** approve hybrid strategy; budget for vendor evaluation in Stage 15 planning.

## 3. E-file state machine (design target, Stage 15)

```
DRAFT → VALIDATED → READY_FOR_REVIEW → TAXPAYER_APPROVED → SIGNED
  → READY_TO_TRANSMIT → TRANSMITTED → IRS_PENDING → ACCEPTED
                                        └→ REJECTED → CORRECTION_REQUIRED → RESUBMITTED → …
```
Invariants: transitions are monotonic and audited; **TRANSMITTED ≠ ACCEPTED** anywhere in UI or copy; a reject reopens editing only for affected facts and re-runs full validation; every state change stores the raw IRS/vendor acknowledgment payload; signatures (8879-equivalent record, IP, timestamp, AGI/PIN verification) are captured before READY_TO_TRANSMIT and are immutable.

## 4. Milestones before any real transmission

1. Product-owner sign-off on Option B vendor (or A application filed).
2. Legal review of §7216 consents, terms, and advertising copy (Pub 1345 ad rules).
3. WISP (written information security plan) complete per Pub 4557 / FTC Safeguards.
4. Validation engine wired to current-year IRS business rules (or vendor's pre-check).
5. End-to-end test filings in vendor sandbox / IRS ATS.
6. Reject-handling runbook + support staffing for filing season.
