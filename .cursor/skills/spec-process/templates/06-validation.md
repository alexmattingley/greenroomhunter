# 06 · Validation

> How we verify the feature is actually built. Each acceptance criterion
> (AC-# from [02-requirements.md](./02-requirements.md)) has a way to prove it.
> The feature is **done** only when every AC passes and the Definition of Done is met.

## Automated tests
| ID | Test | Type | Proves |
| --- | --- | --- | --- |
| T-1 | <test> | <Jest unit / RTL> | AC-# |

## Manual QA (real device / responsive mode)
- **M-1** <step and expected result> → AC-#

## Acceptance criteria coverage
- AC-1 → <T-# / M-#>

## Definition of Done
- [ ] All acceptance criteria verified (tests + manual).
- [ ] `yarn lint` and the Jest suite pass.
- [ ] No `!important`; new/changed components are TypeScript (per constitution).
- [ ] Open questions resolved or explicitly deferred in [05-decisions.md](./05-decisions.md).
- [ ] Spec status set to ✅ and road-map item moved to **Done**.
