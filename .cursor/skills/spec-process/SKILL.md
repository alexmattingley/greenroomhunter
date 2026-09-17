---
name: spec-process
description: >-
  Plan a non-trivial feature before building it by scaffolding and filling a
  structured spec in specs/<block>-<feature-slug>/. Use when the user asks to
  plan, spec, or design a feature, or before implementing anything beyond a
  small, obvious change (touches multiple files/systems, has UX/architecture
  trade-offs, or is a road-map item).
---

# Spec Process

Specs are **living working plans**. They live in `specs/<block>-<feature-slug>/`,
separate from the `agent/` constitution.

Use a spec for anything beyond a small, obvious change. Small fixes don't need one.

## Naming
Name folders after the **specific feature**, not the block — `<block>-<feature-slug>`,
kebab-case (e.g. `tide-mobile-carousel`, `buoy-swell-breakdown`). Keeps names unique
so a block can have several specs over time. Avoid bare block names like `tide-block`.

## Standard file set
| File | Purpose | Answers |
| --- | --- | --- |
| `README.md` | Index: goals/non-goals, status, affected code | Orientation |
| `01-context.md` | Current state + problem | **Why** |
| `02-requirements.md` | User stories + MUST/SHOULD/COULD + acceptance criteria | **What** |
| `03-design.md` | Technical approach, data/component changes, risks | **How** |
| `04-tasks.md` | Phased, checkboxed plan (small, reviewable steps) | **Order** |
| `05-decisions.md` | Decision log (date · decision · rationale) + open questions | **Decided** |
| `06-validation.md` | Tests + manual QA + Definition of Done, mapped to AC-# | **Done?** |

## Steps
1. **Read the constitution first** ([`AGENTS.md`](../../../AGENTS.md) → mission,
   tech-stack, conventions, road-map) and the existing code the feature touches.
2. **Scaffold the file structure** — run the script below to copy the templates,
   which come pre-filled with section headers and placeholders. Do this *before*
   deciding anything — it gives a concrete shape to react to.
3. **Ask focused questions** (structured, one screen) covering scope, UX, and tech.
   Log each answer in `05-decisions.md` as a dated decision with rationale.
4. **Reference existing patterns** in the codebase rather than inventing new ones.
5. **Flag conflicts with the road map / constitution explicitly** and note the doc
   that needs updating.
6. **Fill in** requirements → design → tasks → validation from the locked decisions.
7. **Keep it living:** new questions during implementation go into `05-decisions.md`,
   get answered, then promoted to the decision log and folded into the relevant file.
8. **On ship:** verify every acceptance criterion via `06-validation.md`, set the
   spec status to ✅, and move the road-map item to **Done**.

## Scaffolding

```bash
.cursor/skills/spec-process/scripts/scaffold.sh <block>-<feature-slug>
```

Runs from anywhere (it finds the repo root itself); the path above is written
relative to the repo root. This creates `specs/<block>-<feature-slug>/` with the
seven templated files and refuses to overwrite an existing spec folder. If scripting
isn't available, copy the files in [`templates/`](templates/) into the new folder by
hand.

## Conventions
- Requirement IDs (`FR-#`, `NFR-#`, `AC-#`) so tasks/tests can reference them.
- **Keep it DRY — say each thing once.** Rationale lives *only* in the decision log;
  requirements/design reference it instead of restating. Don't re-document the
  constitution — link to `agent/` instead. Keeps the token cost of building low.
- Every non-obvious choice gets a one-line rationale in the decision log.
- Follow [`agent/conventions.md`](../../../agent/conventions.md) (no `!important`;
  TypeScript for new components; shared tokens/types; ask before hand-rolling
  established UI patterns).
