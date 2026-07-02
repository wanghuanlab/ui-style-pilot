# DsColumnConfigDrawer

## 基本信息

| 项 | 内容 |
|---|---|
| Pattern | Table Column Configuration Drawer |
| Implementation | `DsColumnConfigDrawer` |
| 类型 | `business` |
| 状态 | `stable` |
| 当前路径 | `src/components/business/DsColumnConfigDrawer.vue` |
| 默认宽度 | `720` |

`DsColumnConfigDrawer` 用于承载后台列表页、报表页、台账页中的表格列配置能力，让用户可以调整列的显示、隐藏和展示顺序。

## 适用场景

- 表格列数量较多，用户需要按角色、习惯或任务临时调整显示字段。
- 后台列表页、报表页、数据台账页需要列显示配置。
- 页面已经使用或准备迁移到 `DsDataTable`、`DsTableToolbar` 等标准列表页组件。
- 需要保留少量必选字段，同时允许其他字段自由配置。

## 不适用场景

- 表格列很少且固定，不需要用户配置。
- 业务字段权限、数据权限、角色权限配置。这类场景应使用权限配置组件或业务表单。
- 字段选择会影响后端查询、接口字段授权或业务流程含义的复杂配置。
- 需要跨用户持久化配置但页面尚未明确存储方案时，不应把存储逻辑写进本组件。

## 交互规范

- 采用左右穿梭结构：
  - 左侧为“可选字段”。
  - 右侧为“已选字段”。
- 左右两侧均支持搜索。
- 可选字段支持多选后批量添加。
- 已选字段支持多选后批量移除。
- 已选字段支持多选后整体上移、下移。
- `requiredKeys` 对应字段展示“必选”标识。
- 必选字段不允许移除。
- 普通字段上移、下移时不应跨过或挤动必选字段。
- “恢复默认”使用 `defaultKeys`；未提供 `defaultKeys` 时，默认恢复为全部字段。
- “取消”只关闭抽屉，不提交当前未保存配置。
- “保存配置”提交当前已选字段，并关闭抽屉。

## API 规范

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---:|---|---|
| `open` | `boolean` | 是 | - | 抽屉打开状态，支持 `v-model:open` |
| `title` | `string` | 否 | `列配置` | 抽屉标题 |
| `width` | `number` | 否 | `720` | 抽屉宽度 |
| `columns` | `{ key: string; title: string }[]` | 是 | - | 可配置字段源数据 |
| `selectedKeys` | `string[]` | 是 | - | 当前已选字段 key，支持 `v-model:selectedKeys` |
| `defaultKeys` | `string[]` | 否 | 全部字段 | 恢复默认时使用的字段 key |
| `requiredKeys` | `string[]` | 否 | `[]` | 必选字段 key，自动合并进已选字段 |

## 事件规范

| 事件 | 参数 | 触发时机 |
|---|---|---|
| `update:open` | `boolean` | 抽屉打开或关闭时 |
| `update:selectedKeys` | `string[]` | 保存配置或恢复默认时 |
| `save` | `string[]` | 点击“保存配置”时 |
| `reset` | `string[]` | 点击“恢复默认”时 |

## 使用示例

```vue
<template>
    <DsColumnConfigDrawer
        v-model:open="columnConfigOpen"
        v-model:selected-keys="visibleColumnKeys"
        :columns="columnOptions"
        :default-keys="defaultColumnKeys"
        :required-keys="requiredColumnKeys"
        @save="handleColumnConfigSave"
    />
</template>

<script setup lang="ts">
import { ref } from "vue";
import DsColumnConfigDrawer from "@/components/business/DsColumnConfigDrawer.vue";

const columnConfigOpen = ref(false);
const requiredColumnKeys = ["projectName"];
const defaultColumnKeys = ["projectName", "projectCode", "status"];
const visibleColumnKeys = ref([...defaultColumnKeys]);

const columnOptions = [
    { key: "projectName", title: "项目名称" },
    { key: "projectCode", title: "项目编码" },
    { key: "status", title: "状态" },
];

function handleColumnConfigSave(keys: string[]) {
    visibleColumnKeys.value = keys;
}
</script>
```

## 设计与编码约束

- 页面不得重复实现列配置抽屉。
- 新增或迁移列配置能力时，优先使用 `DsColumnConfigDrawer`。
- 不允许在业务页面通过内联 `style` 修改抽屉布局。
- 不允许在业务页面硬编码列配置抽屉的颜色、字号、间距、圆角。
- 组件内部视觉应使用项目 Token，例如 `var(--primary)`、`var(--border-default)`、`var(--text-primary)`。
- 组件不得直接调用接口，不负责用户偏好持久化。持久化由页面或业务服务层处理。
- 组件 API 变更应保持向后兼容。确需破坏性调整时，应先更新本文档和迁移说明。

## 与列表页组件的协作

- 入口通常放在 `DsTableToolbar` 的列设置按钮中。
- 列配置结果用于控制 `DsDataTable` 或页面表格 columns。
- 状态标签、分页、搜索区等能力不应写进本组件。

## 迁移建议

从历史 `ColumnConfigDrawer` 或页面自写列配置迁移时：

1. 先整理页面所有表格列，形成 `{ key, title }[]`。
2. 将固定必选列放入 `requiredKeys`。
3. 将默认显示列放入 `defaultKeys`。
4. 使用 `selectedKeys` 控制实际展示列。
5. 删除页面内重复的列配置抽屉模板、局部样式和穿梭逻辑。
6. 若需要持久化用户配置，在页面 `save` 事件中调用接口或本地存储，不要改造组件内部职责。

## AI 使用要求

AI 新增或迁移列配置能力时，必须先检查本组件是否满足需求。除非明确存在本组件无法覆盖的业务差异，否则不得在页面内重新实现列配置抽屉。
