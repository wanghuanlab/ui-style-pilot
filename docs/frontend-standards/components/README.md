# Ds 组件规范索引

本目录用于沉淀 `Ds*` 组件的可复用规范。组件代码解决当前项目内的复用，组件规范文档解决跨页面、跨团队、跨 AI、跨项目的复用。

新增或调整 `Ds*` 公共组件时，必须同步维护本目录中的组件规范。AI 在新增页面、迁移历史页面或扩展公共组件前，应先阅读对应组件文档，再决定复用、扩展或新增组件。

## 组件成熟度

| 状态 | 含义 | 使用建议 |
|---|---|---|
| `draft` | 初版可用，API 或交互仍可能调整 | 可在新页面试用，重要场景先确认边界 |
| `stable` | 推荐复用，API 尽量保持兼容 | 新页面和迁移页面优先使用 |
| `deprecated` | 不推荐新页面继续使用 | 只维护兼容，不再扩展能力 |
| `legacy` | 历史组件或迁移期保留组件 | 仅用于存量页面，逐步迁移 |

## 组件清单

| 组件 | Pattern | 类型 | 状态 | 用途 |
|---|---|---|---|---|
| `DsActionButton` | Semantic Action Button | base | draft | 标准动作按钮的文案、图标、类型统一 |
| `DsCompactInput` / `DsCompactSelect` / `DsCompactDatePicker` / `DsCompactRangePicker` | Compact Field Controls | base | draft | 列表筛选、表格工具区的 28px 紧凑字段控件 |
| `DsFormSection` / `DsFormGrid` / `DsFormItem` / `DsReadonlyField` / `DsFormActions` | Standard Form Field Layout | business | draft | 表单和属性区的 label、冒号、字段间距、操作区统一 |
| `DsPage` | Standard Page Shell | layout | stable | 标准页面外壳、背景、主体滚动 |
| `DsPageHeader` | Standard Page Header | layout | stable | 页面标题、面包屑、页面级操作 |
| `DsCollapse` | Standard Form Collapse | layout | draft | 表单页、详情页的可折叠业务分区 |
| `DsTabs` | Standard Form Tabs | layout | draft | 表单页、详情页的主内容页签 |
| `DsTabContent` | Standard Tab Content | layout | draft | Tab 内部内容区、工具栏和表格承载 |
| `DsSearchPanel` | Compact Search Panel | business | stable | 列表页标准搜索区 |
| `DsTableToolbar` | Standard Table Toolbar | business | stable | 表格标题、主操作、刷新、密度、列配置 |
| `DsTableSurface` | Standard Table Surface | business | draft | 历史 `a-table` 的表格视觉迁移承载层 |
| `DsDataTable` | Standard Data Table | business | stable | 标准数据表格、分页、loading、空状态 |
| `DsStatusTag` | Semantic Status Tag | base | stable | 统一状态标签和状态色语义 |
| `DsColumnConfigDrawer` | Table Column Configuration Drawer | business | stable | 表格列显示、隐藏、排序配置 |

## 标准列表页组合

后台列表页、台账页、报表页优先使用以下组合：

```text
DsPage
  header: DsPageHeader
  body:
    DsSearchPanel
    DsTableToolbar
    DsDataTable
      bodyCell: DsStatusTag
    DsColumnConfigDrawer
```

组件职责边界：

- `DsPage` 负责页面外壳、背景、主体滚动。
- `DsPageHeader` 负责面包屑、页面标题、页面级操作。
- `DsSearchPanel` 负责筛选字段、查询、重置、更多筛选入口。
- `DsTableToolbar` 负责表格标题、选中数量、表格级操作、刷新、密度、列配置入口。
- `DsDataTable` 负责表格视觉、loading、空状态、分页底栏。
- `DsStatusTag` 负责状态列展示和状态色语义。
- `DsColumnConfigDrawer` 负责列显示、隐藏、排序配置。

AI 新增或迁移列表页时，应先检查以上组件是否满足需求。除非有明确业务例外，不应在页面内重复实现同类结构和样式。

## 文档模板

每个组件文档应至少包含：

- 组件定位
- Pattern 与当前实现名
- 适用场景和不适用场景
- 交互规范
- API 规范
- 事件规范
- 使用示例
- 设计与编码约束
- 迁移建议

## 命名建议

当前项目统一使用 `Ds*` 作为规范组件前缀。若将规范迁移到其他项目，可以保留 Pattern 不变，并替换实现名，例如：

| Pattern | 当前项目实现 | 其他项目可选实现名 |
|---|---|---|
| Semantic Action Button | `DsActionButton` | `UiActionButton`、`AppActionButton`、`ActionButton` |
| Compact Field Controls | `DsCompact*` | `UiCompact*`、`AppCompact*`、`Filter*` |
| Standard Form Field Layout | `DsForm*` / `DsReadonlyField` | `UiForm*`、`AppForm*`、`FieldLayout` |
| Standard Page Shell | `DsPage` | `UiPage`、`AppPage`、`PageShell` |
| Standard Page Header | `DsPageHeader` | `UiPageHeader`、`AppPageHeader`、`PageHeader` |
| Standard Form Collapse | `DsCollapse` | `UiCollapse`、`AppCollapse`、`FormCollapse` |
| Standard Form Tabs | `DsTabs` | `UiTabs`、`AppTabs`、`ContentTabs` |
| Standard Tab Content | `DsTabContent` | `UiTabContent`、`AppTabContent`、`TabPanelContent` |
| Compact Search Panel | `DsSearchPanel` | `UiSearchPanel`、`AppSearchPanel`、`FilterPanel` |
| Standard Table Toolbar | `DsTableToolbar` | `UiTableToolbar`、`AppTableToolbar`、`DataToolbar` |
| Standard Table Surface | `DsTableSurface` | `UiTableSurface`、`AppTableSurface`、`TableSurface` |
| Standard Data Table | `DsDataTable` | `UiDataTable`、`AppDataTable`、`StandardTable` |
| Semantic Status Tag | `DsStatusTag` | `UiStatusTag`、`AppStatusTag`、`StatusBadge` |
| Table Column Configuration Drawer | `DsColumnConfigDrawer` | `UiColumnConfigDrawer`、`AppColumnConfigDrawer`、`TableColumnConfigDrawer` |

跨项目复用时，优先复用交互规则、API 语义和设计约束，不强制复用当前项目的组件前缀。
