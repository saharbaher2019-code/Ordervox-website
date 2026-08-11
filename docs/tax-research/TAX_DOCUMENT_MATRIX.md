# Tax Document Matrix

Legend — V1 column: **S** = Supported, **P** = Partially supported, **E** = Requires expert review, **N** = Not yet supported. The system must classify every uploaded document and route unsupported ones to the escalation path — never silently compute.

| Document | Purpose | Important fields | Related forms | Required follow-up questions | Complexity | V1 |
|---|---|---|---|---|---|---|
| **W-2** | Employer wages & withholding | Boxes 1–6, 7–8 tips, 10 dependent care, 12 codes (esp. D/E/G/W/DD), 13 flags, 14, state/local 15–20; EIN, employee SSN | 1040 line 1; 8889 (code W); 2441 (box 10); Sch 1-A (tips/overtime per employer reporting) | Still employed? Other jobs? Any tip income not on W-2? Overtime portion (2025 Sch 1-A)? | Low | **S** |
| **W-2C** | Corrected W-2 | Previously-reported vs corrected pairs | replaces W-2 | Which original does this correct? Was original already entered? | Med | **S** (supersede logic) |
| **W-2G** | Gambling winnings | Winnings, withholding, wager type | Sch 1 other income; Sch A losses | Gambling losses (≤ winnings, itemizers only)? Session records? | Med | **P** |
| **1099-NEC** | Nonemployee compensation | Box 1, withholding | Sch C → Sch SE | Business activity? Expenses (mileage, home office, supplies, insurance, fees)? Other clients w/o 1099? Estimated payments? Accounting method? | High | **S** (simple sole prop) |
| **1099-MISC** | Rents, royalties, other income | Boxes 1–3, 8, 10 | Sch E (rent/royalty), Sch 1 | Which box? Rental → E (expert review V1); prize/other → Sch 1 | High | **P** (box 3 only; rents → E) |
| **1099-K** | Payment-card/TPSO gross | Gross amount, transaction count | Sch C or none | **Never assume taxable profit.** Personal item sales? Reimbursements? Already counted in business income (dedupe vs NEC)? | High | **P** |
| **1099-INT** | Interest | Box 1, 2 (penalty), 3 (Treasury), 8 (tax-exempt), withholding | Sch B if >$1,500 | Joint account? Nominee interest? | Low | **S** |
| **1099-DIV** | Dividends | 1a ordinary, 1b qualified, 2a cap-gain dist., 5 (199A), 7 foreign tax | Sch B, Sch D | — | Low | **S** |
| **1099-B** | Broker sales | Proceeds, basis, basis-reported flag, term, wash-sale adj. | 8949 → Sch D | Missing basis? Wash sales? Employer stock (basis often wrong)? | High | **P** (covered securities); missing basis / options / ESPP → **E** |
| **1099-R** | Retirement distributions | Box 1, 2a, 2b, 4, 7 code(s), IRA flag | 1040 4/5; 5329 | Rollover within 60 days? Roth? Code-driven questions (early distribution exceptions)? Basis in nondeductible IRA (8606 → E) | Med | **S** common codes (1,2,4,7,G); others **E** |
| **1099-G** | Unemployment / state refund | Box 1 unemployment, box 2 state refund, withholding | Sch 1 | State refund: did you itemize prior year (taxability)? | Low | **S** |
| **1099-S** | Real estate sale | Gross proceeds | Sch D/8949; §121 exclusion | Main home? Ownership/use tests? Basis & improvements? | High | **E** |
| **1099-C** | Canceled debt | Amount, code | Sch 1; Form 982 | Insolvency? Bankruptcy? → exclusions are complex | High | **E** |
| **1099-A** | Property abandonment/foreclosure | Balance, FMV | with 1099-C analysis | — | High | **E** |
| **1099-Q** | 529/Coverdell distributions | Gross, earnings, basis | vs. education expenses; 8863 interaction | Qualified expenses? Coordination with education credits (no double dip) | High | **E** |
| **1099-SA** | HSA/MSA distributions | Amount, code | 8889 | All spent on qualified medical? | Med | **S** (with 8889) |
| **1099-DA** | Digital asset sales (new) | Proceeds, basis where reported | 8949/Sch D; digital-asset question on 1040 | Basis records? DeFi/staking/mining (→E)? | High | **P** (simple buy/sell); anything else **E** |
| **SSA-1099** | Social Security benefits | Box 5 net benefits, withholding | 1040 line 6; taxability worksheet | — | Low | **S** |
| **Schedule K-1** (1065/1120-S/1041) | Pass-through income | many boxes/codes | Sch E p2 + many | Nearly always complex | Very high | **E** (detect & route; simple interest/dividend-only K-1 maybe **P** later) |
| **1098** | Mortgage interest | Interest, points, MIP, property tax (often box 10/escrow) | Sch A | Acquisition-debt balance vs $750k limit? Refi history? Home equity use? | Med | **S** (single home, under limit); over limit → **E** |
| **1098-E** | Student loan interest | Box 1 | Sch 1 | — | Low | **S** |
| **1098-T** | Tuition | Box 1 payments, 5 scholarships, half-time flag | 8863 | Who is the student? Year in school? Prior AOTC claims? Books/supplies paid separately? | Med | **S** |
| **1095-A** | Marketplace insurance | Monthly premiums, SLCSP, APTC | **8962 mandatory** | Household changes mid-year? Shared policy? Allocation (→E)? | High | **S** (single policy, no allocation) |
| Receipts / expense docs | Substantiate deductions | vendor, date, amount, category | Sch C/A | Business vs personal %? | Med | **P** (categorize + confirm) |
| Estimated-payment records | Payments | dates, amounts, year applied | 1040 payments | Which tax year/quarter? Federal vs state? | Low | **S** |
| Prior-year return | Carryovers, comparison, AGI for identity | AGI, carryovers, itemized-vs-standard, state refund taxability | many | Capital-loss carryover? Overpayment applied? | Med | **S** (data source) |
| Charitable donation docs | Sch A charity | org, date, amount, cash/noncash | Sch A; 8283 if noncash >$500 | Noncash valuation (>$500 → 8283, >$5,000 appraisal → E) | Med | **S** cash / **E** large noncash |
| Brokerage consolidated statements | Combine INT/DIV/B | composite | Sch B/D | Treat as container → split into constituent 1099s | High | **P** |

## Out-of-scope triggers (automatic escalation)

Complex/multi-activity K-1s, trusts/estates, foreign entities (5471/8865), FBAR/8938 thresholds, nontrivial foreign income, passive-activity limitations, ISO/AMT and complex stock comp, crypto beyond simple disposals, rental real estate (V1), multi-state allocation, amended returns, open IRS controversy, clergy, household employees, farm income, NOLs. Detection rules for each live in the capability-matrix module and are tested.
