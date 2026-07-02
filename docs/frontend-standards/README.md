# 前端设计与 AI 生成约束规范

本目录用于约束项目的页面设计、组件复用、交互方式和 AI 代码生成行为。任何新增页面、修改页面、迁移历史页面、生成公共组件前，都应先阅读本目录。

本规范以 `docs/frontend-standards/00-design-source.md` 为上游视觉映射依据，结合当前项目的 Vue 3、TypeScript、Ant Design Vue、Element Plus 历史组件现状制定。

## 适用范围

- 业务页面：`src/views/**`
- 公共组件：`src/components/**`
- 布局外壳：`src/layouts/**`
- 全局样式：`src/root.scss`、`src/assets/styles/**`
- AI 生成页面、AI 修改页面、AI 审查页面

## 阅读顺序

新成员第一次接触本规范时，先阅读：

1. `USAGE.md`
2. `README.md`
3. `components/README.md`
4. `10-component-inventory.md`
5. `09-review-checklist.md`

新增页面时按以下顺序阅读：

1. `01-design-tokens.md`
2. `02-layout-rules.md`
3. `04-component-rules.md`
4. `05-form-rules.md`
5. `06-coding-rules.md`
6. `07-ai-generation-rules.md`
7. `08-page-templates.md`
8. `components/README.md`
9. `10-component-inventory.md`
10. `09-review-checklist.md`

涉及图表、看板、概览页时，额外阅读：

1. `11-chart-rules.md`

审查页面时重点阅读：

1. `00-design-source.md`
2. `01-design-tokens.md`
3. `02-layout-rules.md`
4. `04-component-rules.md`
5. `05-form-rules.md`
6. `06-coding-rules.md`
7. `09-review-checklist.md`

## 核心原则

1. 优先复用公共组件，不在业务页面重复实现搜索区、工具栏、表格、分页、抽屉等通用结构。
2. 优先使用设计 Token，不在页面中随意写颜色、字号、间距、圆角。
3. 优先使用 Ant Design Vue 作为新业务页面控件库；Element Plus 仅用于历史组件或明确依赖场景。
4. 页面样式只允许处理业务布局和少量局部排版，不允许重写一套控件视觉风格。
5. AI 生成代码必须先读规范、再找公共组件、最后才写业务页面。

## 公共组件推荐归档

当前项目已有公共组件位于 `src/components/`。后续建议逐步归档为：

```text
src/components/
  base/        # 基础控件薄封装
  business/    # 后台业务复合组件
  layout/      # 页面骨架与布局组件
  feedback/    # 加载、空状态、结果反馈
  legacy/      # 历史组件，迁移期间保留
  index.ts     # 统一导出入口
```

迁移完成前，AI 和开发者应优先搜索并复用现有组件：

详细组件盘点见 `10-component-inventory.md`。已沉淀为稳定规范的 `Ds*` 组件见 `components/README.md`。

如果已有组件不能满足需求，应优先扩展公共组件能力，而不是在业务页面复制一套相似实现。
