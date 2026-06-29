# 08 页面模板

本文件定义常见后台页面模板。AI 新增页面时应先判断页面类型，再按模板生成，不要自由发挥页面结构。

## 列表页

适用：采购申请概览、合同列表、项目列表、用户列表。

结构：

```text
PageScaffold
  Breadcrumb
  PageHeader
  SearchPanel
  TableToolbar
  DataTable
  Pagination
```

规则：

- 页面标题 18px。
- 搜索区放常用字段，低频字段进入更多字段。
- 工具栏左侧放主要业务操作，右侧放导出、列配置、刷新等工具。
- 表格状态列使用统一状态标签。
- 分页在表格下方。

## 表单页

适用：新增项目、编辑合同、提交申请。

结构：

```text
PageScaffold
  Breadcrumb
  PageHeader
  FormContainer
    Section
    Section
  FooterActions
```

规则：

- 表单控件使用 38px 舒适高度。
- 字段按业务分区。
- 底部操作固定或跟随表单末尾，主按钮为“保存”“提交”。
- 校验错误显示在字段下方。

## 详情页

适用：项目详情、采购申请详情、合同详情。

结构：

```text
PageScaffold
  Breadcrumb
  PageHeader + Actions
  DetailSections
  RelatedTables
```

规则：

- 基础信息优先展示。
- 长字段允许跨列。
- 状态、金额、日期应格式统一。
- 关联列表使用标准表格。

## 抽屉编辑

适用：列表中的快速新增、编辑、查看详情。

结构：

```text
Drawer
  DrawerHeader
  Form / Detail
  DrawerFooter
```

规则：

- 简单表单 480px。
- 常规编辑 640px。
- 复杂详情 800px/900px。
- 底部按钮右对齐。
- 保存时按钮 loading。

## 左树右表页

适用：组织机构、菜单权限、分类管理。

结构：

```text
PageScaffold
  Breadcrumb
  PageHeader
  SplitLayout
    TreePanel
    ContentPanel
      SearchPanel
      TableToolbar
      DataTable
```

规则：

- 左侧树宽度 240px 或 280px。
- 右侧自适应。
- 树节点选中后刷新右侧数据。
- 1280 宽下仍需保留右侧关键操作。

## 概览页

适用：工作台、项目概览、报表概览。

结构：

```text
PageScaffold
  PageHeader
  MetricCards
  ChartsGrid
  DataTables
```

规则：

- 使用 12/24 栅格。
- 图表色板遵守 `11-chart-rules.md`。
- 指标卡不要过度装饰。
- 图表容器白底，与表格卡片对齐。

## 空状态页

适用：无数据、无权限、未配置。

结构：

```text
PageScaffold
  EmptyState
    Title
    Description
    Action
```

规则：

- 说明当前为什么为空。
- 给出下一步动作。
- 不只展示空白区域。
