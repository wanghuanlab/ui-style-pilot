# DsTabContent

## 组件定位

`DsTabContent` 用于承载 `DsTabs` 内部的内容区、工具栏和业务表格区域，解决历史页面中 `tab-content`、`tab-toolbar`、搜索框、按钮组间距各自实现的问题。

## Pattern 与实现名

- Pattern: Standard Tab Content
- Implementation: `DsTabContent`
- 类型: `layout`
- 状态: `draft`

## 适用场景

- 主 Tab 或二级 Tab 下方的内容承载区。
- Tab 内包含工具栏、搜索框、按钮组、表格、表单片段的页面。
- 历史页面渐进迁移时，用作兼容壳统一 `tab-toolbar`、`toolbar-left`、`toolbar-right` 等已有类名。

## 不适用场景

- 独立列表页的搜索和表格组合，优先使用 `DsSearchPanel`、`DsTableToolbar`、`DsDataTable`。
- 页面级分区标题和操作区，优先使用 `DsSection`。

## 交互规范

- Tab 内容区不额外制造卡片边框，边界由外层 `DsTabs` 承担。
- 工具栏采用左右分布、自动换行，按钮和搜索控件保持 28px 紧凑高度。
- 内容区内表格、表单、按钮组不得使用内联 `style` 控制宽度、高度、颜色和间距。

## API 规范

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `title` | `string` | `""` | 可选内容区标题 |
| `compact` | `boolean` | `false` | 是否使用紧凑工具栏间距 |

## Slot 规范

| Slot | 说明 |
|---|---|
| `default` | Tab 内容主体 |
| `toolbar` | 可选工具栏内容 |

## 使用示例

```vue
<DsTabs v-model:active-key="activeKey" :items="tabs" tight>
    <DsTabContent compact>
        <template #toolbar>
            <a-space>
                <a-button type="primary" size="small">新建</a-button>
                <a-button size="small">导出</a-button>
            </a-space>
        </template>

        <DsDataTable :columns="columns" :data-source="dataSource" />
    </DsTabContent>
</DsTabs>
```

## 设计与编码约束

- 必须使用 Token，不允许在页面内重新写 Tab 内容区颜色、边框、字号、间距。
- 新页面优先使用 `DsTabContent` 的 `toolbar` slot，不再新增页面级 `.tab-toolbar` 样式。
- 旧页面迁移时，可以先用 `DsTabContent` 包裹历史内容，让兼容样式接管工具栏视觉，再逐步替换内部表格和控件。

## 迁移建议

历史结构：

```vue
<div class="tab-content">
    <div class="tab-toolbar">...</div>
    <a-table />
</div>
```

建议迁移为：

```vue
<DsTabContent compact>
    <template #toolbar>...</template>
    <DsDataTable />
</DsTabContent>
```

迁移初期也可以先保留历史结构并包裹在 `DsTabContent` 中，但后续应逐步移除页面内自写的 `tab-content`、`tab-toolbar` 样式。
