# UspPage

## 基本信息

| 项 | 内容 |
|---|---|
| Pattern | Standard Page Shell |
| Implementation | `UspPage` |
| 类型 | `layout` |
| 状态 | `stable` |
| 当前路径 | `src/components/layout/UspPage.vue` |

`UspPage` 是后台页面的标准外壳，负责页面背景、纵向布局、内容滚动区域和页面主体节奏。它通常与 `UspPageHeader`、`UspSearchPanel`、`UspTableToolbar`、`UspDataTable` 组成标准列表页。

## 适用场景

- 后台列表页、台账页、报表页、查询页。
- 需要统一页面背景、页头和主体滚动行为的业务页面。
- 新页面或历史页面迁移到 `Usp*` 组件范式时的页面根容器。

## 不适用场景

- 登录页、大屏页、门户首页等非后台工作台页面。
- 需要全屏画布、地图、图表驾驶舱等特殊布局的页面。
- 只承载弹窗或抽屉内容的局部组件。

## 视觉与布局规范

- 页面背景使用 `var(--primary-bg-light)`。
- 页面采用纵向 flex 布局，页头固定在上方，主体区域自适应剩余高度。
- 主体区域 `.ds-page-body` 使用 `12px` 内边距和 `12px` 纵向间距。
- 主体区域默认内部滚动，避免页面整体横向滚动。
- 内容组件应与页头、筛选区、工具栏、表格边缘对齐。

## API 规范

| Prop | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `scroll` | `boolean` | `false` | 是否允许整个页面容器滚动 |

## 插槽规范

| Slot | 用途 |
|---|---|
| `header` | 页面页头，通常放置 `UspPageHeader` |
| `default` | 页面主体内容 |

## 使用示例

```vue
<template>
    <UspPage>
        <template #header>
            <UspPageHeader title="项目概览" :breadcrumbs="breadcrumbs" />
        </template>

        <UspSearchPanel />
        <UspTableToolbar />
        <UspDataTable />
    </UspPage>
</template>
```

## 设计与编码约束

- 新增后台业务页面优先使用 `UspPage` 作为根容器。
- 页面不得重复定义全局背景、主体滚动和页面级 padding。
- 不在 `UspPage` 内写业务数据、接口请求或路由逻辑。
- 特殊页面确需不同背景或滚动方式时，应先说明业务原因，再通过扩展组件能力处理。

## 与列表页组件的协作

- `UspPageHeader` 放在 `header` 插槽。
- `UspSearchPanel`、`UspTableToolbar`、`UspDataTable` 放在默认插槽，并由页面或组件自身控制标准间距。
- `UspPage` 只负责页面外壳，不负责筛选、工具栏、表格和分页逻辑。

## 迁移建议

从历史页面迁移时：

1. 先保留原页面业务逻辑和接口调用。
2. 用 `UspPage` 替换页面最外层布局容器。
3. 将原页面标题、面包屑、操作迁移到 `UspPageHeader`。
4. 删除页面内重复的背景、滚动、外层 padding 样式。

## AI 使用要求

AI 新增或迁移后台业务页面时，必须优先使用 `UspPage` 承载页面外壳。除非是登录页、大屏页或明确的特殊布局页面，否则不得在业务页面内重复实现页面背景和主体滚动结构。
