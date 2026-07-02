# DsTableSurface

## 组件定位

`DsTableSurface` 是表格视觉迁移期组件，用于包裹历史 `a-table`，统一表头、行 hover、选中态、边框和分页视觉。

## Pattern 与实现名

- Pattern: Standard Table Surface
- Implementation: `DsTableSurface`
- 类型: `business`
- 状态: `draft`

## 适用场景

- Tab、Collapse、复杂表单页内已有大量 `a-table`，短期不适合一次性改为 `DsDataTable`。
- 表格含有自定义 `bodyCell`、可编辑单元格、合计行、双表结构、列宽拖拽等复杂能力。
- 渐进迁移阶段，需要先统一视觉，再逐步抽象业务表格能力。

## 不适用场景

- 新建标准列表页应优先使用 `DsDataTable`。
- 简单表格且无复杂 slot、无历史兼容负担时，应直接迁移到 `DsDataTable`。

## 使用示例

```vue
<DsTableSurface>
    <a-table
        row-key="id"
        size="small"
        :columns="columns"
        :data-source="dataSource"
        :pagination="pagination"
        bordered
    />
</DsTableSurface>
```

## 设计与编码约束

- `DsTableSurface` 内部表格表头必须使用 `var(--primary)`，表头文字使用 `var(--bg-container)`。
- 表格 hover、选中、斑马纹必须使用 `--table-row-hover`、`--table-row-selected`、`--table-row-zebra`。
- 页面内不得再新增表格表头颜色、hover 颜色、分页尺寸相关的硬编码样式。
- 迁移后如仍有历史样式覆盖，应删除页面内重复的 `:deep(.ant-table...)` 样式，而不是继续提高页面样式优先级。

## 迁移建议

第一阶段：

```vue
<DsTableSurface>
    <a-table ... />
</DsTableSurface>
```

第二阶段：

```vue
<DsDataTable ... />
```

`DsTableSurface` 是兼容过渡层，不应成为新页面首选表格方案。
