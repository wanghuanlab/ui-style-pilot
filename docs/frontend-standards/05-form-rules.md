# 05 表单与属性区规范

本规范用于统一新增、编辑、审批、详情、只读属性区中的字段排布。凡是出现“属性名 + 属性值”的结构，都应优先使用 `DsForm*` 组件，不应在页面内手写 label、冒号、宽度和间距。

## 场景分层

| 场景 | 推荐组件 | 说明 |
|---|---|---|
| 查询条件 | `DsSearchPanel` | 页面顶部筛选区，使用 28px 紧凑控件 |
| 编辑表单 | `DsFormSection` + `DsFormGrid` + `DsFormItem` | 新增、编辑、审批填写 |
| 只读属性 | `DsReadonlyField` | 详情、审批查看、基础信息展示 |
| 表单操作区 | `DsFormActions` + `DsActionButton` | 保存、取消、提交、关闭 |

## 基础视觉规则

| 项 | 标准 |
|---|---|
| 字段控件高度 | 28px |
| label 字号 | 12px |
| value 字号 | 12px |
| label 颜色 | `var(--text-secondary)` |
| value 颜色 | `var(--text-primary)` |
| label 默认宽度 | 112px |
| label 长字段宽度 | 128px |
| label 对齐 | 右对齐 |
| 冒号 | 由组件自动生成，页面不得手写 |
| label 与 value 间距 | 8px |
| 表单项横向间距 | 24px |
| 表单项纵向间距 | 12px |
| 控件宽度 | 默认 100%，由 grid 控制 |

## 编码规则

- 页面不得直接写 `名称：`、`<span>名称</span>`、`style="margin-left: ..."` 来拼表单项。
- 编辑态字段必须优先使用 `DsFormItem`。
- 只读态字段必须优先使用 `DsReadonlyField`。
- 多列表单必须使用 `DsFormGrid`。
- 表单分组必须使用 `DsFormSection`。
- 表单底部按钮必须使用 `DsFormActions`，按钮动作必须优先使用 `DsActionButton`。
- 输入、下拉、日期等 28px 紧凑表单控件优先使用 `DsCompactInput`、`DsCompactSelect`、`DsCompactDatePicker`。
- 业务页面不得通过局部 `:deep(.ant-form-item)`、`:deep(.ant-input)` 修补表单间距和控件高度。

## 推荐结构

```vue
<DsFormSection title="基本信息">
    <DsFormGrid :columns="4" label-width="112px">
        <DsFormItem label="项目名称" required>
            <DsCompactInput v-model:value="form.projectName" placeholder="请输入" />
        </DsFormItem>
        <DsFormItem label="计划类型">
            <DsCompactSelect v-model:value="form.planType" :options="planTypeOptions" placeholder="请选择" />
        </DsFormItem>
        <DsFormItem label="计划日期">
            <DsCompactDatePicker v-model:value="form.planDate" value-format="YYYY-MM-DD" placeholder="请选择" />
        </DsFormItem>
    </DsFormGrid>
</DsFormSection>
```

## 迁移顺序

1. 先识别页面中的属性区、详情区和编辑区。
2. 把分组容器替换为 `DsFormSection`。
3. 把 `a-row/a-col` 或手写 flex/grid 替换为 `DsFormGrid`。
4. 把 `a-form-item`、`div + span`、手写冒号替换为 `DsFormItem` 或 `DsReadonlyField`。
5. 删除页面内与表单 label、冒号、控件高度、间距相关的局部样式。
