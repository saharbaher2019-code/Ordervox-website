# Tax Domain Overview — U.S. Individual Income Tax (Plain English)

Audience: product owner (non-tax-expert). Everything here traces to IRS primary sources; see `SOURCE_REGISTER.md`. Figures below are for **tax year 2025** and were verified against IRS.gov in August 2026. **Role of TY2025 (owner-approved):** reference/golden validation year — finalized forms make it the authoritative basis for engine design and golden tests. **TY2026 is the production target**; its figures/forms are still draft or evolving and are tracked separately with artifact statuses (see `CURRENT_TAX_YEAR_STATUS.md`).

## 1. How a tax return actually works

A federal individual return (Form 1040) answers four questions:

1. **Who are you?** Filing status (Single, Married Filing Jointly, Married Filing Separately, Head of Household, Qualifying Surviving Spouse) and dependents. Filing status changes almost every threshold downstream — it is a *determination*, not a fact the user just tells us; the software must verify eligibility (e.g., Head of Household requires paying >½ the cost of keeping up a home for a qualifying person).
2. **What did you earn?** All income from all sources: wages (W-2), self-employment (often 1099-NEC/1099-K, but reportable even without a form), interest (1099-INT), dividends (1099-DIV), capital gains (1099-B), retirement (1099-R), Social Security (SSA-1099), unemployment (1099-G), etc. **Key insight: income is taxable whether or not a form was issued.** Documents are evidence, not the definition of income.
3. **What reduces your tax?** Adjustments ("above-the-line": student loan interest, HSA, IRA, ½ SE tax), then the larger of the standard deduction or itemized deductions (Schedule A), plus (new for 2025) Schedule 1-A additional deductions, then the QBI deduction if applicable. After that: nonrefundable credits (reduce tax to zero) and refundable credits (can produce a refund by themselves, e.g. EITC, Additional Child Tax Credit).
4. **What did you already pay?** Withholding (W-2 box 2, 1099 withholding), estimated payments, prior-year overpayment applied. Total payments vs. total tax = refund or balance due.

A "refund" is not a prize — it is the return of an interest-free loan the taxpayer made to the government via over-withholding. The UI must explain this to set expectations.

## 2. The preparation workflow (what professional software does)

1. Collect identity & household facts (interview).
2. Collect income documents; extract and *taxpayer-verify* every number.
3. Probe for undocumented income and unclaimed deductions/credits (interview driven by what documents imply — a 1099-NEC implies a business, which implies expenses).
4. Determine filing status and dependents by rule, not assertion.
5. Compute the return deterministically per the tax-year's forms and instructions.
6. Validate (internal math, cross-document consistency, IRS business rules).
7. Taxpayer review, explanation, signature (Form 8879 for e-file).
8. Transmit, process acknowledgment, handle rejects.

## 3. Verified 2025 anchor figures (must be re-verified per tax year)

- Standard deduction 2025 (post-OBBBA): **$15,750** Single/MFS, **$31,500** MFJ/QSS, **$23,625** HoH. Additional for 65+/blind: $2,000 (single/HoH), $1,600 (married). (IRS Topic 551; 2025 Form 1040 instructions.)
- Seven brackets 10/12/22/24/32/35/37%; e.g. 22% starts at $48,475 single / $96,950 MFJ; 37% starts at $751,600 MFJ. (Rev. Proc. 2024-40 as modified by OBBBA.)
- **New for 2025 (One Big Beautiful Bill Act):** four deductions claimed on **Schedule 1-A** — no tax on tips, no tax on overtime, car loan interest, and a $6,000 enhanced senior deduction (AGI-limited). SALT itemized cap raised from $10,000 to **$40,000** (2025–2029, income phase-down applies).
- These OBBBA items materially change 2025 logic vs. 2024 — a strong argument for the versioned rules engine.

## 4. Form 1040 Flow Map (2025 form structure)

```
Form 1040 (core)
├─ Income lines ← W-2, 1099-INT/DIV (via Sch B if >$1,500), 1099-R, SSA-1099,
│                 Sch C (business) → Sch SE (SE tax), Sch D + 8949 (capital), Sch E (rental/K-1)
├─ Schedule 1: additional income (unemployment 1099-G, business, other) + adjustments
│              (educator, HSA→8889, ½ SE tax, SE health ins., IRA, student loan interest 1098-E)
├─ Schedule 1-A (NEW 2025): tips, overtime, car loan interest, senior deduction
├─ Standard deduction OR Schedule A (itemized: medical >7.5% AGI, SALT ≤$40k, mortgage
│              interest ←1098, charity)
├─ QBI deduction (Form 8995/8995-A)
├─ Tax computation (tax tables / schedules; Sch D worksheet for cap gains; Form 8814/8615 out of V1 scope)
├─ Schedule 2: AMT (6251), excess APTC repayment (8962), SE tax, additional Medicare (8959),
│              NIIT (8960), early-distribution penalties (5329)
├─ Schedule 3: nonrefundable credits — foreign tax, child/dependent care (2441), education (8863),
│              retirement saver's (8880), residential energy; + estimated payments, excess SS
├─ Credits on 1040 face: CTC/ODC (Sch 8812), EITC (Sch EIC), premium tax credit (8962)
└─ Payments → refund (direct deposit) or amount owed
```

Dependency ordering matters: Sch C → SE tax → ½ SE adjustment → AGI → AGI-dependent limits (medical floor, EITC, saver's credit, PTC) → taxable income → tax → credits ordered nonrefundable-then-refundable. The engine must compute as a dependency graph, not top-to-bottom, and iterate where circular (rare in V1 scope; SE health insurance + PTC interaction is a known circular case — flag for expert review in V1).

## 5. Deductions & Credits Map (V1 candidates)

| Item | Form | Key eligibility gates | V1 |
|---|---|---|---|
| Standard deduction | 1040 | filing status, age/blind, dependent-of-another | ✅ |
| Itemized | Sch A | compare vs standard; SALT cap w/ phase-down | ✅ |
| Schedule 1-A deductions | 1-A | occupation/tips, FLSA overtime, VIN/new-vehicle, age 65+, AGI/MAGI limits, SSN requirements | ✅ (2025+) |
| Student loan interest | Sch 1 | $2,500 cap, MAGI phase-out, not MFS | ✅ |
| HSA | 8889 | HDHP coverage, limits by coverage type | ✅ |
| IRA deduction | Sch 1 | earned income, employer-plan coverage, MAGI phase-out | ✅ |
| QBI | 8995 | trade/business, taxable income threshold; 8995-A above threshold → expert review | ✅ simple form only |
| Child Tax Credit / ODC | 8812 | qualifying child tests (age, residency, SSN), MAGI phase-out | ✅ |
| EITC | Sch EIC | earned income, AGI, investment-income cap, qualifying-child tiebreakers, due-diligence rules | ✅ (high-care) |
| Child & dependent care | 2441 | earned-income test both spouses, provider TIN | ✅ |
| Education credits (AOTC/LLC) | 8863 | 1098-T, enrollment status, felony-drug rule, MAGI | ✅ |
| Saver's credit | 8880 | AGI tiers, full-time-student exclusion | ✅ |
| Premium tax credit | 8962 | 1095-A reconciliation — **mandatory** when 1095-A present | ✅ |
| Foreign tax credit | 1116/Sch 3 | ≤$300/$600 no-1116 path only | Partial |
| Energy credits, adoption, AMT, NIIT computation | various | complex | ❌ → expert review |

## 6. Federal Tax Calculation Pipeline (deterministic engine spec)

```
facts (Tax Fact Graph, user-confirmed)
 → 1. filing-status determination (rule-based, with tiebreakers)
 → 2. dependent determination (qualifying child / qualifying relative tests)
 → 3. income aggregation per category (each with its own sub-schedule logic)
 → 4. Schedule C net profit → Schedule SE → SE tax + ½-SE adjustment
 → 5. total income → adjustments → AGI
 → 6. standard-vs-itemized resolution (+ Schedule 1-A) → QBI → taxable income
 → 7. tax computation (tax table <$100k, tax computation worksheet ≥$100k,
      qualified dividends & cap-gain worksheet when applicable)
 → 8. additional taxes (Sch 2)
 → 9. nonrefundable credits (ordered per instructions)
 → 10. refundable credits
 → 11. payments → refund / balance due
 → 12. explanation tree emitted for every line (inputs, rule ID, source citation)
```

Every step consumes only versioned rule modules for the return's `tax_year` and emits a trace node so "How was this calculated?" can be answered by walking the tree — no LLM involved in the numbers.

## 7. Sources

- 2025 Form 1040 & instructions: https://www.irs.gov/instructions/i1040gi
- Standard deduction: https://www.irs.gov/taxtopics/tc551
- 2025 Schedule A instructions: https://www.irs.gov/instructions/i1040sca
- Rev. Proc. 2024-40: https://www.irs.gov/pub/irs-drop/rp-24-40.pdf
- OBBBA provisions (tips/overtime/car loan/senior deduction, Schedule 1-A): IRS.gov "One Big Beautiful Bill" guidance pages
