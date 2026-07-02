# DsTableToolbar

## 基本信息

| 项 | 内容 |
|---|---|
| Pattern | Standard Table Toolbar |
| Implementation | `DsTableToolbar` |
| 类型 | `business` |
| 状态 | `stable` |
| 当前路径 | `src/components/business/DsTableToolbar.vue` |

`DsTableToolbar` 用于承载标准列表页表格上方的标题、主操作、批量操作和表格工具能力，例如刷新、密度切换和列配置。

## 适用场景

- 标准列表页、台账页、报表页的表格工具栏。
- 需要表格标题、已选数量、行级批量操作、刷新、密度切换、列配置的场景。
- 与 `DsSearchPanel`、`DsDataTable`、`DsColumnConfigDrawer` 组成标准列表页。

## 不适用场景

- 页面级操作区。页面级操作应放入 `DsPageHeader`。
- 表单底部提交按钮区。
- 弹窗或抽屉内部操作栏。

## 视觉与交互规范

- 工具栏背景使用 `var(--bg-container)`。
- 外框使用 `var(--border-default)`，圆角为上方 `4px`。
- 高度不低于 `44px`，内边距 `8px 12px`。
- 左侧标题使用 `14px`、字重 `600`、行高 `22px`。
- 已选数量使用 `12px`、颜色 `var(--text-secondary)`。
- 工具栏内按钮统一为 `28px` 高度，字号 `12px`。
- 图标工具按钮使用圆形 28px 小按钮，并通过 tooltip 解释含义。
- 左侧主操作、右侧工具操作必须垂直居中对齐。

## API 规范

| Prop | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `title` | `string` | `""` | 表格标题 |
| `selectedCount` | `number` | `0` | 当前选中行数 |
| `showRefresh` | `boolean` | `true` | 是否显示刷新按钮 |
| `showColumnConfig` | `boolean` | `true` | 是否显示列配置按钮 |
| `showDensity` | `boolean` | `true` | 是否显示密度切换 |
| `density` | `"small" \| "middle" \| "large"` | `"small"` | 当前表格密度 |

## 事件规范

| 事件 | 参数 | 触发时机 |
|---|---|---|
| `refresh` | - | 点击刷新按钮 |
| `columnConfig` | - | 点击列配置按钮 |
| `update:density` | `small \| middle \| large` | 切换表格密度 |

## 插槽规范

| Slot | 用途 |
|---|---|
| `primary` | 表格主操作，例如查看详情、新建、批量处理 |
| `actions` | 其他表格操作 |
| `tools` | 右侧自定义工具，例如导出 |

## 使用示例

```vue
<template>
    <DsTableToolbar
        title="项目列表"
        :selected-count="selectedKeys.length"
        :density="tableSize"
        @refresh="fetchTableData"
        @column-config="columnConfigOpen = true"
        @update:density="tableSize = $event"
    >
        <template #primary>
            <a-button size="small" :disabled="selectedKeys.length !== 1">查看详情</a-button>
        </template>
        <template #tools>
            <a-button size="small">导出</a-button>
        </template>
    </DsTableToolbar>
</template>
```

## 设计与编码约束

- 页面不得重复实现刷新、密度切换、列配置图标按钮组。
- 表格级操作放在 `DsTableToolbar`，页面级操作放在 `DsPageHeader`。
- 列配置入口应触发 `DsColumnConfigDrawer`，不要在页面内重复实现列配置抽屉。
- 工具栏内不得写内联样式修补按钮高度或对齐。
- 如果某个页面不需要刷新、密度或列配置，应通过 props 关闭，不删除组件结构。

## 迁移建议

从历史 `RightToolbar` 或页面自写工具栏迁移时：

1. 将表格标题和已选数量放入 `title`、`selectedCount`。
2. 将表格主操作放入 `primary` 插槽。
3. 将导出、导入等弱工具放入 `tools` 插槽。
4. 使用 `refresh`、`columnConfig`、`update:density` 事件连接页面逻辑。
5. 删除页面内重复的工具栏布局和图标按钮样式。

## AI 使用要求

AI 新增或迁移标准列表页时，必须优先使用 `DsTableToolbar` 承载表格工具栏。不得在页面内重复实现刷新、密度切换、列配置按钮组和工具栏对齐样式。
