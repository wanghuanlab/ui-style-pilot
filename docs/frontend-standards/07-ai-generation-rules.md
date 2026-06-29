# 07 AI 生成规则

本文件用于约束 AI 在本项目中生成或修改前端代码的行为。产品人员、开发人员使用 AI 生成页面时，应把本文件作为提示词上下文。

## AI 工作顺序

AI 在生成页面前必须按顺序执行：

1. 阅读 `docs/frontend-standards/USAGE.md`。
2. 阅读 `docs/frontend-standards/README.md`。
3. 阅读本文件。
4. 根据任务读取相关规范文件。
5. 搜索 `src/components` 中可复用的公共组件。
6. 确认页面类型，选择 `08-page-templates.md` 中的模板。
7. 生成代码。
8. 使用 `09-review-checklist.md` 自查。

需要追溯平台视觉规范来源时，再阅读 `docs/frontend-standards/00-design-source.md`。

## 生成页面时必须遵守

- 优先使用公共组件。
- 优先使用 Ant Design Vue。
- 不写内联 `style`。
- 不写硬编码颜色。
- 不新建独立视觉风格。
- 不在业务页面大面积覆盖 `.ant-*`。
- 不重复实现搜索区、工具栏、表格、分页、状态标签、列配置。
- 不让 1280 宽下关键操作不可见。
- 状态必须使用统一状态标签或统一颜色语义。

## AI 标准提示词模板

新增页面时使用：

```text
请在当前项目中新增/修改页面。开始前必须阅读：
1. docs/frontend-standards/USAGE.md
2. docs/frontend-standards/README.md
3. docs/frontend-standards/07-ai-generation-rules.md
4. docs/frontend-standards/08-page-templates.md
5. docs/frontend-standards/09-review-checklist.md

要求：
- 优先搜索并复用 src/components 中已有公共组件。
- 不允许写内联 style。
- 不允许硬编码颜色、字号、间距。
- 新页面优先使用项目约定的主组件库。
- 页面样式必须符合 docs/frontend-standards。
- 完成后按 09-review-checklist 自查。
```

审查页面时使用：

```text
请审查这个页面是否符合当前项目前端规范。只审查，不改代码。
对照：
1. docs/frontend-standards/USAGE.md
2. docs/frontend-standards/*

请检查：
- 视觉 Token
- 布局和响应式
- 菜单和页面层级
- 公共组件复用
- 交互状态
- 是否有内联 style 和硬编码样式
- 是否重复实现已有组件
```

迁移历史页面时使用：

```text
请把这个历史页面逐步迁移到项目统一规范。先给迁移方案，不直接改代码。
重点检查：
- 搜索区是否可替换为公共组件
- 工具栏是否可统一
- 表格和分页是否可统一
- 状态标签是否可统一
- 内联 style 和硬编码样式如何清理
- 是否需要新增公共组件
```

## AI 输出要求

AI 输出方案时应包含：

- 复用哪些公共组件。
- 是否需要新增公共组件。
- 页面类型和模板。
- 主要交互。
- 风险点。
- 自查结果。

AI 修改代码时应说明：

- 改了哪些文件。
- 为什么这样改。
- 是否触碰公共组件。
- 是否影响其他页面。
- 是否运行检查或截图验证。

## AI 禁止行为

AI 不得：

- 为一个页面单独创造一套按钮、输入框、表格样式。
- 为了快速实现复制粘贴其他页面的大段样式。
- 未搜索公共组件就新增相似组件。
- 在页面中直接写大量 `:deep(.ant-*)`。
- 忽略 `frontend-standards` 中的颜色、字号和间距要求。
- 在用户明确要求“先方案、不执行”时修改代码。
