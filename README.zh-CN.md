# UI Style Pilot

[English](README.md) | **简体中文**

面向一致前端交付的 AI 辅助 UI 规范与样式治理工具包。

UI Style Pilot 是一套入门工具包，帮助使用 AI 生成或修改前端代码的团队，让产出持续对齐统一的 UI 标准、可复用组件、交互规则与审查清单。

## 项目内容

- `docs/frontend-standards/`  
  设计 Token、布局、导航、组件、表单布局、交互、编码、AI 生成、页面模板、审查、组件盘点与图表规则等标准文档。

- `docs/frontend-standards/components/`  
  可复用组件模式文档，涵盖操作按钮、页面骨架、搜索区、表格区、列配置、标签页、折叠面板、状态标签与表单字段布局等。

- `docs/ai-skills/frontend/`  
  项目内 AI Skill 定义：
  - `frontend-page-builder`
  - `frontend-design-review`
  - `frontend-component-reuse`
  - `frontend-style-migration`

- `templates/vue3/`  
  供团队复制到 Vue 项目的模板文件，例如 `src/components/index.ts`。

- Vite + Vue 3 本地预览应用  
  轻量文档浏览页，用于说明工作流并指向文档目录。通过 `npm run dev` 本地启动。

## 快速开始

```bash
npm install
npm run dev
```

然后在浏览器中打开 Vite 输出的本地地址。

如果要接入到自己的产品项目，请阅读 [ADOPTION_GUIDE.zh-CN.md](ADOPTION_GUIDE.zh-CN.md)。

## 在线站点

宣传页会在 `docs/landing.html` 更新后自动部署到 GitHub Pages：

https://wanghuanlab.github.io/ui-style-pilot/

编辑源文件 [`docs/landing.html`](docs/landing.html)。接入使用手册由 [`ADOPTION_GUIDE.zh-CN.md`](ADOPTION_GUIDE.zh-CN.md) 构建，发布于 `/adoption-guide.html`。本地文档浏览请运行 `npm run dev`。

## 推荐使用流程

1. 阅读 `docs/frontend-standards/USAGE.md`。
2. 将规范复制或适配到你的产品仓库。
3. 创建共享 UI 前，先阅读 `docs/frontend-standards/components/README.md`。
4. 添加类似 `templates/vue3/src/components/index.ts` 的公共组件导出入口。
5. 在让 AI 生成 UI 前，要求其先阅读相关规范。
6. 使用 `docs/frontend-standards/09-review-checklist.md` 审查每一次生成结果。

## 为什么需要它

AI 可以快速生成前端页面，但缺少约束时，间距、颜色、组件结构与交互模式往往容易漂移。UI Style Pilot 把团队标准整理成人类与 AI 都能遵循的可执行材料。

## 项目状态

早期入门工具包。初始内容来自真实企业 Vue 项目的实践经验，并重组为可复用的开源结构。

## 许可证

MIT
