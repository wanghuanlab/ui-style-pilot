# UI Style Pilot 接入使用手册

本手册面向希望把 `ui-style-pilot` 接入到自己前端项目的团队。目标不是把所有页面一次性重构，而是先建立一套让人和 AI 都能遵守的前端规范、组件复用规则和审查流程。

## 1. 适合什么项目

适合这些场景：

- 多人或多智能体开发，页面风格开始不一致。
- 已经有一些公共组件，但 AI 经常重复实现。
- 列表页、表单页、详情页、Tab、表格、按钮、筛选区样式漂移明显。
- 希望把“先找公共组件、再写页面、最后自查”变成固定流程。

不要求项目必须使用 Vue，但本仓库提供的模板和示例优先面向 Vue 3 项目。

## 2. 接入后的目录建议

推荐把这些内容复制到目标项目：

```text
your-project/
  AGENTS.md
  CLAUDE.md
  docs/
    frontend-standards/
      README.md
      USAGE.md
      01-design-tokens.md
      04-component-rules.md
      05-form-rules.md
      09-review-checklist.md
      10-component-inventory.md
      components/
        README.md
        UspActionButton.md
        UspFormLayout.md
        ...
    ai-skills/
      frontend/
        frontend-page-builder/
        frontend-design-review/
        frontend-component-reuse/
        frontend-style-migration/
  src/
    components/
      index.ts
```

其中：

- `docs/frontend-standards/` 是团队统一视觉、交互、组件和编码规范。
- `docs/frontend-standards/components/` 是组件规范资产，不是组件源码。
- `docs/ai-skills/frontend/` 是给 AI 智能体使用的工作流约束。
- `src/components/index.ts` 是公共组件统一导出入口。

## 3. 第一次接入步骤

### 3.1 复制规范文档

在目标项目根目录执行：

```bash
mkdir -p docs
cp -R /path/to/ui-style-pilot/docs/frontend-standards docs/
cp -R /path/to/ui-style-pilot/docs/ai-skills docs/
```

如果目标项目已经有 `docs/frontend-standards/`，不要直接覆盖。先对比这些文件：

```bash
diff -qr docs/frontend-standards /path/to/ui-style-pilot/docs/frontend-standards
```

建议优先合并：

- `USAGE.md`
- `04-component-rules.md`
- `05-form-rules.md`
- `09-review-checklist.md`
- `10-component-inventory.md`
- `components/README.md`

### 3.2 添加 AI 协作入口

把本仓库根目录的 `AGENTS.md` 和 `CLAUDE.md` 复制或合并到目标项目根目录。

推荐原则：

- `AGENTS.md` 写项目统一 AI 协作基准。
- `CLAUDE.md` 只做 Claude Code 专用入口，指向 `AGENTS.md`。
- 真正的项目规范放在 `docs/frontend-standards/`，不要在多个入口重复维护同一套规则。

### 3.3 建立公共组件入口

Vue 3 项目可以参考：

```bash
mkdir -p src/components
cp /path/to/ui-style-pilot/templates/vue3/src/components/index.ts src/components/index.ts
```

然后按项目实际组件补充导出，例如：

```ts
export { default as UspActionButton } from "./base/UspActionButton.vue";
export { default as UspPage } from "./layout/UspPage.vue";
export { default as UspSearchPanel } from "./business/UspSearchPanel.vue";
export { default as UspDataTable } from "./business/UspDataTable.vue";
```

如果你的项目已有组件前缀，例如 `Ds*`、`Ui*`、`App*`，可以继续沿用。`Usp*` 是本仓库的参考命名，核心要复用的是组件 Pattern 和规则。

## 4. 接入后如何使用

### 4.1 四个 skill 分别什么时候用

`docs/ai-skills/frontend/` 下的四个 skill 是给 AI 智能体执行任务时使用的“工作流说明书”。接入后，不要只让 AI 自由发挥，建议在提示词中明确点名对应 skill。

| Skill | 适用场景 | 典型目标 |
|---|---|---|
| `frontend-page-builder` | 新增页面、改页面结构、根据需求生成列表/表单/详情页 | 从一开始按规范生成页面 |
| `frontend-design-review` | 审查页面、截图、URL、PR 是否符合规范 | 只检查，不一定改代码 |
| `frontend-component-reuse` | 新增公共组件、抽象重复结构、判断是否应复用/扩展组件 | 防止重复造控件 |
| `frontend-style-migration` | 迁移老页面、AI 生成页面风格漂移、清理内联样式和重复结构 | 渐进式把旧页面迁到统一范式 |

推荐使用顺序：

```text
新页面：frontend-page-builder -> frontend-design-review
老页面：frontend-design-review -> frontend-style-migration -> frontend-design-review
公共组件：frontend-component-reuse -> frontend-page-builder 或 frontend-style-migration
```

如果你的 AI 工具支持“技能/Skill”机制，可以直接把 `docs/ai-skills/frontend/*/SKILL.md` 注册进去。如果不支持，也可以在提示词中显式要求 AI 阅读对应 `SKILL.md`。

### 4.2 新页面开发：使用 frontend-page-builder

给 AI 的推荐提示词：

```text
请使用 docs/ai-skills/frontend/frontend-page-builder/SKILL.md，
请按项目规范新增页面。开始前必须阅读：
1. AGENTS.md
2. docs/frontend-standards/USAGE.md
3. docs/frontend-standards/README.md
4. docs/frontend-standards/04-component-rules.md
5. docs/frontend-standards/components/README.md
6. docs/frontend-standards/10-component-inventory.md
7. docs/frontend-standards/09-review-checklist.md

要求：
- 先判断页面类型。
- 先搜索 src/components 中已有公共组件。
- 优先从 src/components/index.ts 导入公共组件。
- 不写内联 style。
- 不硬编码颜色、字号、间距、圆角。
- 标准动作按钮、搜索区、表格、表单属性区优先使用公共组件。
- 完成后按 09-review-checklist 自查。
```

适合任务：

- 新增列表页。
- 新增表单页。
- 新增详情页。
- 根据产品原型生成页面。
- 在已有页面中新增一个规范化业务区块。

输出时要求 AI 说明：

- 页面类型和采用的模板。
- 复用了哪些公共组件。
- 是否需要新增公共组件。
- 是否有未迁移的样式债务。
- 执行了哪些检查或构建命令。

### 4.3 老页面迁移：使用 frontend-style-migration

不要一次性重构整个系统。推荐顺序：

```text
页面壳/页头
  -> 搜索区
  -> 工具栏和按钮
  -> 表格和分页
  -> 状态标签
  -> 表单/属性区
  -> 抽屉/弹窗
  -> 局部样式清理
```

给 AI 的推荐提示词：

```text
请使用 docs/ai-skills/frontend/frontend-style-migration/SKILL.md，
把 <目标页面或 URL> 按前端规范做渐进式迁移。

要求：
- 先定位页面文件。
- 先审查当前样式和公共组件复用问题。
- 本轮只迁移一个明确区域。
- 不改变接口、路由、字段含义和业务行为。
- 不重写无关逻辑。
- 改完后运行构建或项目约定检查。
```

适合任务：

- 某个 URL 看起来和系统其他页面不一致。
- 某个页面有大量内联 `style`、硬编码颜色、局部覆盖 `.ant-*`。
- 搜索区、表格、工具栏、表单字段区重复实现。
- 想把旧页面逐步迁移到 `Usp*` 或项目自己的公共组件范式。

迁移时建议一次只做一个区域，例如：

```text
本轮只迁移搜索区，不改表格。
本轮只迁移按钮，不改业务逻辑。
本轮只迁移表单属性区，不改接口。
```

### 4.4 页面审查：使用 frontend-design-review

给 AI 的推荐提示词：

```text
请使用 docs/ai-skills/frontend/frontend-design-review/SKILL.md，
请审查 <页面或文件> 是否符合前端规范，只审查不改代码。

对照：
1. docs/frontend-standards/USAGE.md
2. docs/frontend-standards/04-component-rules.md
3. docs/frontend-standards/05-form-rules.md
4. docs/frontend-standards/09-review-checklist.md
5. docs/frontend-standards/components/README.md

请按严重程度列出问题，并指出对应文件和位置。
```

适合任务：

- 上线前检查页面是否符合规范。
- 对比截图和规范是否一致。
- 审查 AI 生成页面有没有重复组件、硬编码样式、交互缺失。
- PR 评审时先找视觉和组件复用问题。

建议输出格式：

```text
结论：符合 / 部分符合 / 不符合
发现：
1. [严重程度] 问题描述，文件和位置，依据哪条规范
2. ...
建议下一步：
- ...
```

### 4.5 公共组件抽象：使用 frontend-component-reuse

当你发现多个页面反复出现同一类结构时，先不要让 AI 在页面里继续复制。改用 `frontend-component-reuse` 判断是否应该复用、扩展或新增组件。

给 AI 的推荐提示词：

```text
请使用 docs/ai-skills/frontend/frontend-component-reuse/SKILL.md，
评估 <组件/页面区域/重复结构> 是否应该抽象为公共组件。

要求：
- 先搜索 src/components 中已有组件。
- 先阅读 docs/frontend-standards/components/README.md。
- 如果已有组件能满足，优先复用或扩展。
- 如果需要新增组件，说明应放在 base、business、layout、feedback 哪一类。
- 新增或修改公共组件时，同步更新 docs/frontend-standards/components/ 下的组件规范文档。
```

适合任务：

- 统一按钮。
- 统一搜索区。
- 统一表格工具栏。
- 统一表单 label/value 布局。
- 统一列配置抽屉。
- 从老页面里提取公共组件。

推荐判断标准：

- 只出现一次：先保留页面局部实现。
- 出现两次且视觉或交互一致：考虑抽象。
- 出现三次以上：优先抽象或扩展公共组件。
- 已经有组件文档：优先按文档复用，不在页面重新实现。

### 4.6 常见组合用法

#### 新建一个标准列表页

```text
请使用 docs/ai-skills/frontend/frontend-page-builder/SKILL.md，
新增 <页面名称> 列表页。

要求：
- 使用标准列表页结构：页面壳、页头、搜索区、工具栏、数据表格、分页、列配置。
- 优先使用 src/components/index.ts 中已有公共组件。
- 如果缺少组件，先使用 frontend-component-reuse 判断是否需要新增。
- 完成后使用 docs/ai-skills/frontend/frontend-design-review/SKILL.md 自查。
```

#### 把一个老页面改成统一风格

```text
请先使用 docs/ai-skills/frontend/frontend-design-review/SKILL.md 审查 <URL或文件>，
只输出问题和迁移建议，不改代码。

确认后再使用 docs/ai-skills/frontend/frontend-style-migration/SKILL.md，
按建议分阶段迁移。
```

#### 抽象一个新公共组件

```text
请使用 docs/ai-skills/frontend/frontend-component-reuse/SKILL.md，
把 <重复区域> 评估并抽象为公共组件。

要求：
- 不改变业务行为。
- 组件代码放在 src/components 的合适分类。
- 从 src/components/index.ts 导出。
- 在 docs/frontend-standards/components/ 新增或更新组件规范。
- 更新 docs/frontend-standards/10-component-inventory.md。
```

## 5. 组件规范如何落地

组件复用分两层：

1. 组件源码：放在目标项目 `src/components/**`。
2. 组件规范资产：放在 `docs/frontend-standards/components/**`。

新增一个公共组件时，至少同步两件事：

- 新增或更新组件源码。
- 新增或更新对应组件规范文档。

例如新增统一表单布局：

```text
src/components/business/UspFormItem.vue
docs/frontend-standards/components/UspFormLayout.md
```

组件规范文档至少说明：

- 组件定位
- 适用场景和不适用场景
- API 和事件
- 交互规则
- 设计约束
- 迁移建议

## 6. 团队工作流建议

建议在团队里固定这几个动作：

1. 新页面评审前，必须通过 `09-review-checklist.md`。
2. AI 修改页面前，必须先读 `AGENTS.md` 和相关规范。
3. 重复出现 2 次以上的页面结构，应考虑沉淀公共组件。
4. 公共组件进入复用清单后，必须补组件规范文档。
5. 老页面迁移只做渐进式改造，不把业务重构混进视觉迁移。

## 7. 最小落地清单

如果你只想先轻量试用，至少完成这些：

- [ ] 复制 `docs/frontend-standards/`。
- [ ] 复制 `docs/ai-skills/frontend/`。
- [ ] 在项目根目录建立或更新 `AGENTS.md`。
- [ ] 建立 `src/components/index.ts`。
- [ ] 维护 `docs/frontend-standards/10-component-inventory.md`。
- [ ] 要求 AI 新增或迁移页面前先读规范。
- [ ] 每次页面交付前使用 `09-review-checklist.md` 自查。

## 8. 推荐从哪里开始

第一阶段只做规则建立：

- `USAGE.md`
- `04-component-rules.md`
- `05-form-rules.md`
- `09-review-checklist.md`
- `10-component-inventory.md`

第二阶段做高频组件：

- 标准动作按钮
- 页面壳和页头
- 搜索区
- 表格工具栏
- 数据表格
- 表单字段布局

第三阶段做老页面迁移：

- 每次选一个页面。
- 每次只迁移一个区域。
- 每次同步更新组件规范和审查清单。

这样接入成本最低，也最容易让团队和 AI 形成稳定习惯。
