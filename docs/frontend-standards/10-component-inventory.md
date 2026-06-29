# 10 现有组件盘点

本文件用于指导 AI 和开发者优先复用 `src/components` 中已有组件。当前阶段只建立统一入口和复用清单，不移动组件、不重构实现。

新页面建议从统一入口导入：

```ts
import { PageScaffold, ColumnConfigDrawer, DictTag } from "@/components";
```

旧页面已有的相对路径引用可以逐步迁移，不需要一次性替换。

## 统一导出入口

统一导出入口：

```text
src/components/index.ts
```

该入口只做命名导出，不改变组件注册方式，不影响 `src/index.ts` 中已有的全局组件注册。

## 优先复用组件

这些组件可作为新页面的第一优先级。

| 组件 | 当前路径 | 建议归类 | 适用场景 | 复用建议 |
|---|---|---|---|---|
| `PageScaffold` | `src/components/PageScaffold.vue` | `layout` | 页面骨架、面包屑、标题、页面操作区 | 新增业务页优先使用；后续需按规范把页面标题收敛到 18px |
| `SystemPageLayout` | `src/components/SystemPageLayout.vue` | `layout` | 系统管理类页面，含筛选、工具栏、内容区插槽 | 系统管理页面可继续复用；后续应减少 Element Plus 依赖扩散 |
| `ColumnConfigDrawer` | `src/components/ColumnConfigDrawer.vue` | `business` | 表格列配置抽屉 | 表格列配置优先使用；不要在页面内重复实现列选择 |
| `ColumnConfigTransfer` | `src/components/ColumnConfigTransfer.vue` | `business` | 更复杂的列配置穿梭框 | 字段较多、需要左右选择时复用 |
| `AdvancedFilter` | `src/components/AdvancedFilter.vue` | `business` | 高级筛选条件组合 | 可用于复杂筛选；后续需清理内部内联宽度样式 |
| `Pagination` | `src/components/Pagination/index.vue` | `business` | 分页 | 历史后台页面可复用；新页面可按统一分页策略封装 |
| `DictTag` | `src/components/DictTag/index.vue` | `business` | 字典标签、状态标签 | 状态展示优先复用或作为统一状态标签基础 |
| `RightToolbar` | `src/components/RightToolbar/index.vue` | `business` | 表格右侧工具栏 | 列显隐、刷新、密度等工具能力优先复用 |
| `TreePanel` | `src/components/TreePanel/index.vue` | `business` | 左树右表布局中的树面板 | 组织、部门、分类、菜单类页面优先复用 |
| `PermissionMenuTree` | `src/components/PermissionMenuTree.vue` | `business` | 权限菜单树 | 角色、菜单、权限配置复用 |

## 可复用但需注意组件

这些组件可以复用，但应注意历史依赖、样式一致性或业务边界。

| 组件 | 当前路径 | 建议归类 | 适用场景 | 注意事项 |
|---|---|---|---|---|
| `Breadcrumb` | `src/components/Breadcrumb/index.vue` | `layout` | 历史页面面包屑 | 新页面优先用 `PageScaffold` 内置面包屑，避免重复 |
| `SvgIcon` | `src/components/SvgIcon/index.vue` | `base` | SVG 图标 | 历史图标体系继续复用；新 Ant Design Vue 页面可优先用 `@ant-design/icons-vue` |
| `Hamburger` | `src/components/Hamburger/index.vue` | `layout` | 侧边栏展开收起 | 布局组件内部使用，不建议业务页直接使用 |
| `HeaderSearch` | `src/components/HeaderSearch/index.vue` | `layout` | 顶部全局搜索 | 只用于全局 Header，不用于业务筛选区 |
| `Screenfull` | `src/components/Screenfull/index.vue` | `layout` | 全屏切换 | 放在全局工具区或表格工具栏时复用 |
| `SizeSelect` | `src/components/SizeSelect/index.vue` | `layout` | 全局尺寸切换 | Element Plus 历史能力，新页面谨慎扩散 |
| `ParentView` | `src/components/ParentView/index.vue` | `layout` | 路由父视图 | 路由配置使用，不作为业务 UI 组件 |
| `InnerLink` | `src/components/InnerLink/index.vue` | `layout` | 内链/iframe 跳转 | 路由或外链承载场景使用 |
| `iFrame` | `src/components/iFrame/index.vue` | `layout` | iframe 页面 | 只在 Swagger、Druid 等嵌入场景使用 |

## 表单、上传与富文本组件

| 组件 | 当前路径 | 建议归类 | 适用场景 | 注意事项 |
|---|---|---|---|---|
| `Editor` | `src/components/Editor/index.vue` | `business` | 富文本编辑 | 依赖编辑器能力，适合备注、公告、说明类内容 |
| `FileUpload` | `src/components/FileUpload/index.vue` | `business` | 文件上传 | 上传入口优先复用，避免页面自行拼上传逻辑 |
| `ImageUpload` | `src/components/ImageUpload/index.vue` | `business` | 图片上传 | 图片字段优先复用 |
| `ImagePreview` | `src/components/ImagePreview/index.vue` | `business` | 图片预览 | 列表、详情中的图片预览复用 |
| `ExcelImportDialog` | `src/components/ExcelImportDialog/index.vue` | `business` | Excel 导入弹窗 | 批量导入场景优先复用，导入结果反馈需按规范补齐 |
| `IconSelect` | `src/components/IconSelect/index.vue` | `business` | 图标选择 | 菜单、配置类页面复用 |

## 定时任务组件

| 组件 | 当前路径 | 建议归类 | 适用场景 | 注意事项 |
|---|---|---|---|---|
| `Crontab` | `src/components/Crontab/index.vue` | `business` | Cron 表达式编辑 | 系统任务、调度配置复用 |
| `Crontab/day` 等子组件 | `src/components/Crontab/*.vue` | `business` | `Crontab` 内部子组件 | 不建议业务页直接引用 |

## 文档与历史组件

| 组件 | 当前路径 | 建议归类 | 适用场景 | 注意事项 |
|---|---|---|---|---|
| `LegacyDoc` | `src/components/legacy/Doc/index.vue` | `legacy` | 历史文档入口 | 历史功能，非新业务组件 |
| `LegacyGit` | `src/components/legacy/Git/index.vue` | `legacy` | 历史 Git 入口 | 历史功能，非新业务组件 |

## 后续推荐目录归档

后续在不影响业务的前提下，可逐步整理为：

```text
src/components/
  base/
    SvgIcon/
  business/
    AdvancedFilter/
    ColumnConfigDrawer/
    ColumnConfigTransfer/
    DictTag/
    Pagination/
    RightToolbar/
    TreePanel/
    Upload/
  layout/
    PageScaffold/
    SystemPageLayout/
    Breadcrumb/
    HeaderSearch/
  feedback/
    EmptyState/
    LoadingState/
  legacy/
    legacy/
```

当前不建议立即移动文件，因为大量历史页面使用相对路径引用。优先通过 `src/components/index.ts` 建立新页面导入习惯，待后续迁移时再逐步调整目录。

## AI 使用要求

AI 新增或修改页面时必须先做两步：

1. 搜索公共组件：

```bash
find src/components -maxdepth 3 -type f \( -name "*.vue" -o -name "*.tsx" -o -name "*.ts" \) | sort
rg -n "Search|Filter|Toolbar|Table|Drawer|Modal|Pagination|Status|Tag|Scaffold|Layout|Tree|ColumnConfig" src/components
```

2. 从 `@/components` 导入可复用组件。

只有当现有组件无法满足需求时，才允许提出新增公共组件，并说明为什么不能复用或扩展现有组件。
