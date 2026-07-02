# UspCompactFieldControls

## 基本信息

| 项 | 内容 |
|---|---|
| Pattern | Compact Field Controls |
| Implementation | `UspCompactInput`、`UspCompactSelect`、`UspCompactDatePicker`、`UspCompactRangePicker` |
| 类型 | `base` |
| 状态 | `draft` |
| 当前路径 | `src/components/base/` |
| 控件高度 | `28px` |

`UspCompactFieldControls` 是列表筛选区、表格工具区等紧凑场景使用的基础输入控件集合。它只解决紧凑密度下的控件高度、字号、圆角、placeholder 和内部对齐问题，不替代表单编辑页的舒适控件。

## 适用场景

- `UspSearchPanel` 内部字段控件。
- 表格工具栏中的轻量筛选、快速搜索。
- 后台列表页顶部的紧凑筛选区。

## 不适用场景

- 新增、编辑、审批等正式表单页。
- 长表单、复杂校验表单、说明文案较多的字段区域。
- 需要 32px、38px 或更舒适密度的业务输入区域。

## 组件清单

| 组件 | 基础控件 | 用途 |
|---|---|---|
| `UspCompactInput` | `a-input` | 紧凑文本输入 |
| `UspCompactSelect` | `a-select` | 紧凑下拉选择 |
| `UspCompactDatePicker` | `a-date-picker` | 紧凑单日期选择 |
| `UspCompactRangePicker` | `a-range-picker` | 紧凑日期范围选择 |

## 视觉规范

- 外层控件高度统一为 `28px`。
- 内部输入区域高度统一为 `26px`。
- 字号统一为 `12px`。
- 圆角统一为 `4px`。
- placeholder 使用 `var(--text-tertiary)`。
- 文本使用 `var(--text-primary)`。
- 不在业务页面单独覆盖 `.ant-input`、`.ant-select-selector`、`.ant-picker` 的高度。

## API 规范

紧凑控件应尽量贴近 Ant Design Vue 原控件语义，并支持 `value` / `update:value`：

```vue
<UspCompactInput v-model:value="keyword" placeholder="请输入" />
<UspCompactSelect v-model:value="status" :options="statusOptions" placeholder="请选择" />
<UspCompactDatePicker v-model:value="date" value-format="YYYY-MM-DD" />
<UspCompactRangePicker v-model:value="dateRange" value-format="YYYY-MM-DD" />
```

## 与 UspSearchPanel 的关系

`UspSearchPanel` 必须优先使用本组控件实现字段输入，不应在 `UspSearchPanel` 内直接重复编写 Ant Design Vue 控件高度修补样式。

如果后续发现新的筛选字段类型，应优先判断是否属于紧凑场景：

- 属于紧凑场景：补充新的 `UspCompact*` 控件。
- 属于表单编辑场景：不要复用 compact 控件，应另行沉淀表单控件规范。

## AI 使用要求

AI 新增或迁移列表筛选区控件时，必须优先使用 `UspSearchPanel`。如果需要直接使用基础字段控件，应优先使用 `UspCompact*`，不得在业务页面内重复覆盖 Ant Design Vue 控件高度。
