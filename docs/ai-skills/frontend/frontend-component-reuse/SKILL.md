---
name: frontend-component-reuse
description: Find, reuse, extend, or create shared frontend components for your project. Use when adding search panels, table toolbars, data tables, drawers, status tags, pagination, page scaffolds, or other repeated UI so the project avoids one-off implementations and style drift.
---

# Frontend Component Reuse

Use this skill whenever a task might add or change UI that could be shared across pages.

## Required Context

Read these before creating or changing components:

1. `../../../frontend-standards/README.md`
2. `../../../frontend-standards/01-design-tokens.md`
3. `../../../frontend-standards/04-component-rules.md`
4. `../../../frontend-standards/06-coding-rules.md`
5. `../../../frontend-standards/components/README.md`
6. `../../../frontend-standards/09-review-checklist.md`

When changing or using a documented `Usp*` component, also read that component's document under `../../../frontend-standards/components/`.

## Component-First Workflow

1. Identify the UI pattern: page scaffold, search panel, toolbar, table, pagination, status tag, drawer, modal, empty state, tree panel, upload, or form section.
2. Classify the component responsibility before implementation:
   - `base`: low-business UI such as buttons, icon buttons, status tags, and empty states.
   - `business`: backend-system combinations such as search panels, table toolbars, data tables, column config, and form drawers.
   - `layout`: page shells, page headers, and page sections.
   - `feedback`: loading, result, error, and permission states.
   - `legacy`: historical component notes or later migration holding area.
3. Search existing public components:

```bash
find src/components -maxdepth 3 -type f \( -name "*.vue" -o -name "*.tsx" -o -name "*.ts" \) | sort
rg -n "Search|Filter|Toolbar|Table|Drawer|Modal|Pagination|Status|Tag|Scaffold|Layout|Tree|ColumnConfig" src/components
```

4. Prefer options in this order:
   - Reuse existing component directly.
   - Extend existing component with a backwards-compatible prop or slot.
   - Extract a repeated pattern into a new public component.
   - Use page-local implementation only when the pattern is truly one-off.
5. Check `docs/frontend-standards/components/` for a documented Pattern before implementing shared UI.
6. If creating a new standards-aligned public component, use the `Usp*` naming convention and place it according to the target long-term structure:

```text
src/components/base/
src/components/business/
src/components/layout/
src/components/feedback/
src/components/legacy/
```

If the structure does not exist yet, propose the placement before editing.

Historical root-level components should not be moved or renamed as part of normal component extraction. Keep them exported from `src/components/index.ts` and migrate page usage gradually.

Every reusable `Usp*` component should have a component standard document before it is marked `stable`.

## Usp Component Priority

The first extraction target is the standard backend list-page skeleton:

| Component | Directory | Purpose |
|---|---|---|
| `UspPage` | `layout` | Standard page shell |
| `UspPageHeader` | `layout` | Title, breadcrumb, and page actions |
| `UspSection` | `layout` | Page section container |
| `UspSearchPanel` | `business` | Standard list-page search area |
| `UspTableToolbar` | `business` | Main actions, batch actions, table tools |
| `UspDataTable` | `business` | Table, selection, pagination, loading, empty state |
| `UspColumnConfigDrawer` | `business` | Column visibility and order configuration |
| `UspFormDrawer` | `business` | Create, edit, and view form drawer |
| `UspButton` | `base` | Button wrapper only when project-level behavior needs it |
| `UspCompactInput` | `base` | 28px compact input for search and table-tool areas |
| `UspCompactSelect` | `base` | 28px compact select for search and table-tool areas |
| `UspCompactDatePicker` | `base` | 28px compact date picker for search areas |
| `UspCompactRangePicker` | `base` | 28px compact date range picker for search areas |
| `UspIconButton` | `base` | Icon-only tool buttons |
| `UspStatusTag` | `base` | Unified status label and color semantics |
| `UspEmptyState` | `base` | Unified empty state |
| `UspLoadingState` | `feedback` | Page or section loading state |
| `UspResultState` | `feedback` | Success, failure, no-permission, or exception result state |

Do not start by creating generic wrappers for every Ant Design Vue field control such as `UspInput`, `UspSelect`, or `UspDatePicker`. Use Ant Design Vue directly unless multiple pages have a stable, repeated, project-specific behavior that justifies a shared wrapper.

For list search or table-tool compact fields, use `UspCompactInput`, `UspCompactSelect`, `UspCompactDatePicker`, and `UspCompactRangePicker`. These are 28px compact controls and must not be used as general edit-form controls.

For standard backend page shells, use `UspPage` and `UspPageHeader` first and read `../../../frontend-standards/components/UspPage.md` and `../../../frontend-standards/components/UspPageHeader.md`. Do not recreate page background, breadcrumb, title, or page-level action areas inside a business page.

For standard table toolbars, use `UspTableToolbar` first and read `../../../frontend-standards/components/UspTableToolbar.md`. Do not recreate refresh, density, column-config buttons, selected-count display, or toolbar alignment styles inside a page.

For standard data tables, use `UspDataTable` first and read `../../../frontend-standards/components/UspDataTable.md`. Do not recreate table header styling, zebra rows, loading, empty state, or pagination footer inside a page.

For semantic status display, use `UspStatusTag` first and read `../../../frontend-standards/components/UspStatusTag.md`. Do not hardcode status tag colors inside a page.

For table column visibility, ordering, or column-setting drawers, use `UspColumnConfigDrawer` first and read `../../../frontend-standards/components/UspColumnConfigDrawer.md`. Do not recreate column-transfer or column-sort drawer logic inside a page.

## Public Component Standards

Public components should:

- Use design tokens and project class naming.
- Avoid page-specific business names unless they are business-domain components.
- Expose clear props and slots.
- Avoid direct API calls unless the component owns that data contract.
- Avoid hardcoded page text except stable UI labels.
- Keep Ant Design Vue as the default UI library for new shared components.
- Export through `src/components/index.ts` after creation.
- Preserve backwards compatibility when extending an existing historical component.
- Update the component standard document when changing a documented component's API, interaction, or intended usage.

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
