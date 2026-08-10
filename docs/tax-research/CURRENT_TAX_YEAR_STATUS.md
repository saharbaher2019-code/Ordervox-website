# CURRENT_TAX_YEAR_STATUS

_As of 2026-08-10 (Stage 0 — no engine implemented yet)._

- **Latest supported tax year (target for V1):** 2025 (filed 2026). Tax year 2026 rules exist in draft/announced form only; do not implement until final forms/instructions release (typically Dec–Jan).
- **Forms verified (existence/structure, not yet implemented):** 1040, Schedules 1, 1-A (new 2025), 2, 3, A, B, C, D, SE; Forms 8812, 8863, 8962, 8889, 8949, 2441, 8880, Sch EIC.
- **Rules verified at research level:** 2025 standard deduction, brackets (Rev. Proc. 2024-40 + OBBBA), Schedule 1-A deductions, SALT cap change. Full per-rule verification happens per SOURCE_REGISTER process before implementation.
- **IRS sources verified:** i1040 (2025), Topic 551, Sch A instructions (2025), Pub 3112, Pub 1345, Pub 4163, Pub 4164 (located; deep read scheduled Stage 15 planning).
- **States verified:** none yet — first state (recommended: California FTB) research begins Stage 13.
- **Known pending guidance:** ongoing OBBBA implementation guidance (tips occupation list, overtime reporting mechanics on 2025 W-2s, 1099-DA first-year broker reporting quirks); monitor IRS newsroom.
- **Known unsupported scenarios:** see escalation list in `TAX_DOCUMENT_MATRIX.md`.
- **Re-verification rule:** at every new tax-year onboarding and at the start of each filing season, all register rows must be re-verified against current IRS releases before the year is marked supported.
