# 04 公共组件规则

新增业务页面必须优先复用公共组件。只有当公共组件不存在或能力确实不足时，才允许新增公共组件或在业务页面写局部结构。

## 组件目录

推荐长期结构：

```text
src/components/
  base/
  business/
  layout/
  feedback/
  legacy/
  index.ts
```

## 组件规范资产

公共组件代码和组件规范资产必须分开管理：

- 组件代码放在 `src/components/**`。
- 组件规范文档放在 `docs/frontend-standards/components/`。
- 每个进入复用推荐列表的 `Ds*` 组件，都应有对应组件规范文档。
- 新增、扩展或迁移 `Ds*` 组件前，应先查阅 `docs/frontend-standards/components/README.md` 和目标组件文档。
- 组件规范文档负责描述 Pattern、适用场景、交互规则、API、事件、设计约束和迁移建议。

组件成熟度使用统一状态：

| 状态 | 含义 |
|---|---|
| `draft` | 初版可用，API 或交互仍可能调整 |
| `stable` | 推荐复用，API 尽量保持兼容 |
| `deprecated` | 不推荐新页面使用，仅维护兼容 |
| `legacy` | 历史组件或迁移期保留组件 |

## 新组件范式

从本阶段开始，新抽象的规范组件统一使用 `Ds*` 命名，并按职责放入长期目录结构。历史组件暂时不移动、不改名、不强制重构，避免影响已有页面。

```text
src/components/
  base/
    DsActionButton.vue
    DsButton.vue
    DsCompactInput.vue
    DsCompactSelect.vue
    DsCompactDatePicker.vue
    DsCompactRangePicker.vue
    DsIconButton.vue
    DsStatusTag.vue
    DsEmptyState.vue
  business/
    DsSearchPanel.vue
    DsTableToolbar.vue
    DsDataTable.vue
    DsColumnConfigDrawer.vue
    DsFormActions.vue
    DsFormDrawer.vue
    DsFormGrid.vue
    DsFormItem.vue
    DsFormSection.vue
    DsReadonlyField.vue
  layout/
    DsPage.vue
    DsPageHeader.vue
    DsSection.vue
  feedback/
    DsLoadingState.vue
    DsResultState.vue
  legacy/
    README.md
  index.ts
```

落地规则：

- 新公共组件默认使用 `Ds*` 前缀，和历史组件形成清晰边界。
- `base/` 放低业务语义的基础展示和操作组件。
- `business/` 放搜索区、表格工具栏、数据表格、列配置、业务抽屉等后台系统高频组合组件。
- `layout/` 放页面壳、页头、分区容器。
- `feedback/` 放加载、结果、空状态、错误状态等反馈组件。
- `legacy/` 只承接历史组件说明或后续迁移归档，不主动把旧组件搬进去。
- `src/components/index.ts` 同时导出历史组件和新 `Ds*` 组件，给新页面提供稳定入口。

抽象优先级：

1. 优先抽象“后台列表页骨架”相关组件，因为它们最容易在多个页面重复。
2. 优先封装搜索区、工具栏、表格、列配置、状态标签、抽屉、空状态等业务组合能力。
3. 紧凑筛选控件使用 `DsCompactInput`、`DsCompactSelect`、`DsCompactDatePicker`、`DsCompactRangePicker`。这些组件只用于列表筛选、表格工具区等 28px 紧凑场景。
4. 暂不优先封装泛用 `DsInput`、`DsSelect`、`DsDatePicker` 等基础表单控件，除非已经出现明确、重复、稳定的跨页面差异需求。新组件内部可直接使用 Ant Design Vue 控件。
5. 老页面通过 `frontend-style-migration` 逐步迁移到新范式，不要求一次性替换。

迁移前应优先检查当前已有组件：

| 组件 | 用途 |
|---|---|
| `PageScaffold.vue` | 页面骨架 |
| `SystemPageLayout.vue` | 系统页面布局 |
| `AdvancedFilter.vue` | 高级筛选 |
| `ColumnConfigDrawer.vue` | 列配置抽屉 |
| `ColumnConfigTransfer.vue` | 列配置穿梭框 |
| `Pagination/index.vue` | 分页 |
| `Breadcrumb/index.vue` | 面包屑 |
| `DictTag/index.vue` | 字典/状态标签 |
| `RightToolbar/index.vue` | 表格右侧工具 |
| `TreePanel/index.vue` | 左树面板 |

## 控件库选择

- 新业务页面优先使用 `ant-design-vue`。
- `element-plus` 仅用于历史组件、富文本、上传等已有依赖场景。
- 不允许同一个新业务页面混用 `ant-design-vue` 和 `element-plus`。
- 如果必须混用，应在代码注释中说明原因，并限制在局部组件内。

## 按钮

标准动作按钮必须优先使用 `DsActionButton`。AI 和开发者新增或迁移以下动作时，不应在页面内重复手写 `a-button` 的图标、类型和文案：

| 动作 | 组件写法 |
|---|---|
| 新建 | `<DsActionButton action="add" />` |
| 编辑 | `<DsActionButton action="edit" />` |
| 删除 | `<DsActionButton action="delete" />` |
| 复制 | `<DsActionButton action="copy" />` |
| 导入 | `<DsActionButton action="import" />` |
| 导出 | `<DsActionButton action="export" />` |
| 列配置 | `<DsActionButton action="column-config" />` |
| 查询 | `<DsActionButton action="search" />` |
| 重置 | `<DsActionButton action="reset" />` |
| 保存 | `<DsActionButton action="save" />` |
| 取消 | `<DsActionButton action="cancel" />` |

按钮层级：

1. 主按钮：页面最关键动作，每个区域原则上最多一个。
2. 默认按钮：普通操作。
3. 文本按钮：弱操作、行内操作。
4. 危险按钮：删除、撤回、驳回等不可逆操作。
5. 图标按钮：列配置、刷新、密度、全屏等工具能力。

规则：

- 文案使用“动词 + 名词”，如“新建项目”“导出报表”。
- 查询、保存、提交等主动作使用主按钮。
- 未选择表格行时，依赖选中行的按钮应禁用或给出明确提示。
- 工具栏中的次要工具优先使用图标按钮或弱按钮。
- 同一标准动作在不同页面不得随意更换图标、颜色、尺寸或是否显示图标。
- 页面头部、搜索区、表格工具栏、Tab 工具栏中标准动作按钮高度统一为 28px。

## 表单与筛选

标准筛选区应使用公共筛选组件或模板：

- 字段高度 28px。
- 筛选标签使用 12px/14px。
- 常用筛选项外露，低频筛选项进入“更多字段”。
- 查询和重置按钮必须在 1280 宽下可见。
- 错误信息紧贴字段下方，不只用颜色表达。

表单与属性区应优先使用 `DsFormSection`、`DsFormGrid`、`DsFormItem`、`DsReadonlyField`、`DsFormActions`。凡是出现“属性名 + 属性值”的结构，不允许页面手写冒号、label 宽度和字段间距。

编辑态字段规则：

- 使用 `DsFormItem` 承载 label、冒号、必填星号、帮助信息和错误信息。
- 使用 `DsFormGrid` 控制 1-4 列布局和统一 label 宽度。
- 使用 `DsFormSection` 承载业务分组。
- 表单操作区使用 `DsFormActions`，按钮优先使用 `DsActionButton`。
- 28px 紧凑字段优先使用 `DsCompactInput`、`DsCompactSelect`、`DsCompactDatePicker`、`DsCompactRangePicker`。

只读属性规则：

- 使用 `DsReadonlyField` 展示属性名和值。
- 空值使用统一占位 `-`。
- 冒号由组件生成，页面不得写 `字段名：`。

禁止事项：

- 不允许用 `div + span` 手写属性展示。
- 不允许用内联 `style` 修补 label 宽度、字段间距、控件高度。
- 不允许在页面里通过 `:deep(.ant-form-item)`、`:deep(.ant-input)` 重写表单基础视觉。
- 不允许直接堆 `a-row/a-col + a-form-item` 形成新的表单范式。

列表筛选字段控件规则：

- `DsSearchPanel` 内置字段必须使用 `DsCompact*` 控件。
- 业务页面不得通过内联 `style` 或局部 `:deep(.ant-input/.ant-select/.ant-picker)` 修补筛选控件高度。
- `DsCompact*` 不用于新增、编辑、审批等正式表单页。

## 标准列表页组件组合

列表页、台账页、报表页优先使用以下组件组合：

| 页面区域 | 优先组件 | 规范文档 |
|---|---|---|
| 页面外壳 | `DsPage` | `components/DsPage.md` |
| 页头 | `DsPageHeader` | `components/DsPageHeader.md` |
| 搜索区 | `DsSearchPanel` | `components/DsSearchPanel.md` |
| 表格工具栏 | `DsTableToolbar` | `components/DsTableToolbar.md` |
| 数据表格 | `DsDataTable` | `components/DsDataTable.md` |
| 状态标签 | `DsStatusTag` | `components/DsStatusTag.md` |
| 列配置 | `DsColumnConfigDrawer` | `components/DsColumnConfigDrawer.md` |

AI 和开发者迁移历史页面时，应按以上顺序逐步替换页面外壳、页头、搜索区、工具栏、表格、状态标签和列配置，不应在页面内重复实现这些公共组件已经承载的视觉与交互。

## 表格

表格规则：

- 表头 12px，字重 600，主色蓝底，白色文字。
- 表格正文 12px 或 14px，按页面密度统一。
- 标准列表页使用分层交互色：斑马纹 `var(--table-row-zebra)`、hover `var(--table-row-hover)`、选中 `var(--table-row-selected)`。
- 表头 hover 不使用大幅压暗效果；可排序表头 hover 使用 `var(--table-header-hover)` 做轻微反馈。
- 重要状态使用 `DictTag` 或统一状态标签组件。
- 新页面和迁移页面优先使用 `DsDataTable` 承载表格、分页、loading 和空状态。
- 列配置使用公共列配置组件；新页面和迁移页面优先使用 `DsColumnConfigDrawer`。
- 标准表格分页使用公共封装的紧凑尺寸，页码按钮高度 `24px`，字号 `12px`。
- 表格行内操作不超过 3 个；更多操作使用下拉菜单。

列配置规则：

- 新增或迁移列显示、隐藏、排序配置时，必须优先使用 `DsColumnConfigDrawer`。
- 不允许在页面内重复实现列配置抽屉、列穿梭框或列排序逻辑。
- 如 `DsColumnConfigDrawer` 无法满足业务差异，应优先扩展组件，并同步更新 `docs/frontend-standards/components/DsColumnConfigDrawer.md`。
- `DsColumnConfigDrawer` 当前状态为 `stable`，详细规范见 `components/DsColumnConfigDrawer.md`。

## 状态标签

状态色必须语义化：

| 状态 | 颜色 |
|---|---|
| 已审批、已完成、启用、正常 | 成功色 |
| 审批中、待处理、待确认 | 警示色 |
| 已驳回、失败、停用、异常 | 错误色 |
| 草稿、未开始、未知 | 中性色 |

禁止每个页面自行定义状态颜色。

## 弹窗与抽屉

选择规则：

- 简单确认：Popconfirm。
- 中断式确认：Modal。
- 新增/编辑表单：Drawer 优先。
- 复杂详情：Drawer 或独立详情页。
- 长表单：独立页面优先，避免超长弹窗。

抽屉宽度：

| 类型 | 宽度 |
|---|---:|
| 简单表单 | 480px |
| 常规编辑 | 640px |
| 复杂详情 | 800px |
| 多区块详情 | 900px |

同一业务域内抽屉方向和尺寸应保持一致。
