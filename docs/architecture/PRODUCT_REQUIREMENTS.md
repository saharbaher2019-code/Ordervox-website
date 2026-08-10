# Product Requirements Document (V1)

## 1. Vision
AI-assisted U.S. individual tax preparation: taxpayers upload documents, answer plain-English questions, and receive a deterministic, explainable, validated federal Form 1040 (first state to follow). Positioning: **"Upload your documents. Answer simple questions. We help organize and prepare your return."** Never "AI guarantees maximum refund"; never guarantee refund amounts/timing, IRS acceptance, or audit outcomes.

## 2. Target users (V1)
W-2 employees; married couples; parents/dependents; independent contractors, gig workers, simple sole proprietors; recipients of common 1099s (INT/DIV/NEC/G/R/K simple cases); unemployment and retirement income; education expenses; mortgage interest; marketplace insurance (1095-A); common credits (CTC, EITC, education, saver's, child-care, PTC).

## 2a. Progressive capability tiers (owner-approved refinement)

Implementation proceeds by tier; a tier opens only after the prior tier is independently validated. A document parser existing never implies calculation support.

- **Tier 1 (first fully validated path):** W-2, W-2C, basic filing statuses, straightforward dependents, federal withholding, estimated payments, standard deduction, basic 1040 calculation, straightforward 1099-INT, unemployment 1099-G, SSA-1099, common 1099-R cases, 1098-E, straightforward 1098-T, straightforward 1095-A.
- **Tier 2 (after Tier 1 validation):** 1099-NEC, simple sole-proprietor Schedule C, Schedule SE, ordinary/necessary business expenses, simple mileage, simple business deductions.
- **Tier 3 / partial (stronger capability gates):** 1099-K, 1099-B, 1099-DA, brokerage consolidated statements, complicated retirement distributions, complicated HSA, education-credit coordination edge cases, advanced Schedule C.
- **Expert review / unsupported:** complex K-1, rental real estate, trusts/estates, advanced international, FBAR/8938, complex stock comp/options/wash sales, complicated crypto/DeFi/staking/mining, foreclosure/canceled debt, complex home sale, multi-state, amended returns, controversy, NOLs, passive activity, farm, clergy, household employment.

## 3. Explicit non-goals (V1)
Rental real estate, complex K-1s, trusts/estates, foreign income beyond trivial FTC, stock-comp complexity, crypto beyond simple disposals, multi-state, amended returns, e-filing before compliance approval. Every non-goal has a **detector** so the product recognizes and escalates instead of silently computing (capability matrix: SUPPORTED / PARTIALLY / EXPERT REVIEW / NOT YET).

## 4. Core user journeys
1. **Onboard & interview:** dynamic, branching plain-English interview capturing identity, household, income, deductions, credits, payments, special circumstances (full field list in product spec §4). Irrelevant questions never asked; every question explains why it's asked.
2. **Document intake:** photo/PDF/image upload, multi-file, drag-drop → pipeline (see SYSTEM_ARCHITECTURE §4) → side-by-side verification ("Please verify these numbers against your W-2").
3. **Gap resolution:** missing-information engine drives tasks until required facts are confirmed.
4. **Opportunity discovery:** legitimate deductions/credits surfaced with eligibility questioning; never asserts qualification before all gates checked.
5. **Calculate & explain:** deterministic engine; every number clickable → trace-backed explanation.
6. **Review:** summary (filing status, dependents, income, AGI, taxable income, tax, credits, payments, refund/owed), full-return view, watermarked draft download, corrections loop.
7. **(Future) Sign & file** per e-file roadmap; until approved, product stops at draft.

## 5. Success criteria
Calculation accuracy: 100% on golden scenarios vs authoritative expected results (non-negotiable). Extraction: ≥99% field accuracy after user confirmation step (confirmation is the backstop). Scope safety: 0 unsupported situations silently calculated in test suite. Explainability: every 1040 line answerable via trace. Security: WISP complete, pen test passed before real-data launch.

## 6. Key product decisions

| DECISION | WHY | ALTERNATIVES | RISK | RECOMMENDATION |
|---|---|---|---|---|
| **TY2025 = reference/golden validation year; TY2026 = production target** (owner-approved correction) | product ships during CY2026 for the 2027 filing season; TY2025 finalized forms provide authoritative golden tests | TY2025-as-production (original Stage 0 assumption — superseded) | TY2026 artifacts are draft/changing; artifact status lifecycle (DRAFT→…→PRODUCTION_VALID) prevents draft authority | **APPROVED** |
| V1 output = draft returns only until e-file path approved | e-file needs compliance path | start with e-file vendor day 1 | slower to "filed" milestone | Accept; print-and-mail + vendor e-file later |
| Deterministic engine in TypeScript, LLM quarantined | correctness, §7216, auditability | LLM-computed returns | none worth naming | Non-negotiable |
| Modular monolith | team size, consistency | microservices | boundary erosion | Enforce module boundaries in CI |
| E-file: hybrid (vendor first, direct MeF later) | season earlier to market | A-only / B-only | vendor diligence | See IRS_EFILE_ROADMAP — **owner approval needed** |
| First state: California | market size, docs | NY, TX(no income tax—moot) | CA complexity | **owner approval needed** |
| Confirmation-gated facts (user verifies every extracted number) | OCR is never trusted | auto-accept high confidence | friction | Keep V1 strict; relax only with data |

## 7. Product language rules
"Estimated refund" ≠ "your refund." "Draft" until filed; "Transmitted" ≠ "Accepted." Plain English first, expandable technical detail. Uncertainty is always disclosed, never disguised.
