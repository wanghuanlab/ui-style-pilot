---
name: frontend-style-migration
description: Use when migrating an existing frontend page or local URL toward the unified design and component system, especially AI-generated pages with style drift, inline styles, hardcoded visual values, duplicated search/table/toolbars, or inconsistent Ant Design Vue usage.
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
6. `../../../frontend-standards/05-form-rules.md`
7. `../../../frontend-standards/05-interaction-rules.md`
8. `../../../frontend-standards/06-coding-rules.md`
9. `../../../frontend-standards/09-review-checklist.md`
10. `../../../frontend-standards/10-component-inventory.md`
11. `../../../frontend-standards/components/README.md`

When the migration touches a documented `Usp*` component pattern, also read the specific component document under `../../../frontend-standards/components/`.

Also read `../../../../AGENTS.md` before editing, because it is the project-wide AI collaboration baseline.

## URL-First Workflow

When the user provides a local URL such as `http://127.0.0.1:2149/project/overview`, treat the URL as the migration target.

1. Locate the route and source page before editing:

```bash
rg -n "project/overview|/project/overview|name:.*project|path:.*overview" src/router src/views src/store
```

If the exact URL cannot be mapped from route config, search likely page names and menu metadata before asking the user.

2. Open the page in a browser when available and capture the current visual state at:
   - `1920x1080`
   - `1280x720`

3. Inventory only the target page and directly related local components:

```bash
rg -n "style=|:style=|#[0-9a-fA-F]{3,8}|rgb\\(|rgba\\(|font-size:|padding:|margin:|border-radius:|:deep\\(\\.ant-|:deep\\(\\.el-" <target-page-file>
```

4. Produce a migration plan before editing unless the user explicitly says to implement directly. The plan must identify:
   - Source page file.
   - Current style and component reuse issues.
   - Which `Usp*` components will replace local structures.
   - Which business logic, API calls, and route behavior must remain unchanged.
   - Verification commands and browser checks.

5. If implementation is approved, migrate in small slices and verify after each meaningful slice.

## Usp Component Migration Map

Prefer the new standards-aligned components exported from `@/components`:

| Existing page structure | Preferred component |
|---|---|
| Standard action buttons such as add/edit/delete/import/export/search/reset/save/cancel | `UspActionButton` |
| Page shell, background, content scroll | `UspPage` |
| Breadcrumb, title, page-level actions | `UspPageHeader` |
| Repeated section box | `UspSection` |
| Search form, query/reset/more fields | `UspSearchPanel` |
| Table actions, refresh, density, column config | `UspTableToolbar` |
| Table, empty state, loading, pagination | `UspDataTable` |
| Status or approval labels | `UspStatusTag` |
| Column configuration drawer | `UspColumnConfigDrawer` |
| Form section, form grid, label/value field, readonly property, form actions | `UspFormSection`, `UspFormGrid`, `UspFormItem`, `UspReadonlyField`, `UspFormActions` |
| Create/edit/view drawer | `UspFormDrawer` |
| Empty, loading, result states | `UspEmptyState`, `UspLoadingState`, `UspResultState` |

Do not create `UspInput`, `UspSelect`, or other basic field wrappers during a page migration unless the same repeated need already exists across multiple pages. Use Ant Design Vue controls inside page-specific slots when needed.

For list search fields inside `UspSearchPanel`, use the existing `UspCompact*` controls rather than page-local `:deep(.ant-*)` height overrides. For documented 28px compact form and property areas, use `UspFormItem` with `UspCompactInput`, `UspCompactSelect`, `UspCompactDatePicker`, or Ant Design Vue controls wrapped by `UspFormItem`.

For page shells and page headers, migrate to `UspPage` and `UspPageHeader` and follow `../../../frontend-standards/components/UspPage.md` and `../../../frontend-standards/components/UspPageHeader.md`. Do not preserve duplicated page background, breadcrumb, title, or header-action styles.

For table toolbars, migrate to `UspTableToolbar` and follow `../../../frontend-standards/components/UspTableToolbar.md`. Do not preserve page-local refresh, density, column-config button groups, or toolbar alignment overrides.

For standard action buttons, migrate to `UspActionButton` and follow `../../../frontend-standards/components/UspActionButton.md`. Do not preserve page-local icon choices, button type choices, or inconsistent text/icon combinations for standard actions such as add, edit, delete, import, export, column config, search, reset, save, and cancel.

For standard data tables, migrate table visuals, loading, empty state, and pagination footer to `UspDataTable` and follow `../../../frontend-standards/components/UspDataTable.md`.

For status labels, migrate to `UspStatusTag` and follow `../../../frontend-standards/components/UspStatusTag.md`. Do not preserve page-local status color maps unless a documented business exception exists.

For table column visibility, hiding, ordering, or column-setting interactions, migrate to `UspColumnConfigDrawer` and follow `../../../frontend-standards/components/UspColumnConfigDrawer.md`. Do not preserve or recreate page-local column configuration drawers unless there is a documented business exception.

For form and property areas, migrate to `UspFormSection`, `UspFormGrid`, `UspFormItem`, `UspReadonlyField`, and `UspFormActions`, and follow `../../../frontend-standards/components/UspFormLayout.md`. Do not preserve hand-written `字段名：`, `div + span` property rows, page-local label widths, or `a-row/a-col + a-form-item` form layouts when the standard form components cover the case.

## Migration Strategy

Migrate in small, reviewable slices. Do not rewrite an entire business page unless necessary.

Recommended order:

1. Inventory current issues.
2. Preserve data loading, route params, emitted events, selection behavior, and API contracts.
3. Replace page shell and header with `UspPage` and `UspPageHeader` when suitable.
4. Standardize search panel with `UspSearchPanel`.
5. Standardize toolbar and actions with `UspTableToolbar`.
6. Standardize standard operation buttons with `UspActionButton`.
7. Standardize table, status tags, pagination, and empty/loading states with `UspDataTable` and `UspStatusTag`.
8. Standardize form and property areas with `UspFormSection`, `UspFormGrid`, `UspFormItem`, `UspReadonlyField`, and `UspFormActions`.
9. Standardize drawers, modals, and feedback states.
10. For documented `Usp*` components, check whether the migration requires updating the component standard document.
11. Replace inline styles and hardcoded tokens left in the migrated area.
12. Remove duplicated local styles that are now covered by public components.
13. Verify at `1920x1080` and `1280x720` when a browser is available.

## Inventory Commands

Use targeted scans:

```bash
rg -n "style=|:style=" src/views src/components src/layouts
rg -n "#[0-9a-fA-F]{3,8}|rgb\\(|rgba\\(" src/views src/components src/layouts
rg -n "font-size:|padding:|margin:|border-radius:" src/views src/components src/layouts
rg -n ":deep\\(\\.ant-|:deep\\(\\.el-" src/views src/components src/layouts
```

Narrow the scan to the target page before editing.

## Standard User Prompt

When a teammate wants to migrate a page by URL, they can use:

```text
请使用 docs/ai-skills/frontend/frontend-style-migration/SKILL.md，
把 <URL> 对应页面按前端规范做渐进式迁移。

要求：
1. 先阅读 AGENTS.md 和 docs/frontend-standards 相关规范。
2. 先通过路由定位 URL 对应页面文件。
3. 先审查页面现状并给迁移方案，不要直接大范围重写。
4. 优先使用 src/components/index.ts 导出的 Usp* 新组件。
5. 如涉及已文档化组件，先阅读 docs/frontend-standards/components/ 下的对应组件规范。
6. 本轮只迁移页面骨架、搜索区、工具栏、表格、状态标签、抽屉、反馈状态等视觉结构。
7. 不改变接口、不改变路由、不改变业务字段含义。
8. 不写内联 style，不硬编码颜色、字号、间距、圆角。
9. 改完后运行构建，并用浏览器打开页面检查 1920x1080 和 1280x720。
```

## Guardrails

- Preserve business behavior and API contracts.
- Do not change backend request or response handling unless the user asks.
- Do not mix unrelated refactors into style migration.
- Do not remove user changes in a dirty worktree.
- Do not create a new component until checking existing components.
- Do not hand-code standard action buttons when `UspActionButton` already covers the action.
- Do not hand-code label/value form rows when `UspFormItem` or `UspReadonlyField` covers the field.
- Do not hand-write colons after form labels; the standard form components generate them.
- Do not move or rename historical shared components while migrating one page.
- Do not replace a working business flow just to match a component API. Adapt through slots or keep the local structure for a later pass.
- Keep each migration pass small enough to review.

## Completion Criteria

A migrated page should:

- Use public components where appropriate.
- Use `UspActionButton` for standard actions such as add, edit, delete, import, export, column config, search, reset, save, and cancel.
- Use `UspFormItem` or `UspReadonlyField` for label/value fields, with no page-local hand-written colons.
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
