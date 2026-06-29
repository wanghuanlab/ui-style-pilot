# 06 编码规则

本文件约束 AI 和开发者的前端实现方式。目标是避免每个页面重复定义样式、重复造组件、重复覆盖组件库。

## 禁止项

### 禁止内联样式

禁止：

```vue
<a-input style="width: 140px" />
<div style="margin-top: 12px; color: #999"></div>
```

例外：

- 第三方组件要求的动态定位。
- Canvas、图表、虚拟滚动等必须动态计算的样式。
- 临时原型可用，但进入业务页面前必须清理。

如确需动态样式，应使用计算属性并限制在局部组件内。

### 禁止硬编码视觉值

业务页面禁止随意写：

```css
color: #1677ff;
font-size: 13px;
padding: 17px;
border-radius: 12px;
```

应使用项目 Token、公共 class 或公共组件。

### 禁止大面积覆盖组件库样式

禁止在业务页面中大量写：

```scss
:deep(.ant-table) { ... }
:deep(.ant-btn) { ... }
:deep(.ant-form-item) { ... }
```

如果多个页面都需要该样式，应沉淀到公共组件或全局组件覆盖文件中。

### 禁止重复实现公共组件

如果已有搜索区、工具栏、列配置、分页、状态标签、抽屉表单等能力，不允许在业务页面复制实现。

### 禁止新页面混用组件库

新页面不允许同时使用 Ant Design Vue 和 Element Plus。历史页面迁移期间可保留，但不得扩大混用范围。

## 必须项

### 必须优先搜索公共组件

新增页面或控件前，先搜索：

```bash
rg "Search|Filter|Table|Drawer|Pagination|Status|Tag|Toolbar" src/components
```

能复用则复用，能扩展则扩展，不要直接复制。

### 必须使用语义 class

推荐：

```vue
<div class="purchase-apply-page">
  <section class="purchase-apply-search"></section>
  <section class="purchase-apply-table"></section>
</div>
```

禁止：

```vue
<div class="box1">
<div class="left-blue-card">
```

### 必须控制 scoped 样式职责

业务页面 scoped 样式只处理：

- 页面局部布局。
- 个别业务字段宽度。
- 特定区域排列。

不处理：

- 全局按钮样式。
- 全局输入框样式。
- 全局表格样式。
- 全局菜单样式。

### 必须保持 API 与 UI 分层

页面代码应区分：

- API 请求。
- 数据转换。
- 表格列定义。
- 筛选表单。
- UI 状态。

避免把大量业务逻辑、样式、静态数据混在模板中。

## 命名规则

- 页面 class：`模块-页面-page`
- 搜索区：`模块-页面-search`
- 工具栏：`模块-页面-toolbar`
- 表格区：`模块-页面-table`
- 弹层：`模块-页面-drawer` 或 `模块-页面-modal`

示例：

```text
purchase-apply-overview-page
purchase-apply-overview-search
purchase-apply-overview-toolbar
purchase-apply-overview-table
```

## 提交前自查

提交前至少检查：

- 是否新增内联 style。
- 是否新增硬编码颜色。
- 是否重复实现公共组件。
- 1280 宽下是否可用。
- 表格、搜索区、按钮、状态标签是否符合规范。

