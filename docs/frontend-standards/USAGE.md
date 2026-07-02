# 前端规范使用手册

本手册面向新加入项目的成员，帮助你在开发页面、使用 AI 生成代码、审查页面时，按同一套规范实现系统样式统一。

如果你只记住一件事：**先看规范，再找组件，最后写页面。**

## 1. 你需要知道的目录

| 目录或文件 | 用途 |
|---|---|
| `docs/frontend-standards/00-design-source.md` | 平台视觉规范到后台系统的映射，是上游设计依据 |
| `docs/frontend-standards/` | 前端视觉、布局、组件、交互、编码、AI 生成约束 |
| `docs/frontend-standards/components/` | `Ds*` 组件规范资产，记录组件 Pattern、API、交互和迁移建议 |
| `src/root.scss` | 当前项目的全局 CSS Token 和基础样式 |
| `src/components/index.ts` | 公共组件统一导出入口 |
| `src/components/` | 项目已有公共组件 |
| `src/components/base|business|layout|feedback` | 新 `Ds*` 规范组件目录 |
| `src/views/` | 业务页面 |
| `src/layouts/` | 系统布局外壳 |

## 2. 第一次加入项目时怎么读

建议按这个顺序读，不需要一次背完：

1. `README.md`：了解规范目标和阅读顺序。
2. `01-design-tokens.md`：记住颜色、字号、间距、圆角的基本范围。
3. `04-component-rules.md`：知道哪些组件和控件不能重复造。
4. `05-form-rules.md`：知道表单、属性名和值、冒号和字段间距怎么统一。
5. `06-coding-rules.md`：知道哪些写法禁止。
6. `components/README.md`：知道哪些 `Ds*` 组件已有稳定规范。
7. `10-component-inventory.md`：知道现在已有组件能做什么。
8. `08-page-templates.md`：开发页面时按模板套结构。
9. `09-review-checklist.md`：提交前按清单自查。

## 3. 新增页面的标准流程

新增页面不要直接打开 `.vue` 开写。先走下面流程：

```text
确认页面类型
  -> 阅读对应模板
  -> 搜索公共组件
  -> 确认接口和数据结构
  -> 组合页面结构
  -> 只写必要的页面局部样式
  -> 1280 和 1920 视口检查
  -> 按审查清单自查
```

### 3.1 判断页面类型

先从 `08-page-templates.md` 中选择一种：

| 页面类型 | 常见场景 |
|---|---|
| 列表页 | 采购申请、合同列表、项目列表 |
| 表单页 | 新增、编辑、提交申请 |
| 详情页 | 查看项目、合同、采购详情 |
| 抽屉编辑 | 列表中的快速新增、编辑、查看 |
| 左树右表页 | 部门、组织、分类、菜单权限 |
| 概览页 | 工作台、项目概览、报表概览 |
| 空状态页 | 无数据、无权限、未配置 |

### 3.2 先搜索公共组件

写页面前先查：

```bash
find src/components -maxdepth 3 -type f \( -name "*.vue" -o -name "*.tsx" -o -name "*.ts" \) | sort
rg -n "Search|Filter|Toolbar|Table|Drawer|Modal|Pagination|Status|Tag|Scaffold|Layout|Tree|ColumnConfig" src/components
```

新页面优先从统一入口导入：

```ts
import { DsPage, DsSearchPanel, DsDataTable, DsColumnConfigDrawer } from "@/components";
```

历史页面已有的组件可以逐步迁移，不需要一次性替换：

```ts
import { PageScaffold, ColumnConfigDrawer, DictTag } from "@/components";
```

如果已有组件能满足 80% 需求，优先复用或扩展，不要在页面里重新写一套相似结构。

如果已有组件不能满足需求，先判断是否应抽象为 `Ds*` 公共组件。标准列表页优先沉淀页面壳、搜索区、工具栏、表格、列配置、状态标签、表单抽屉和空状态，不要急着封装 `Input`、`Select` 这类 Ant Design Vue 已经提供的基础控件。

如果要使用或修改已经文档化的 `Ds*` 组件，必须先阅读 `docs/frontend-standards/components/` 下的对应组件规范。例如列配置先读 `components/DsColumnConfigDrawer.md`。

遇到表单、详情属性区、审批查看区时，优先阅读 `05-form-rules.md` 和 `components/DsFormLayout.md`，并使用 `DsFormSection`、`DsFormGrid`、`DsFormItem`、`DsReadonlyField`、`DsFormActions`，不要在页面里手写字段冒号和间距。

### 3.3 推荐页面骨架

列表页优先按这个结构组织：

```text
PageScaffold
  面包屑
  页面标题
  搜索区
  工具栏
  表格
  分页
```

详情页优先按这个结构组织：

```text
PageScaffold
  面包屑
  页面标题 + 操作
  基础信息
  业务分区
  关联表格
```

表单页优先按这个结构组织：

```text
PageScaffold
  面包屑
  页面标题
  表单分区
  底部操作
```

## 4. 修改已有页面的标准流程

修改已有页面时，不要求一次性重构全部样式。优先控制改动范围：

1. 只改本次需求相关区域。
2. 如果遇到内联 `style`、硬编码颜色、重复组件，顺手小范围清理。
3. 如果清理会影响很多区域，先记录为迁移事项，不混进本次业务需求。
4. 不移动公共组件目录，除非任务明确要求。
5. 不替换组件库，除非已经确认风险和范围。

历史页面迁移按 `frontend-style-migration` 的思路分阶段做：

```text
搜索区 -> 工具栏 -> 表格/分页 -> 状态标签 -> 弹窗/抽屉 -> 样式清理
```

## 5. 使用 AI 生成代码时怎么说

不要只说“帮我做一个页面”。建议直接复制下面模板。

### 5.1 新增或修改页面

```text
请在目标项目中新增/修改页面。开始前必须阅读：
1. docs/frontend-standards/USAGE.md
2. docs/frontend-standards/README.md
3. docs/frontend-standards/07-ai-generation-rules.md
4. docs/frontend-standards/08-page-templates.md
5. docs/frontend-standards/components/README.md
6. docs/frontend-standards/10-component-inventory.md
7. docs/frontend-standards/09-review-checklist.md

要求：
- 先判断页面类型。
- 先搜索并复用 src/components 中已有公共组件。
- 如涉及已文档化组件，先阅读 docs/frontend-standards/components/ 下的对应组件规范。
- 从 @/components 导入公共组件。
- 不允许写内联 style。
- 不允许硬编码颜色、字号、间距、圆角。
- 新页面优先使用 ant-design-vue。
- 完成后按 09-review-checklist 自查。
```

### 5.2 只做方案，不改代码

```text
先不要改代码。请根据 docs/frontend-standards 设计实现方案：
- 页面类型是什么。
- 应复用哪些公共组件。
- 是否需要新增公共组件。
- 交互流程是什么。
- 有哪些样式风险。
- 如何按阶段落地。
```

### 5.3 审查页面是否符合规范

```text
请审查这个页面是否符合本项目前端规范。只审查，不改代码。
对照：
1. docs/frontend-standards/USAGE.md
2. docs/frontend-standards/*

请检查：
- 视觉 Token
- 布局和响应式
- 导航和面包屑
- 公共组件复用
- 交互状态
- 编码规则
- 是否有内联 style 和硬编码样式
- 是否重复实现已有组件
```

## 6. 开发时必须遵守的红线

下面这些通常会导致系统样式越来越散，默认禁止：

- 在模板里写 `style="..."`。
- 在页面里随意写 `#1677ff`、`#999`、`13px`、`17px`、`12px` 大圆角等非规范值。
- 一个新页面同时使用 Ant Design Vue 和 Element Plus。
- 每个页面自己写一套搜索区、工具栏、表格、分页、状态标签。
- 在业务页面大量覆盖 `.ant-*` 或 `.el-*`。
- 为一个页面创造独立的按钮、输入框、表格视觉风格。
- 未选中表格行时，仍让“查看详情”“删除”等按钮看起来可直接操作。
- 1280 宽下查询、重置、主操作按钮不可见。

## 7. 常见场景怎么做

### 7.1 做列表页

优先使用：

- `DsPage`
- `DsPageHeader`
- `DsSearchPanel`
- `DsTableToolbar`
- `DsDataTable`
- `DsStatusTag`
- `DsColumnConfigDrawer`

历史页面如果暂时无法迁移，可以保留：

- `PageScaffold`
- `ColumnConfigDrawer` 或 `ColumnConfigTransfer`
- `DictTag`
- `Pagination` 或 Ant Design Vue 统一分页

检查点：

- 搜索区不要超过两行；更多字段折叠。
- 查询按钮是主按钮。
- 工具栏主次操作分明。
- 状态列使用统一状态色。
- 表格列多时使用表格内部滚动，不裁切主操作。

### 7.2 做详情页

检查点：

- 页面标题清楚。
- 基础信息优先展示。
- 字段按业务分区。
- 金额、日期、状态格式统一。
- 关联列表复用标准表格。

### 7.3 做表单页

检查点：

- 表单字段按业务分区。
- 必填、错误、禁用状态清楚。
- 保存或提交按钮有 loading。
- 错误提示紧贴字段，不只用颜色表达。
- 长表单优先独立页面，不塞进过长弹窗。

### 7.4 做弹窗或抽屉

优先规则：

- 简单确认用 Popconfirm。
- 新增/编辑优先用 Drawer。
- 复杂详情用 Drawer 或详情页。
- 危险操作必须二次确认。

抽屉宽度参考：

| 场景 | 宽度 |
|---|---:|
| 简单表单 | 480px |
| 常规编辑 | 640px |
| 复杂详情 | 800px |
| 多区块详情 | 900px |

## 8. 提交前自查

提交前至少做一次快速检查：

```bash
rg -n "style=|:style=" src/views src/components src/layouts
rg -n "#[0-9a-fA-F]{3,8}|rgb\\(|rgba\\(" src/views src/components src/layouts
rg -n "font-size:|padding:|margin:|border-radius:" src/views src/components src/layouts
rg -n ":deep\\(\\.ant-|:deep\\(\\.el-" src/views src/components src/layouts
```

如果这些命令扫到很多历史问题，不要一次性全改。先确认本次新增或修改的文件里有没有新增问题。

提交前再按 `09-review-checklist.md` 检查：

- 视觉 Token 是否一致。
- 布局和响应式是否可用。
- 公共组件是否优先复用。
- 已文档化组件的 API、交互或用途变更是否同步更新组件规范。
- 交互状态是否完整。
- 是否没有新增内联 style。
- 是否没有新增硬编码样式。

## 9. 遇到规范没覆盖怎么办

按这个顺序处理：

1. 先找相似页面或相似组件。
2. 再看 `docs/frontend-standards/00-design-source.md` 是否有上游规则。
3. 如果是通用问题，补充到 `docs/frontend-standards`。
4. 如果是组件能力缺口，优先扩展公共组件，并同步维护 `docs/frontend-standards/components/`。
5. 如果只是单个页面的特殊业务，才写页面局部实现。

新增规范时要保持可执行，不写空泛描述。好的规范应该回答：

- 什么时候用。
- 放在哪里。
- 怎么写。
- 不允许怎么写。
- 如何检查。

## 10. 推荐日常工作方式

新成员可以按这个节奏熟悉项目：

1. 先读 `USAGE.md` 和 `README.md`。
2. 找一个已完成页面，对照 `09-review-checklist.md` 做一次审查练习。
3. 打开 `10-component-inventory.md`，认识当前已有公共组件。
4. 打开 `components/README.md`，了解哪些 `Ds*` 组件已有稳定规范。
5. 新增小页面时强制从 `@/components` 导入公共组件。
6. 每次提交前贴一次 AI 审查提示词，让 AI 帮你做规范复核。

统一样式不是靠一次大重构完成的，而是靠每个新页面都不再发散、每个旧页面都逐步收敛。
