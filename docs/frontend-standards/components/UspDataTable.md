# UspDataTable

## 基本信息

| 项 | 内容 |
|---|---|
| Pattern | Standard Data Table |
| Implementation | `UspDataTable` |
| 类型 | `business` |
| 状态 | `stable` |
| 当前路径 | `src/components/business/UspDataTable.vue` |

`UspDataTable` 用于后台列表页、台账页、报表页中的标准数据表格，统一表头、表体、斑马纹、选择列、空状态、loading 和分页底栏。

## 适用场景

- 后台列表页、台账页、报表页。
- 需要表格选择、横向滚动、分页、空状态、loading 的数据表。
- 与 `UspSearchPanel`、`UspTableToolbar`、`UspColumnConfigDrawer` 组成标准列表页。

## 不适用场景

- 表单内的小型可编辑明细表。
- 复杂树表、透视表、虚拟滚动大数据表。
- 强业务定制的排班表、甘特图、矩阵表。

## 视觉规范

- 表头使用主色 `var(--primary)`。
- 表头文字使用白色，字号 `12px`，字重 `600`。
- 可排序表头 hover 使用 `var(--table-header-hover)`，只做轻微反馈，不大幅压暗。
- 深色表头内部分隔线使用 `var(--table-header-border)`。
- 表体文字使用 `12px`，行高 `18px`。
- 偶数行使用 `var(--table-row-zebra)` 作为斑马纹。
- hover 行使用 `var(--table-row-hover)`。
- 选中行使用 `var(--table-row-selected)`，并且优先级高于 hover。
- 表格边框使用 `var(--border-default)`。
- 分页底栏左侧显示总数，右侧显示分页器。
- 标准表格分页器使用紧凑尺寸，页码按钮高度 `24px`，字号 `12px`。
- 分页区域和表格之间使用顶部边框分隔。

## API 规范

| Prop | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `columns` | `TableColumnType[]` | - | 表格列 |
| `dataSource` | `Record<string, unknown>[]` | - | 表格数据 |
| `rowKey` | `string \| Function` | `id` | 行 key |
| `loading` | `boolean` | `false` | 加载状态 |
| `rowSelection` | `TableProps["rowSelection"]` | `undefined` | 行选择 |
| `scroll` | `TableProps["scroll"]` | `undefined` | 表格滚动 |
| `customRow` | `TableProps["customRow"]` | `undefined` | 自定义行事件 |
| `size` | `small \| middle \| large` | `small` | 表格密度 |
| `bordered` | `boolean` | `false` | 是否显示边框 |
| `emptyText` | `string` | `暂无数据` | 空状态文案 |
| `pagination` | `UspPaginationConfig \| false` | `false` | 外部分页配置 |

## 事件规范

| 事件 | 参数 | 触发时机 |
|---|---|---|
| `change` | Ant Table 原始参数 | 排序、筛选等表格变化 |
| `pageChange` | `page, pageSize` | 页码变化 |
| `pageSizeChange` | `page, pageSize` | 每页条数变化 |

## 插槽规范

| Slot | 用途 |
|---|---|
| `bodyCell` | 自定义单元格内容，例如链接、状态标签、操作按钮 |
| `expandedRowRender` | 展开行内容 |
| `empty` | 自定义空状态 |

## 使用示例

```vue
<template>
    <UspDataTable
        row-key="id"
        :columns="columns"
        :data-source="pagedTableData"
        :loading="loading"
        :pagination="tablePagination"
        :row-selection="{ selectedRowKeys, onChange: handleSelect }"
        :scroll="{ x: 'max-content' }"
        @page-change="handlePageChange"
    >
        <template #bodyCell="{ column, record }">
            <UspStatusTag
                v-if="column.key === 'status'"
                :label="record.status"
                :tone="getStatusTone(record.status)"
            />
        </template>
    </UspDataTable>
</template>
```

## 设计与编码约束

- 页面不得重复覆盖 `.ant-table-thead`、`.ant-table-tbody`、`.ant-pagination` 来实现标准列表视觉。
- 表格列过多时使用 `scroll`，避免页面整体横向滚动。
- 分页由 `UspDataTable` 统一承载，不在页面底部单独实现分页区域。
- 状态展示应通过 `UspStatusTag` 或业务 slot 完成。
- 列配置结果应通过 columns 数据进入本组件，不在本组件内部存储业务配置。
- 业务链接、状态标签、行内操作通过 `bodyCell` slot 扩展，不在组件内部写业务判断。

## 与列表页组件的协作

- 表格上方使用 `UspTableToolbar` 承载主操作、刷新、密度和列配置入口。
- 搜索条件由 `UspSearchPanel` 收集，过滤或查询结果传入 `dataSource`。
- 列显示配置由 `UspColumnConfigDrawer` 管理，结果转换为 `columns`。
- 状态列优先使用 `UspStatusTag`。

## 迁移建议

从页面自写 `a-table`、`el-table` 或历史分页迁移时：

1. 保留原始接口、筛选、排序和分页数据逻辑。
2. 将列定义整理为 Ant Design Vue `TableColumnType[]`。
3. 将分页配置转换为 `UspPaginationConfig`。
4. 将状态列、链接列和操作列迁移到 `bodyCell` slot。
5. 删除页面内重复的表头、斑马纹、hover、分页和空状态样式。

## AI 使用要求

AI 新增或迁移标准列表页时，表格、分页、loading、空状态应优先使用 `UspDataTable`。除非存在明确业务差异，否则不得在页面内重新实现标准表格视觉和分页底栏。
