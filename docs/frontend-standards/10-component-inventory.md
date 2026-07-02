# 10 现有组件盘点

本文件用于指导 AI 和开发者优先复用 `src/components` 中已有组件。当前阶段只建立统一入口和复用清单，不移动组件、不重构实现。

新页面建议从统一入口导入：

```ts
import { UspPage, UspDataTable, UspColumnConfigDrawer, UspStatusTag } from "@/components";
```

旧页面已有的相对路径引用可以逐步迁移，不需要一次性替换。

已形成稳定规范的 `Usp*` 组件，应同时查看 `docs/frontend-standards/components/` 中的组件文档。

## 新范式组件规划

新抽象的规范组件统一使用 `Usp*` 命名。当前阶段目标是先形成新页面可复用的标准组件层，不移动历史组件，不要求老页面一次性迁移。

| 规划组件 | 推荐路径 | 类型 | 状态 | 目标用途 | 对应历史能力 |
|---|---|---|---|---|---|
| `UspActionButton` | `src/components/base/UspActionButton.vue` | base | draft | 标准动作按钮、图标、类型、危险态统一 | 页面自写 `a-button` 标准动作 |
| `UspPage` | `src/components/layout/UspPage.vue` | layout | stable | 标准页面外壳、内容宽度、页面背景、纵向节奏 | `PageScaffold` |
| `UspPageHeader` | `src/components/layout/UspPageHeader.vue` | layout | stable | 页面标题、面包屑、主操作区 | `PageScaffold` 标题区域 |
| `UspCollapse` | `src/components/layout/UspCollapse.vue` | layout | draft | 表单页、详情页的可折叠业务分区 | 页面自写 `a-collapse` |
| `UspTabs` | `src/components/layout/UspTabs.vue` | layout | draft | 表单页、详情页的主内容页签 | 页面自写 `a-tabs` |
| `UspTabContent` | `src/components/layout/UspTabContent.vue` | layout | draft | Tab 内部内容区、工具栏、表格承载 | 页面自写 `tab-content` / `tab-toolbar` |
| `UspSection` | `src/components/layout/UspSection.vue` | layout | draft | 页面分区容器、区块标题、右侧操作 | 页面内自写 section |
| `UspSearchPanel` | `src/components/business/UspSearchPanel.vue` | business | stable | 列表页标准搜索区、常用字段、更多字段、查询重置 | `AdvancedFilter`、页面自写搜索区 |
| `UspTableToolbar` | `src/components/business/UspTableToolbar.vue` | business | stable | 表格主操作、批量操作、刷新、列设置、密度 | `RightToolbar`、页面自写 toolbar |
| `UspTableSurface` | `src/components/business/UspTableSurface.vue` | business | draft | 历史 `a-table` 视觉迁移承载层 | 页面自写 `a-table` 表头、hover、分页样式 |
| `UspDataTable` | `src/components/business/UspDataTable.vue` | business | stable | 标准数据表格、分页、选择、空状态、loading | 页面自写 `a-table` / `el-table` |
| `UspColumnConfigDrawer` | `src/components/business/UspColumnConfigDrawer.vue` | business | stable | 统一列配置抽屉 | `ColumnConfigDrawer`、`ColumnConfigTransfer` |
| `UspFormSection` | `src/components/business/UspFormSection.vue` | business | draft | 表单分组标题、说明、操作区 | 页面自写分组标题 |
| `UspFormGrid` | `src/components/business/UspFormGrid.vue` | business | draft | 表单字段多列布局、label 宽度控制 | 页面自写 `a-row/a-col` |
| `UspFormItem` | `src/components/business/UspFormItem.vue` | business | draft | 编辑态字段 label、冒号、必填、提示统一 | 页面自写 `a-form-item` 或 `div + span` |
| `UspReadonlyField` | `src/components/business/UspReadonlyField.vue` | business | draft | 只读属性名和值展示 | 页面手写属性展示 |
| `UspFormActions` | `src/components/business/UspFormActions.vue` | business | draft | 表单底部按钮区 | 页面自写 footer 操作区 |
| `UspFormDrawer` | `src/components/business/UspFormDrawer.vue` | business | draft | 新增、编辑、查看类表单抽屉 | 页面自写 Drawer |
| `UspButton` | `src/components/base/UspButton.vue` | base | draft | 当按钮规则需要统一增强时承载按钮规范 | Ant Design Vue Button |
| `UspCompactInput` | `src/components/base/UspCompactInput.vue` | base | draft | 28px 紧凑文本输入 | Ant Design Vue Input |
| `UspCompactSelect` | `src/components/base/UspCompactSelect.vue` | base | draft | 28px 紧凑下拉选择 | Ant Design Vue Select |
| `UspCompactDatePicker` | `src/components/base/UspCompactDatePicker.vue` | base | draft | 28px 紧凑日期选择 | Ant Design Vue DatePicker |
| `UspCompactRangePicker` | `src/components/base/UspCompactRangePicker.vue` | base | draft | 28px 紧凑日期范围选择 | Ant Design Vue RangePicker |
| `UspIconButton` | `src/components/base/UspIconButton.vue` | base | draft | 表格工具、列设置、刷新等图标按钮 | 页面自写图标按钮 |
| `UspStatusTag` | `src/components/base/UspStatusTag.vue` | base | stable | 统一状态标签和状态色语义 | `DictTag` |
| `UspEmptyState` | `src/components/base/UspEmptyState.vue` | base | draft | 统一空状态 | 页面自写空状态 |
| `UspLoadingState` | `src/components/feedback/UspLoadingState.vue` | feedback | draft | 页面级或区块级加载态 | 页面自写 loading |
| `UspResultState` | `src/components/feedback/UspResultState.vue` | feedback | draft | 成功、失败、无权限、异常等结果态 | 页面自写结果状态 |

已沉淀组件规范：

| 组件 | 规范文档 | Pattern | 状态 |
|---|---|---|---|
| `UspActionButton` | `docs/frontend-standards/components/UspActionButton.md` | Semantic Action Button | draft |
| `UspCompactInput` / `UspCompactSelect` / `UspCompactDatePicker` / `UspCompactRangePicker` | `docs/frontend-standards/components/UspCompactFieldControls.md` | Compact Field Controls | draft |
| `UspPage` | `docs/frontend-standards/components/UspPage.md` | Standard Page Shell | stable |
| `UspPageHeader` | `docs/frontend-standards/components/UspPageHeader.md` | Standard Page Header | stable |
| `UspCollapse` | `docs/frontend-standards/components/UspCollapse.md` | Standard Form Collapse | draft |
| `UspTabs` | `docs/frontend-standards/components/UspTabs.md` | Standard Form Tabs | draft |
| `UspTabContent` | `docs/frontend-standards/components/UspTabContent.md` | Standard Tab Content | draft |
| `UspSearchPanel` | `docs/frontend-standards/components/UspSearchPanel.md` | Compact Search Panel | stable |
| `UspTableToolbar` | `docs/frontend-standards/components/UspTableToolbar.md` | Standard Table Toolbar | stable |
| `UspTableSurface` | `docs/frontend-standards/components/UspTableSurface.md` | Standard Table Surface | draft |
| `UspDataTable` | `docs/frontend-standards/components/UspDataTable.md` | Standard Data Table | stable |
| `UspStatusTag` | `docs/frontend-standards/components/UspStatusTag.md` | Semantic Status Tag | stable |
| `UspColumnConfigDrawer` | `docs/frontend-standards/components/UspColumnConfigDrawer.md` | Table Column Configuration Drawer | stable |
| `UspFormSection` / `UspFormGrid` / `UspFormItem` / `UspReadonlyField` / `UspFormActions` | `docs/frontend-standards/components/UspFormLayout.md` | Standard Form Field Layout | draft |

建设顺序建议：

1. 先建设列表页骨架：`UspPage`、`UspPageHeader`、`UspSearchPanel`、`UspTableToolbar`、`UspDataTable`。
2. 再补齐列表页常见能力：`UspStatusTag`、`UspColumnConfigDrawer`、`UspEmptyState`、`UspLoadingState`。
3. 最后按表单迁移需要建设：`UspFormSection`、`UspFormGrid`、`UspFormItem`、`UspReadonlyField`、`UspFormActions`、`UspFormDrawer`、`UspSection`、`UspResultState`。

暂不优先建设泛用 `UspInput`、`UspSelect`、`UspDatePicker` 等基础表单控件。Ant Design Vue 已提供稳定基础控件，过早二次封装会增加维护成本。当前只沉淀列表筛选、表格工具区需要的 `UspCompact*` 紧凑控件。只有当多个页面出现稳定、重复、非页面特定的输入控件差异时，再进入更泛用的 `base/` 抽象。

## 统一导出入口

统一导出入口：

```text
src/components/index.ts
```

该入口只做命名导出，不改变组件注册方式，不影响 `src/index.ts` 中已有的全局组件注册。
