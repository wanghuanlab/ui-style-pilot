# UspPageHeader

## 基本信息

| 项 | 内容 |
|---|---|
| Pattern | Standard Page Header |
| Implementation | `UspPageHeader` |
| 类型 | `layout` |
| 状态 | `stable` |
| 当前路径 | `src/components/layout/UspPageHeader.vue` |

`UspPageHeader` 用于承载后台页面的面包屑、页面标题、标题补充信息和页面级操作，是 `UspPage` 的标准 `header` 内容。

## 适用场景

- 后台业务页面的顶部标题区。
- 需要展示面包屑、页面标题和右侧页面级操作的页面。
- 标准列表页、详情页、配置页的页面头部。

## 不适用场景

- 全局顶部导航栏。
- 表格工具栏或区块标题栏。
- 弹窗、抽屉内部标题。

## 视觉规范

- 背景使用 `var(--primary-bg-light)`。
- 内边距使用 `12px`。
- 页面标题使用 `18px`、字重 `600`、行高 `27px`、颜色 `var(--text-primary)`。
- 面包屑使用 `12px`，颜色 `var(--text-tertiary)`。
- 面包屑到页面标题间距为 `8px`。
- 标题补充信息和标题之间间距为 `8px`。
- 右侧 actions 使用 `inline-flex`，组件间距为 `8px`，按钮优先使用 28px 紧凑尺寸。

## API 规范

| Prop | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `title` | `string` | - | 页面标题 |
| `description` | `string` | `""` | 页面说明文字 |
| `breadcrumbs` | `{ title: string; to?: string }[]` | `[]` | 面包屑配置 |

## 插槽规范

| Slot | 用途 |
|---|---|
| `title-extra` | 标题右侧补充内容，例如状态、标签、版本 |
| `actions` | 右侧页面级操作 |

## 使用示例

```vue
<template>
    <UspPageHeader
        title="项目概览"
        :breadcrumbs="[
            { title: '首页' },
            { title: '项目计划与预算管理' },
            { title: '项目概览' },
        ]"
    >
        <template #actions>
            <a-button type="primary" size="small">搜索</a-button>
        </template>
    </UspPageHeader>
</template>
```

## 设计与编码约束

- 页面标题不得在页面主体内重复实现。
- 面包屑应准确反映页面层级，不要堆叠过多无效层级。
- 页面级主操作放入 `actions`，表格级操作放入 `UspTableToolbar`。
- 不在业务页面通过局部样式覆盖标题字号、面包屑颜色、页头背景。
- 不把筛选区、表格工具栏或统计卡片放进 `UspPageHeader`。

## 迁移建议

从历史页面迁移时：

1. 将原页面面包屑和标题合并到 `UspPageHeader`。
2. 将页面级按钮迁移到 `actions` 插槽。
3. 删除页面内重复的标题、面包屑和页头背景样式。
4. 表格相关操作迁移到 `UspTableToolbar`，不要放在页头里。

## AI 使用要求

AI 新增或迁移后台页面时，必须优先使用 `UspPageHeader` 表达页面标题和面包屑。不得在页面内重复写标题区域样式，除非该页面属于大屏、登录页或特殊视觉页面。
