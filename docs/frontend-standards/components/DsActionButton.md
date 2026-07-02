# DsActionButton

## 组件定位

`DsActionButton` 用于统一系统内高频操作按钮的文案、图标、按钮类型、危险态和尺寸，避免不同页面对“导出、列配置、新建、删除”等同类动作重复实现出不同视觉。

## Pattern 与实现名

- Pattern: Semantic Action Button
- Implementation: `DsActionButton`
- 类型: `base`
- 状态: `draft`

## 适用场景

- 页面头部、表格工具栏、Tab 工具栏、抽屉头部或底部中的标准动作。
- 新建、编辑、删除、复制、导入、导出、列配置、查询、重置、保存、取消、刷新等高频按钮。
- 迁移历史页面时替换页面内自写的标准动作 `a-button`。

## 不适用场景

- 表格行内操作，优先使用文字链接按钮，不强制带图标。
- 强业务语义且没有稳定复用价值的临时按钮，可继续使用 `a-button`，但必须符合尺寸、颜色和间距规则。
- 复杂下拉菜单、组合按钮应先评估是否需要沉淀更高阶组件。

## 动作映射

| action | 默认文案 | 默认图标 | 默认类型 |
|---|---|---|---|
| `add` | 新建 | `PlusOutlined` | primary |
| `edit` | 编辑 | `EditOutlined` | default |
| `delete` | 删除 | `DeleteOutlined` | danger |
| `copy` | 复制 | `CopyOutlined` | default |
| `paste` | 粘贴 | `SnippetsOutlined` | default |
| `view` | 查看 | `EyeOutlined` | default |
| `import` | 导入 | `UploadOutlined` | default |
| `export` | 导出 | `DownloadOutlined` | default |
| `column-config` | 列配置 | `SettingOutlined` | default |
| `search` | 查询 | `SearchOutlined` | primary |
| `reset` | 重置 | `ReloadOutlined` | default |
| `save` | 保存 | `SaveOutlined` | primary |
| `cancel` | 取消 | `CloseOutlined` | default |
| `submit` | 提交 | `SendOutlined` | primary |
| `approve` | 批准 | `CheckOutlined` | primary |
| `reject` | 退回 | `RollbackOutlined` | default |
| `refresh` | 刷新 | `ReloadOutlined` | default |
| `density` | 表格密度 | `ColumnHeightOutlined` | default |

## API 规范

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `action` | `DsActionButtonAction` | 必填 | 标准动作语义 |
| `label` | `string` | 动作默认文案 | 覆盖显示文案 |
| `type` | Ant ButtonType | 动作默认类型 | 覆盖按钮类型 |
| `danger` | `boolean` | 动作默认危险态 | 覆盖危险态 |
| `iconOnly` | `boolean` | `false` | 图标按钮模式，自动展示 Tooltip |
| `showIcon` | `boolean` | 动作默认值 | 是否显示图标 |
| `disabled` | `boolean` | `false` | 禁用态 |
| `loading` | `boolean` | `false` | 加载态 |
| `size` | `small` / `middle` / `large` | `small` | 按钮尺寸 |

## 使用示例

```vue
<DsActionButton action="add" @click="handleAdd" />
<DsActionButton action="export" @click="handleExport" />
<DsActionButton action="column-config" icon-only @click="openColumnConfig" />
<DsActionButton action="submit" label="送审" @click="handleSubmit" />
```

## 设计与编码约束

- 新页面不得直接手写新建、编辑、删除、导入、导出、列配置、查询、重置、保存、取消等标准动作按钮。
- 工具栏内标准动作必须优先使用 `DsActionButton`。
- 同一动作不得在不同页面随意更换图标或按钮类型。
- 每个工具栏区域原则上最多一个主按钮。
- 行内操作优先文字链接，不强制使用图标按钮。

## 迁移建议

历史写法：

```vue
<a-button size="small" @click="handleExport">导出</a-button>
```

迁移为：

```vue
<DsActionButton action="export" @click="handleExport" />
```
