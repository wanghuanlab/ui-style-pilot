# UspSearchPanel

## 基本信息

| 项 | 内容 |
|---|---|
| Pattern | Compact Search Panel |
| Implementation | `UspSearchPanel` |
| 类型 | `business` |
| 状态 | `stable` |
| 当前路径 | `src/components/business/UspSearchPanel.vue` |

`UspSearchPanel` 用于后台列表页的标准筛选区，承载常用字段、查询、重置和更多筛选入口。它应保持紧凑、稳定、可扫描，避免每个页面重复实现搜索表单。

## 适用场景

- 后台列表页、台账页、报表页的顶部筛选区。
- 字段数量较多，需要常用字段外露、低频字段通过“更多字段”管理。
- 页面已经或准备使用 `UspDataTable`、`UspTableToolbar` 等列表页组件。

## 不适用场景

- 新增、编辑、审批等正式业务表单。
- 复杂条件编排、嵌套条件组、可视化查询构建器。
- 需要大段说明、字段帮助文本或复杂校验提示的表单区域。

## 交互规范

- 常用筛选项外露。
- 低频筛选项进入“更多字段”或由页面通过 actions slot 提供入口。
- 查询按钮使用主按钮。
- 重置按钮恢复筛选条件默认值。
- 查询和重置在 1280 宽下应可见。
- 字段控件使用 28px 紧凑高度。
- 多字段场景优先使用 `maxVisible` 控制首屏字段数量。
- 搜索区与上方页头、下方表格区域保持 `12px/16px` 标准间距，紧凑列表页优先 `12px`。

## 字段控件规范

`UspSearchPanel` 内置字段必须使用 `UspCompactFieldControls`：

- `input` -> `UspCompactInput`
- `select` -> `UspCompactSelect`
- `date` -> `UspCompactDatePicker`
- `dateRange` -> `UspCompactRangePicker`

不得在页面内通过内联样式或局部 `:deep(.ant-*)` 调整搜索控件高度。

## API 规范

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---:|---|---|
| `modelValue` | `Record<string, unknown>` | 是 | - | 搜索表单值 |
| `fields` | `UspSearchField[]` | 是 | - | 搜索字段配置 |
| `maxVisible` | `number` | 否 | `4` | 未展开时最多展示字段数 |
| `defaultExpanded` | `boolean` | 否 | `false` | 默认是否展开全部字段 |

## 事件规范

| 事件 | 参数 | 触发时机 |
|---|---|---|
| `update:modelValue` | `Record<string, unknown>` | 字段值变化时 |
| `search` | - | 点击查询或输入框回车时 |
| `reset` | - | 点击重置时 |

## 插槽规范

| Slot | 用途 |
|---|---|
| `field-{key}` | 自定义某个字段的渲染 |
| `actions` | 追加更多筛选、保存方案等弱操作 |

## 使用示例

```vue
<template>
    <UspSearchPanel
        v-model="searchForm"
        :fields="searchFields"
        :max-visible="4"
        @search="applySearch"
        @reset="resetSearch"
    >
        <template #actions>
            <a-button size="small" type="link">更多字段</a-button>
        </template>
    </UspSearchPanel>
</template>
```

## 设计与编码约束

- 页面不得重复实现标准查询、重置和紧凑筛选控件高度样式。
- 不允许通过内联 `style` 或页面级 `:deep(.ant-*)` 修补搜索字段高度。
- `UspSearchPanel` 内部字段高度固定为 28px，不用于新增、编辑、审批等正式业务表单。
- 自定义字段应通过 `field-{key}` slot 实现，并保持 28px 高度和 12px 字号。
- 更多字段、保存筛选方案等弱操作放入 `actions` slot，不应改变查询和重置按钮位置。

## 与列表页组件的协作

- 放置在 `UspPageHeader` 下方、`UspTableToolbar` 上方。
- 筛选结果通过页面逻辑传给 `UspDataTable`。
- 表格列配置、密度、导出等能力不放在本组件内，应由 `UspTableToolbar` 和 `UspColumnConfigDrawer` 承担。

## 迁移建议

从历史 `AdvancedFilter` 或页面自写搜索表单迁移时：

1. 梳理字段为 `UspSearchField[]`。
2. 常用字段放入前几项，低频字段通过 `maxVisible` 或页面 actions 管理。
3. 删除页面内重复的输入框、下拉框、日期框高度覆盖样式。
4. 保留原查询、重置逻辑，只调整触发入口。

## AI 使用要求

AI 新增或迁移列表页搜索区时，必须先检查 `UspSearchPanel` 是否满足需求。除非存在明确业务差异，否则不得在页面内重新实现搜索表单、查询按钮、重置按钮和字段控件高度样式。
