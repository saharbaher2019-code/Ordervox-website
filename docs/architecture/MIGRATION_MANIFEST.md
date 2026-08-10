# Migration Manifest — Tax Product Repository Separation

**Decision (owner-approved):** the tax product must not live inside `Ordervox-website`. Dedicated repository working name: **`voxnova-tax-ai`**.

## What stays in Ordervox-website
- `docs/` Stage 0 package (this PR) — retained as review evidence only. No tax application code will ever be added to this repository.

## What moves to `voxnova-tax-ai`
- A copy of the entire `docs/` tree (tax-research, compliance, architecture, security) becomes the living documentation; the Ordervox copy is frozen at Stage 0 approval.
- All Stage 1+ implementation (apps, packages, workers, infra, CI) is created only in the new repository.

## Operational separation requirements (non-negotiable)
Own: repository · application · database · object storage · encryption boundary/keys · secrets · environments · CI/CD · cloud resources · logging · analytics boundary · authentication configuration · deployment pipeline. Never: copy taxpayer data into OrderVox systems, share production databases, share encryption keys, share raw logs, share document storage.

## Owner actions if repository creation is unavailable to the agent
Create `voxnova-tax-ai` (private) under the owning account/org and grant the development agent access; implementation resumes there.
