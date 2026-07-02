# UspStatusTag

## 基本信息

| 项 | 内容 |
|---|---|
| Pattern | Semantic Status Tag |
| Implementation | `UspStatusTag` |
| 类型 | `base` |
| 状态 | `stable` |
| 当前路径 | `src/components/base/UspStatusTag.vue` |

`UspStatusTag` 用于统一展示业务状态、审批状态、启停状态和处理状态，避免各页面自行定义状态颜色和标签样式。

## 适用场景

- 表格状态列。
- 详情页中的状态字段。
- 审批、启停、完成、异常等语义明确的状态展示。
- 与 `UspDataTable` 的 `bodyCell` slot 配合展示状态列。

## 不适用场景

- 可点击筛选标签、标签页或分类选择器。
- 多色业务分类标签。
- 需要复杂图标、进度或说明文本的状态面板。

## 视觉规范

- 标签高度不低于 `22px`。
- 字号使用 `12px`，行高 `20px`。
- 圆角使用 `4px`。
- 左侧使用 6px 圆点辅助识别状态。
- 成功、警示、错误使用项目功能色语义。
- 默认态使用中性色，不使用高饱和颜色。

## 状态语义

| Tone | 用途 |
|---|---|
| `success` | 已审批、已完成、启用、正常、通过 |
| `warning` | 审批中、待处理、待确认、进行中 |
| `processing` | 处理中、流转中，可与 warning 视觉一致 |
| `error` | 已驳回、失败、停用、异常 |
| `default` | 草稿、未开始、未知或无明确状态 |

## API 规范

| Prop | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `label` | `string` | `""` | 展示文案，优先级最高 |
| `status` | `string \| number \| boolean` | `""` | 状态值，未传 `label` 时自动转为文案 |
| `tone` | `success \| warning \| error \| processing \| default` | `undefined` | 状态语义，未传时根据文案自动推断 |

## 使用示例

```vue
<template>
    <UspStatusTag label="已下达" tone="success" />
    <UspStatusTag :status="enabled" />
</template>
```

## 设计与编码约束

- 页面不得自行硬编码状态颜色。
- 状态颜色必须服务语义，不得为了视觉差异随意新增颜色。
- 不要只依赖颜色表达状态，标签文案必须清晰。
- 表格状态列优先使用 `UspStatusTag`。
- 如出现新的稳定状态语义，应先扩展 tone 或状态映射，并同步更新本文档。

## 迁移建议

从历史 `DictTag` 或页面自写状态标签迁移时：

1. 先梳理状态文案和业务语义。
2. 将成功、警示、错误、默认状态映射到 `tone`。
3. 表格列中通过 `UspDataTable` 的 `bodyCell` slot 渲染 `UspStatusTag`。
4. 删除页面内重复的状态色、圆角、背景和边框样式。

## AI 使用要求

AI 新增或迁移状态展示时，必须优先使用 `UspStatusTag`。不得在页面内硬编码成功、警示、错误、处理中等状态标签颜色。
