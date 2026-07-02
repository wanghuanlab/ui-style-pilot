# DsTabs

## 基本信息

| 项 | 内容 |
|---|---|
| Pattern | Standard Form Tabs |
| Implementation | `DsTabs` |
| 类型 | `layout` |
| 状态 | `draft` |
| 当前路径 | `src/components/layout/DsTabs.vue` |

`DsTabs` 用于后台表单页、详情页和业务配置页的主内容页签，统一页签字号、选中态、边框和内容区间距。

## 适用场景

- 项目申请、合同详情、计划填报等多业务分区页面。
- 页面主体需要在多个业务子模块间切换。
- 子页签内容较复杂，页签头和内容区需要稳定边界。

## 不适用场景

- 顶部全局导航。
- 表格行内的小型切换器。
- 只有两个简单状态的切换，优先使用 Segmented 或 Radio。

## 交互规范

- 默认使用线型页签。
- 当前页签使用主色和较高字重。
- 页签区与内容区保持同一白底容器。
- 页签内容由页面通过默认 slot 控制，组件不处理业务懒加载。

## API 规范

| Prop | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `activeKey` | `string` | - | 当前激活页签，支持 `v-model:activeKey` |
| `items` | `{ key: string; label: string; disabled?: boolean }[]` | - | 页签配置 |
| `size` | `small \| middle \| large` | `middle` | 页签尺寸 |
| `type` | `line \| card \| editable-card` | `line` | 页签类型 |
| `tabBarGutter` | `number` | `0` | 页签间距 |
| `tight` | `boolean` | `false` | 是否使用紧凑内容内边距 |

## 事件规范

| 事件 | 参数 | 触发时机 |
|---|---|---|
| `update:activeKey` | `string` | 切换页签时 |
| `change` | `string` | 切换页签时 |

## 使用示例

```vue
<template>
    <DsTabs v-model:active-key="activeTab" :items="tabs">
        <TabSummary v-if="activeTab === 'summary'" />
        <TabBudget v-else-if="activeTab === 'budget'" />
    </DsTabs>
</template>
```

## 设计与编码约束

- 页面不得重复覆盖 `.ant-tabs-tab`、`.ant-tabs-nav` 来实现标准页签视觉。
- 业务页面只维护页签配置和内容切换逻辑。
- 不在组件内部写业务模块名称或接口逻辑。

## 迁移建议

从页面自写 `a-tabs` 迁移时：

1. 将页签 key 和文案整理为 `items`。
2. 将原 `activeTab` 继续作为 `v-model:active-key`。
3. 将页签内容放入默认 slot。
4. 删除页面内重复的 tabs card、tabs header 和 `.ant-tabs-*` 覆盖样式。

