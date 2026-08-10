# AI Tax Preparation Platform — Stage 0 Research & Architecture Package

**Status:** Stage 0 (research & architecture) — COMPLETE, pending product-owner review.
**No application code has been written.** Implementation begins only after this package is reviewed and V1 boundaries are approved.

## Package index

| # | Deliverable | Location |
|---|---|---|
| 1 | Product Requirements Document | `architecture/PRODUCT_REQUIREMENTS.md` |
| 2 | Tax Domain Overview (plain English) | `tax-research/TAX_DOMAIN_OVERVIEW.md` |
| 3 | Tax Document Matrix | `tax-research/TAX_DOCUMENT_MATRIX.md` |
| 4 | Form 1040 Flow Map | `tax-research/TAX_DOMAIN_OVERVIEW.md` §4 |
| 5 | Deductions/Credits Map | `tax-research/TAX_DOMAIN_OVERVIEW.md` §5 |
| 6 | Federal Tax Calculation Pipeline | `tax-research/TAX_DOMAIN_OVERVIEW.md` §6 |
| 7 | E-Filing Compliance Roadmap | `compliance/IRS_EFILE_ROADMAP.md` |
| 8 | Security Threat Model | `security/THREAT_MODEL.md` |
| 9 | Data Privacy Plan | `compliance/DATA_PRIVACY_PLAN.md` |
| 10 | AI Data Boundary | `compliance/DATA_PRIVACY_PLAN.md` §5 |
| 11 | System Architecture | `architecture/SYSTEM_ARCHITECTURE.md` |
| 12 | Database Model | `architecture/SYSTEM_ARCHITECTURE.md` §5 |
| 13 | Tax Fact Graph Design | `architecture/SYSTEM_ARCHITECTURE.md` §6 |
| 14 | Agent Architecture | `architecture/SYSTEM_ARCHITECTURE.md` §7 |
| 15 | Tax Rule Engine Architecture | `architecture/SYSTEM_ARCHITECTURE.md` §8 |
| 16 | Tax-Year Versioning Strategy | `architecture/SYSTEM_ARCHITECTURE.md` §9 |
| 17 | Document Processing Architecture | `architecture/SYSTEM_ARCHITECTURE.md` §10 |
| 18 | Human Review / Escalation System | `architecture/SYSTEM_ARCHITECTURE.md` §11 |
| 19 | Audit Log Design | `security/THREAT_MODEL.md` §7 |
| 20 | Testing Strategy | `architecture/SYSTEM_ARCHITECTURE.md` §12 |
| 21 | State Tax Expansion Strategy | `architecture/SYSTEM_ARCHITECTURE.md` §13 |
| 22 | Build Roadmap | `architecture/BUILD_ROADMAP.md` |
| 23 | Risk Register | `architecture/BUILD_ROADMAP.md` §3 |
| — | Source Register | `tax-research/SOURCE_REGISTER.md` |
| — | Current Tax Year Status | `tax-research/CURRENT_TAX_YEAR_STATUS.md` |

## Non-negotiable principles (restated)

1. **The LLM is never the source of truth** for any tax number, rule, threshold, or eligibility test. Three layers: AI interpretation → deterministic tax engine → authoritative knowledge layer.
2. **Never guess.** Low confidence → ask user. Uncertain rule → check authoritative source. Unsupported situation → escalate. Conflict → stop.
3. **No e-filing** until the compliance path in `compliance/IRS_EFILE_ROADMAP.md` is formally approved.
4. **Tax-year immutability.** Every calculation resolves through a versioned tax-year module.
