# 10 现有组件盘点

本文件用于指导 AI 和开发者优先复用 `src/components` 中已有组件。当前阶段只建立统一入口和复用清单，不移动组件、不重构实现。

新页面建议从统一入口导入：

```ts
import { DsPage, DsDataTable, DsColumnConfigDrawer, DsStatusTag } from "@/components";
```

旧页面已有的相对路径引用可以逐步迁移，不需要一次性替换。

已形成稳定规范的 `Ds*` 组件，应同时查看 `docs/frontend-standards/components/` 中的组件文档。

## 新范式组件规划

新抽象的规范组件统一使用 `Ds*` 命名。当前阶段目标是先形成新页面可复用的标准组件层，不移动历史组件，不要求老页面一次性迁移。

| 规划组件 | 推荐路径 | 类型 | 状态 | 目标用途 | 对应历史能力 |
|---|---|---|---|---|---|
| `DsActionButton` | `src/components/base/DsActionButton.vue` | base | draft | 标准动作按钮、图标、类型、危险态统一 | 页面自写 `a-button` 标准动作 |
| `DsPage` | `src/components/layout/DsPage.vue` | layout | stable | 标准页面外壳、内容宽度、页面背景、纵向节奏 | `PageScaffold` |
| `DsPageHeader` | `src/components/layout/DsPageHeader.vue` | layout | stable | 页面标题、面包屑、主操作区 | `PageScaffold` 标题区域 |
| `DsCollapse` | `src/components/layout/DsCollapse.vue` | layout | draft | 表单页、详情页的可折叠业务分区 | 页面自写 `a-collapse` |
| `DsTabs` | `src/components/layout/DsTabs.vue` | layout | draft | 表单页、详情页的主内容页签 | 页面自写 `a-tabs` |
| `DsTabContent` | `src/components/layout/DsTabContent.vue` | layout | draft | Tab 内部内容区、工具栏、表格承载 | 页面自写 `tab-content` / `tab-toolbar` |
| `DsSection` | `src/components/layout/DsSection.vue` | layout | draft | 页面分区容器、区块标题、右侧操作 | 页面内自写 section |
| `DsSearchPanel` | `src/components/business/DsSearchPanel.vue` | business | stable | 列表页标准搜索区、常用字段、更多字段、查询重置 | `AdvancedFilter`、页面自写搜索区 |
| `DsTableToolbar` | `src/components/business/DsTableToolbar.vue` | business | stable | 表格主操作、批量操作、刷新、列设置、密度 | `RightToolbar`、页面自写 toolbar |
| `DsTableSurface` | `src/components/business/DsTableSurface.vue` | business | draft | 历史 `a-table` 视觉迁移承载层 | 页面自写 `a-table` 表头、hover、分页样式 |
| `DsDataTable` | `src/components/business/DsDataTable.vue` | business | stable | 标准数据表格、分页、选择、空状态、loading | 页面自写 `a-table` / `el-table` |
| `DsColumnConfigDrawer` | `src/components/business/DsColumnConfigDrawer.vue` | business | stable | 统一列配置抽屉 | `ColumnConfigDrawer`、`ColumnConfigTransfer` |
| `DsFormSection` | `src/components/business/DsFormSection.vue` | business | draft | 表单分组标题、说明、操作区 | 页面自写分组标题 |
| `DsFormGrid` | `src/components/business/DsFormGrid.vue` | business | draft | 表单字段多列布局、label 宽度控制 | 页面自写 `a-row/a-col` |
| `DsFormItem` | `src/components/business/DsFormItem.vue` | business | draft | 编辑态字段 label、冒号、必填、提示统一 | 页面自写 `a-form-item` 或 `div + span` |
| `DsReadonlyField` | `src/components/business/DsReadonlyField.vue` | business | draft | 只读属性名和值展示 | 页面手写属性展示 |
| `DsFormActions` | `src/components/business/DsFormActions.vue` | business | draft | 表单底部按钮区 | 页面自写 footer 操作区 |
| `DsFormDrawer` | `src/components/business/DsFormDrawer.vue` | business | draft | 新增、编辑、查看类表单抽屉 | 页面自写 Drawer |
| `DsButton` | `src/components/base/DsButton.vue` | base | draft | 当按钮规则需要统一增强时承载按钮规范 | Ant Design Vue Button |
| `DsCompactInput` | `src/components/base/DsCompactInput.vue` | base | draft | 28px 紧凑文本输入 | Ant Design Vue Input |
| `DsCompactSelect` | `src/components/base/DsCompactSelect.vue` | base | draft | 28px 紧凑下拉选择 | Ant Design Vue Select |
| `DsCompactDatePicker` | `src/components/base/DsCompactDatePicker.vue` | base | draft | 28px 紧凑日期选择 | Ant Design Vue DatePicker |
| `DsCompactRangePicker` | `src/components/base/DsCompactRangePicker.vue` | base | draft | 28px 紧凑日期范围选择 | Ant Design Vue RangePicker |
| `DsIconButton` | `src/components/base/DsIconButton.vue` | base | draft | 表格工具、列设置、刷新等图标按钮 | 页面自写图标按钮 |
| `DsStatusTag` | `src/components/base/DsStatusTag.vue` | base | stable | 统一状态标签和状态色语义 | `DictTag` |
| `DsEmptyState` | `src/components/base/DsEmptyState.vue` | base | draft | 统一空状态 | 页面自写空状态 |
| `DsLoadingState` | `src/components/feedback/DsLoadingState.vue` | feedback | draft | 页面级或区块级加载态 | 页面自写 loading |
| `DsResultState` | `src/components/feedback/DsResultState.vue` | feedback | draft | 成功、失败、无权限、异常等结果态 | 页面自写结果状态 |

已沉淀组件规范：

| 组件 | 规范文档 | Pattern | 状态 |
|---|---|---|---|
| `DsActionButton` | `docs/frontend-standards/components/DsActionButton.md` | Semantic Action Button | draft |
| `DsCompactInput` / `DsCompactSelect` / `DsCompactDatePicker` / `DsCompactRangePicker` | `docs/frontend-standards/components/DsCompactFieldControls.md` | Compact Field Controls | draft |
| `DsPage` | `docs/frontend-standards/components/DsPage.md` | Standard Page Shell | stable |
| `DsPageHeader` | `docs/frontend-standards/components/DsPageHeader.md` | Standard Page Header | stable |
| `DsCollapse` | `docs/frontend-standards/components/DsCollapse.md` | Standard Form Collapse | draft |
| `DsTabs` | `docs/frontend-standards/components/DsTabs.md` | Standard Form Tabs | draft |
| `DsTabContent` | `docs/frontend-standards/components/DsTabContent.md` | Standard Tab Content | draft |
| `DsSearchPanel` | `docs/frontend-standards/components/DsSearchPanel.md` | Compact Search Panel | stable |
| `DsTableToolbar` | `docs/frontend-standards/components/DsTableToolbar.md` | Standard Table Toolbar | stable |
| `DsTableSurface` | `docs/frontend-standards/components/DsTableSurface.md` | Standard Table Surface | draft |
| `DsDataTable` | `docs/frontend-standards/components/DsDataTable.md` | Standard Data Table | stable |
| `DsStatusTag` | `docs/frontend-standards/components/DsStatusTag.md` | Semantic Status Tag | stable |
| `DsColumnConfigDrawer` | `docs/frontend-standards/components/DsColumnConfigDrawer.md` | Table Column Configuration Drawer | stable |
| `DsFormSection` / `DsFormGrid` / `DsFormItem` / `DsReadonlyField` / `DsFormActions` | `docs/frontend-standards/components/DsFormLayout.md` | Standard Form Field Layout | draft |

建设顺序建议：

1. 先建设列表页骨架：`DsPage`、`DsPageHeader`、`DsSearchPanel`、`DsTableToolbar`、`DsDataTable`。
2. 再补齐列表页常见能力：`DsStatusTag`、`DsColumnConfigDrawer`、`DsEmptyState`、`DsLoadingState`。
3. 最后按表单迁移需要建设：`DsFormSection`、`DsFormGrid`、`DsFormItem`、`DsReadonlyField`、`DsFormActions`、`DsFormDrawer`、`DsSection`、`DsResultState`。

暂不优先建设泛用 `DsInput`、`DsSelect`、`DsDatePicker` 等基础表单控件。Ant Design Vue 已提供稳定基础控件，过早二次封装会增加维护成本。当前只沉淀列表筛选、表格工具区需要的 `DsCompact*` 紧凑控件。只有当多个页面出现稳定、重复、非页面特定的输入控件差异时，再进入更泛用的 `base/` 抽象。

## 统一导出入口

统一导出入口：

```text
src/components/index.ts
```

该入口只做命名导出，不改变组件注册方式，不影响 `src/index.ts` 中已有的全局组件注册。
