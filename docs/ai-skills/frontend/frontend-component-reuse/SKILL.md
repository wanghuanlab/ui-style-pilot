---
name: frontend-component-reuse
description: Find, reuse, extend, or create shared frontend components. Use when adding search panels, table toolbars, data tables, drawers, status tags, pagination, page scaffolds, or other repeated UI so the project avoids one-off implementations and style drift.
---

# Frontend Component Reuse

Use this skill whenever a task might add or change UI that could be shared across pages.

## Required Context

Read these before creating or changing components:

1. `../../../frontend-standards/README.md`
2. `../../../frontend-standards/01-design-tokens.md`
3. `../../../frontend-standards/04-component-rules.md`
4. `../../../frontend-standards/06-coding-rules.md`
5. `../../../frontend-standards/09-review-checklist.md`

## Component-First Workflow

1. Identify the UI pattern: page scaffold, search panel, toolbar, table, pagination, status tag, drawer, modal, empty state, tree panel, upload, or form section.
2. Search existing public components:

```bash
find src/components -maxdepth 3 -type f \( -name "*.vue" -o -name "*.tsx" -o -name "*.ts" \) | sort
rg -n "Search|Filter|Toolbar|Table|Drawer|Modal|Pagination|Status|Tag|Scaffold|Layout|Tree|ColumnConfig" src/components
```

3. Prefer options in this order:
   - Reuse existing component directly.
   - Extend existing component with a backwards-compatible prop or slot.
   - Extract a repeated pattern into a new public component.
   - Use page-local implementation only when the pattern is truly one-off.
4. If creating a component, place it according to the target long-term structure:

```text
src/components/base/
src/components/business/
src/components/layout/
src/components/feedback/
src/components/legacy/
```

If the structure does not exist yet, propose the placement before editing.

## Public Component Standards

Public components should:

- Use design tokens and project class naming.
- Avoid page-specific business names unless they are business-domain components.
- Expose clear props and slots.
- Avoid direct API calls unless the component owns that data contract.
- Avoid hardcoded page text except stable UI labels.
- Keep Ant Design Vue as the default UI library for new shared components.

## Avoid

- Creating a component just to hide a tiny one-off div.
- Adding broad style overrides that affect unrelated pages.
- Copying a component into a page and changing class names.
- Adding props that encode one page's temporary needs instead of a reusable behavior.

## Output Expectations

When done or proposing work, state:

- Existing components checked.
- Component reused, extended, or created.
- Why the chosen approach avoids style drift.
- Whether any migration follow-up is needed.
