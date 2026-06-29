---
name: frontend-page-builder
description: Build or modify frontend pages under project UI standards. Use when creating Vue pages, changing page structure, adding business list/detail/form screens, or generating UI from product requirements while preserving shared components, tokens, layout rules, and AI generation constraints.
---

# Frontend Page Builder

Use this skill for creating or modifying business pages in the current project.

## Required Context

Read these before changing page code:

1. `../../../frontend-standards/USAGE.md`
2. `../../../frontend-standards/README.md`
3. `../../../frontend-standards/01-design-tokens.md`
4. `../../../frontend-standards/02-layout-rules.md`
5. `../../../frontend-standards/04-component-rules.md`
6. `../../../frontend-standards/06-coding-rules.md`
7. `../../../frontend-standards/07-ai-generation-rules.md`
8. `../../../frontend-standards/08-page-templates.md`
9. `../../../frontend-standards/09-review-checklist.md`

## Workflow

1. Identify the page type: list, form, detail, drawer edit, left-tree-right-table, overview, or empty state.
2. Search existing components before writing UI:

```bash
rg "PageScaffold|SystemPageLayout|AdvancedFilter|ColumnConfig|Pagination|DictTag|RightToolbar|TreePanel" src/components
```

3. Choose the matching template from `08-page-templates.md`.
4. Reuse or extend existing public components before creating page-local structures.
5. Prefer `ant-design-vue` for new business pages.
6. Keep page scoped styles limited to local layout.
7. Verify the result against `09-review-checklist.md`.

## Hard Rules

- Do not write inline `style` in business templates.
- Do not hardcode non-token colors, font sizes, spacing, or radii.
- Do not create a new visual style for one page.
- Do not duplicate search panels, table toolbars, pagination, status tags, or column configuration if a public component exists.
- Do not mix Ant Design Vue and Element Plus in a new page unless the existing dependency makes it unavoidable.
- Do not leave key actions unreachable at `1280x720`.

## Output Expectations

When reporting the work, include:

- Page type and template used.
- Public components reused or extended.
- Any new component introduced and why.
- Verification performed.
- Known risks or follow-up migration needs.
