# DsCollapse

## 基本信息

| 项 | 内容 |
|---|---|
| Pattern | Standard Form Collapse |
| Implementation | `DsCollapse` |
| 类型 | `layout` |
| 状态 | `draft` |
| 当前路径 | `src/components/layout/DsCollapse.vue` |

`DsCollapse` 用于表单页和详情页的可折叠业务分区，统一折叠标题、边框、白底容器和内容内边距。

## 适用场景

- 表单页的“基本信息”“项目信息”“审批信息”等分区。
- 详情页中需要展开/收起的长内容。
- 同一页面有多个可折叠业务块。

## 不适用场景

- 简单静态分区，优先使用 `DsSection`。
- 手风琴式导航菜单。
- 表格行展开内容。

## 交互规范

- 默认使用 `ghost` + 无外层 Ant 边框，由 `DsCollapse` 自身承载容器边框。
- 标题使用 14px、600 字重。
- 内容区使用 12px 内边距。
- 支持多面板同时展开；如需单面板展开，可设置 `accordion`。

## API 规范

| Prop | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `activeKey` | `string \| number \| Array<string \| number>` | - | 当前展开项，支持 `v-model:activeKey` |
| `bordered` | `boolean` | `false` | 是否使用 Ant Collapse 内置边框 |
| `ghost` | `boolean` | `true` | 是否使用 ghost 模式 |
| `accordion` | `boolean` | `false` | 是否手风琴模式 |

## 事件规范

| 事件 | 参数 | 触发时机 |
|---|---|---|
| `update:activeKey` | `activeKey` | 展开项变化时 |
| `change` | `activeKey` | 展开项变化时 |

## 使用示例

```vue
<template>
    <DsCollapse v-model:active-key="activeKeys">
        <a-collapse-panel key="basic" header="基本信息">
            <BasicForm />
        </a-collapse-panel>
    </DsCollapse>
</template>
```

## 设计与编码约束

- 页面不得重复覆盖 `.ant-collapse-header`、`.ant-collapse-content-box` 来实现标准折叠分区视觉。
- 业务页面只负责面板内容，不负责折叠容器视觉。
- 多个折叠分区应保持统一标题层级和内容间距。

## 迁移建议

从页面自写 `a-collapse` 迁移时：

1. 用 `DsCollapse` 包裹原 `a-collapse-panel`。
2. 保留原 `activeKey` 状态。
3. 删除页面内 `custom-collapse` 样式。
4. 如果只是静态分区，改用 `DsSection`。

