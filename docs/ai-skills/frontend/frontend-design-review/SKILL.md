---
name: frontend-design-review
description: Review frontend pages for visual, layout, component reuse, interaction, accessibility, and coding-rule compliance. Use when checking whether a page, route, screenshot, or PR follows the project design mapping and frontend standards without necessarily changing code.
---

# Frontend Design Review

Use this skill to review a frontend page against the project standards. Default to review-only unless the user explicitly asks for fixes.

## Required Context

Read these before reviewing:

1. `../../../frontend-standards/USAGE.md`
2. `../../../frontend-standards/README.md`
3. `../../../frontend-standards/01-design-tokens.md`
4. `../../../frontend-standards/02-layout-rules.md`
5. `../../../frontend-standards/03-navigation-rules.md`
6. `../../../frontend-standards/04-component-rules.md`
7. `../../../frontend-standards/05-form-rules.md`
8. `../../../frontend-standards/05-interaction-rules.md`
9. `../../../frontend-standards/06-coding-rules.md`
10. `../../../frontend-standards/09-review-checklist.md`
11. `../../../frontend-standards/10-component-inventory.md`
12. `../../../frontend-standards/components/README.md`

## Review Inputs

Use the strongest available evidence:

- Running route URL and screenshots.
- Vue source files.
- Existing public component usage.
- Computed browser styles when visual compliance matters.
- Static scans for inline style and hardcoded values.

## Review Workflow

1. Identify the page or flow being reviewed.
2. Capture or inspect the current UI when a URL is available.
3. Check standards in this order:
   - Design tokens.
   - Layout and responsive behavior.
   - Navigation and breadcrumb hierarchy.
   - Public component reuse.
   - Form and readonly property field consistency.
   - Interaction states.
   - Coding-rule compliance.
   - Accessibility risks visible from the evidence.
4. Report findings by severity and evidence.
5. Separate confirmed issues from risks that require further testing.

## Common Checks

Run targeted searches when source is available:

```bash
rg -n "style=|:style=|#[0-9a-fA-F]{3,8}|font-size:|padding:|margin:|border-radius:|:deep\\(\\.ant-" src/views src/components src/layouts
```

Check whether the page duplicates:

- Search panel.
- Table toolbar.
- Pagination.
- Status tags.
- Column configuration.
- Drawer or modal form layout.
- Form label/value rows, hand-written colons, and page-local label widths.

## Output Format

Lead with the conclusion:

- `符合`
- `部分符合`
- `不符合`

Then list:

1. Strengths.
2. Findings with evidence.
3. Accessibility risks.
4. Recommended next steps.
5. What could not be verified.
