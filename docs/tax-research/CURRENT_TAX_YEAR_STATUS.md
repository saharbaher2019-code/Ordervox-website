# CURRENT_TAX_YEAR_STATUS

_As of 2026-08-10 (Stage 0 approved with corrections; Stage 1 in progress in dedicated repo)._

## Tax-year strategy (product-owner approved)

- **TY2025 = REFERENCE / GOLDEN VALIDATION YEAR.** Forms and instructions are finalized → used for engine design, golden tests, historical regression tests, versioning and validation architecture. Not the production filing target.
- **TY2026 = PRIMARY PRODUCTION TARGET.** Returns prepared/filed in the 2027 filing season. Current TY2026 IRS forms, instructions, MeF schemas and business rules may be **draft, preliminary, or changing** — a draft IRS artifact is never treated as final authority.

## Authoritative artifact status lifecycle

Every registered artifact carries one of: `DRAFT → PRELIMINARY → RELEASED → ATS_VALID → PRODUCTION_VALID`, plus `SUPERSEDED`. Only `PRODUCTION_VALID` artifacts may back production calculations for a tax year; a `DRAFT`/`PRELIMINARY` artifact can never silently become production authority (promotion requires explicit re-verification and register update).

## Status

- **Forms verified (TY2025, RELEASED — reference year):** 1040, Schedules 1, 1-A, 2, 3, A, B, C, D, SE; Forms 8812, 8863, 8962, 8889, 8949, 2441, 8880, Sch EIC.
- **TY2026 artifacts:** monitoring only; expect drafts through late 2026. None registered as production-valid.
- **Rules verified at research level (TY2025):** standard deduction, brackets (Rev. Proc. 2024-40 + OBBBA), Schedule 1-A deductions, SALT cap change.
- **IRS program sources located:** Pub 3112, 1345, 4163, 4164 (deep read at Stage 15 planning).
- **States verified:** none — California (approved first state) research begins Stage 13.
- **Known pending guidance:** OBBBA implementation guidance (tips occupation list, overtime reporting, 1099-DA first-year quirks); all TY2026 inflation adjustments and form revisions.
- **Known unsupported scenarios:** see escalation list in `TAX_DOCUMENT_MATRIX.md` and capability tiers in `PRODUCT_REQUIREMENTS.md`.
- **Re-verification rule:** at every new tax-year onboarding and at the start of each filing season, all register rows must be re-verified against current IRS releases; TY2026 rows must additionally track status promotions as IRS finalizes artifacts.
