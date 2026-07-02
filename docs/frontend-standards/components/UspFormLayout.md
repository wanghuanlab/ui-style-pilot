# UspFormLayout

## 组件定位

`UspFormSection`、`UspFormGrid`、`UspFormItem`、`UspReadonlyField`、`UspFormActions` 共同承载项目统一的表单和属性区视觉范式。

Pattern: Standard Form Field Layout

Implementation:

- `UspFormSection`
- `UspFormGrid`
- `UspFormItem`
- `UspReadonlyField`
- `UspFormActions`

Status: `draft`

## 适用场景

- 新增、编辑、审批填写表单。
- 详情页、审批查看页中的只读属性展示。
- Tab、Collapse 内部的业务字段区。
- 需要统一 label、冒号、控件高度、字段间距的区域。

## 不适用场景

- 页面顶部查询条件，优先使用 `UspSearchPanel`。
- 表格内联编辑单元格，优先由表格组件或单元格渲染器控制。
- 富文本、上传、复杂树选择等特殊控件区域，可以放入 `UspFormItem` 内部，但特殊控件本身不由本组件负责。

## 交互规范

- label 右对齐。
- 冒号由组件自动生成。
- 必填星号由 `required` 控制。
- 错误信息显示在字段下方，不能只依赖颜色表达。
- 响应式下小屏自动转为单列。

## API 规范

### UspFormGrid

| Prop | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `columns` | `1 \| 2 \| 3 \| 4` | `4` | 字段列数 |
| `labelWidth` | `string` | `112px` | label 宽度 |
| `dense` | `boolean` | `false` | 是否使用更紧凑间距 |

### UspFormItem

| Prop | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `label` | `string` | `""` | 字段名 |
| `required` | `boolean` | `false` | 是否显示必填星号 |
| `colon` | `boolean` | `true` | 是否显示冒号 |
| `help` | `string` | `""` | 辅助说明 |
| `error` | `string` | `""` | 错误提示 |
| `full` | `boolean` | `false` | 是否跨满整行 |

### UspReadonlyField

| Prop | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `label` | `string` | `""` | 字段名 |
| `value` | `string \| number \| null` | `undefined` | 字段值 |
| `emptyText` | `string` | `"-"` | 空值占位 |
| `colon` | `boolean` | `true` | 是否显示冒号 |
| `full` | `boolean` | `false` | 是否跨满整行 |

### UspFormActions

| Prop | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `align` | `"left" \| "center" \| "right"` | `"right"` | 按钮区对齐方式 |

## 使用示例

```vue
<UspFormSection title="项目信息">
    <UspFormGrid :columns="4" label-width="128px">
        <UspFormItem label="是否重点项目">
            <a-radio-group v-model:value="form.isKeyProject" size="small">
                <a-radio value="否">否</a-radio>
                <a-radio value="是">是</a-radio>
            </a-radio-group>
        </UspFormItem>
        <UspFormItem label="项目编号">
            <UspCompactInput v-model:value="form.projectNo" placeholder="请输入" />
        </UspFormItem>
    </UspFormGrid>
</UspFormSection>
```

## 设计与编码约束

- 不允许页面手写冒号。
- 不允许页面通过内联 style 修补 label 宽度和字段间距。
- 不允许页面直接堆 `a-row/a-col + a-form-item` 形成新的表单视觉。
- 需要新增表单布局能力时，优先扩展本组件组，并同步更新本文件。

## 迁移建议

旧写法：

```vue
<a-form-item label="项目编号">
    <a-input size="small" />
</a-form-item>
```

新写法：

```vue
<UspFormItem label="项目编号">
    <UspCompactInput v-model:value="form.projectNo" placeholder="请输入" />
</UspFormItem>
```
