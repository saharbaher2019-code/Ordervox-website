# Authoritative Source Register

Every implemented rule must have a row here before its code merges. Blogs are never authoritative. Format is the canonical schema; initial seed rows below cover Stage 0 research.

Schema: `rule_id | tax_year | jurisdiction | subject | authoritative_source | source_version/date | implementation_module | tests | last_verified`

| rule_id | tax_year | juris. | subject | source | version/date | module | tests | verified |
|---|---|---|---|---|---|---|---|---|
| FED-2025-STD-DED | 2025 | US | Standard deduction amounts | IRS Topic 551; 2025 i1040 | 2025 instr. (Feb 2026) | tax-engine/federal/2025/standardDeduction | pending | 2026-08-10 |
| FED-2025-BRACKETS | 2025 | US | Rate brackets | Rev. Proc. 2024-40 + OBBBA | rp-24-40 | tax-engine/federal/2025/taxComputation | pending | 2026-08-10 |
| FED-2025-SCH1A | 2025 | US | Tips/overtime/car-loan/senior deductions | IRS OBBBA guidance; Sch 1-A instr. | 2025 | tax-engine/federal/2025/schedule1A | pending | 2026-08-10 |
| FED-2025-SALT-CAP | 2025 | US | SALT cap $40,000 + phase-down | 2025 Sch A instructions | 2025 | tax-engine/federal/2025/scheduleA | pending | 2026-08-10 |
| FED-EFILE-PROVIDER | n/a | US | e-file provider roles/EFIN/ETIN | Pub 3112, Pub 1345 | current | compliance docs | n/a | 2026-08-10 |
| FED-MEF-4164 | n/a | US | MeF software developer guide | Pub 4164 | current | future e-file module | n/a | 2026-08-10 |

Rules needed before Stage 8 coding (each requires its own verified row + test fixtures): SE tax (Sch SE instr.), EITC tables (Pub 596), CTC (Sch 8812 instr.), education credits (Pub 970/8863 instr.), PTC (8962 instr.), student loan interest phase-outs, IRA phase-outs (Pub 590-A), HSA limits (Rev. Proc. + 8889 instr.), Social Security taxability worksheet, qualified dividends & capital gain worksheet, tax tables file, dependency tests (Pub 501), filing-status rules (Pub 501), kiddie-tax detection threshold (escalation only).

**Process:** a CI check will refuse to merge any tax-engine module lacking a register row with a `last_verified` date in the current filing season.
