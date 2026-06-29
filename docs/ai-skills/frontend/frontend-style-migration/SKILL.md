---
name: frontend-style-migration
description: Migrate existing frontend pages toward the unified design and component system. Use when cleaning AI-generated style drift, replacing inline styles, removing hardcoded colors or spacing, standardizing component-library overrides, and moving repeated UI into shared components.
---

# Frontend Style Migration

Use this skill for historical pages that already work but do not follow the unified frontend standards.

## Required Context

Read these before migration:

1. `../../../frontend-standards/USAGE.md`
2. `../../../frontend-standards/README.md`
3. `../../../frontend-standards/01-design-tokens.md`
4. `../../../frontend-standards/02-layout-rules.md`
5. `../../../frontend-standards/04-component-rules.md`
6. `../../../frontend-standards/05-interaction-rules.md`
7. `../../../frontend-standards/06-coding-rules.md`
8. `../../../frontend-standards/09-review-checklist.md`

## Migration Strategy

Migrate in small, reviewable slices. Do not rewrite an entire business page unless necessary.

Recommended order:

1. Inventory current issues.
2. Replace inline styles and hardcoded tokens.
3. Standardize search panel.
4. Standardize toolbar and actions.
5. Standardize table, status tags, and pagination.
6. Standardize drawers, modals, and feedback states.
7. Remove duplicated local styles that are now covered by public components.
8. Verify at `1920x1080` and `1280x720` when a browser is available.

## Inventory Commands

Use targeted scans:

```bash
rg -n "style=|:style=" src/views src/components src/layouts
rg -n "#[0-9a-fA-F]{3,8}|rgb\\(|rgba\\(" src/views src/components src/layouts
rg -n "font-size:|padding:|margin:|border-radius:" src/views src/components src/layouts
rg -n ":deep\\(\\.ant-|:deep\\(\\.el-" src/views src/components src/layouts
```

Narrow the scan to the target page before editing.

## Guardrails

- Preserve business behavior and API contracts.
- Do not change backend request or response handling unless the user asks.
- Do not mix unrelated refactors into style migration.
- Do not remove user changes in a dirty worktree.
- Do not create a new component until checking existing components.
- Keep each migration pass small enough to review.

## Completion Criteria

A migrated page should:

- Use public components where appropriate.
- Avoid inline styles in templates.
- Avoid hardcoded visual values in page styles.
- Match `frontend-standards`.
- Remain usable at `1280x720`.
- Keep existing route, data loading, and user actions working.

## Output Expectations

Report:

- Migration scope.
- Before issues found.
- Files changed.
- Public components reused or introduced.
- Verification performed.
- Remaining style debt, if any.
