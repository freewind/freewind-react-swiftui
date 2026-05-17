import type { FC } from 'react'
import { FormSection } from './controls'
import { Divider, HStack, ScrollView, Text } from './runtime'
import { VStack } from './components/VStack'

type PropDoc = {
  prop: string
  type: string
  defaultValue?: string
  values?: string
  description: string
}

type ComponentDocKey =
  | 'Text'
  | 'Button'
  | 'Image'
  | 'Label'
  | 'List'
  | 'Section'
  | 'NavigationLink'
  | 'Popover'
  | 'Popconfirm'
  | 'Picker'
  | 'Toggle'
  | 'ProgressView'
  | 'Slider'
  | 'Stepper'
  | 'Table'
  | 'TextField'
  | 'TextEditor'
  | 'VStack'
  | 'HStack'
  | 'Spacer'
  | 'Divider'
  | 'ScrollView'
  | 'LazyHStack'
  | 'LazyVGrid'
  | 'Sheet'
  | 'ContextMenu'
  | 'Menu'
  | 'TabView'
  | 'DisclosureGroup'
  | 'RoundedRectangle'
  | 'TokenColor'
  | 'GeometryReader'
  | 'ScrollViewReader'
  | 'DropArea'
  | 'WindowAccessor'

const viewBaseProps: PropDoc[] = [
  {
    prop: 'padding',
    type: 'number | EdgeInsets',
    defaultValue: '-',
    values: 'number | { top, bottom, leading, trailing, horizontal, vertical }',
    description: '内边距。单值会四边一致；对象可按边控制。',
  },
  {
    prop: 'frame',
    type: 'FrameSpec',
    defaultValue: '-',
    values: '{ width, height, minWidth, maxWidth, minHeight, maxHeight, alignment }',
    description: '宽高与对齐约束。`infinity` 表示尽量撑满。',
  },
  {
    prop: 'background',
    type: 'BackgroundSpec',
    defaultValue: '-',
    values: 'foreground token | material token | { fill, in }',
    description: '背景填充。可直接传 token，也可带 shape 包裹。',
  },
  {
    prop: 'foregroundStyle',
    type: 'ForegroundStyleToken',
    defaultValue: '-',
    values: 'primary | secondary | tertiary | red | blue | green | accentColor',
    description: '语义前景色 token。',
  },
  {
    prop: 'foregroundColor',
    type: 'string',
    defaultValue: '-',
    values: 'hex | rgb(...) | rgba(...) | css color',
    description: '直接指定颜色字符串，优先级高于 `foregroundStyle`。',
  },
  {
    prop: 'opacity',
    type: 'number',
    defaultValue: '-',
    values: '0..1',
    description: '透明度。',
  },
  {
    prop: 'clipShape',
    type: 'ShapeSpec',
    defaultValue: '-',
    values: '{ kind: roundedRectangle | capsule | rectangle, cornerRadius? }',
    description: '裁剪内容形状。',
  },
  {
    prop: 'overlay',
    type: 'ReactNode',
    defaultValue: '-',
    values: '任意 JSX',
    description: '叠加层，覆盖在内容之上。',
  },
  {
    prop: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    values: 'true | false',
    description: '禁用交互，并降低可视透明度。',
  },
]

const stackProps: PropDoc[] = [
  {
    prop: 'spacing',
    type: 'number',
    defaultValue: '0',
    values: '任意数字',
    description: '子项间距。',
  },
  {
    prop: 'alignment',
    type: 'StackAlignment',
    defaultValue: 'center',
    values: 'leading | center | trailing | top | bottom',
    description: '栈内子项对齐方向。',
  },
  {
    prop: 'children',
    type: 'ReactNode',
    defaultValue: '-',
    values: '任意 JSX',
    description: '栈内内容。',
  },
]

const docs: Record<ComponentDocKey, { title: string; rows: PropDoc[] }> = {
  Text: {
    title: 'Text Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'font',
        type: 'FontToken',
        defaultValue: 'body',
        values:
          'largeTitle | title | title2 | title3 | headline | subheadline | body | callout | caption | caption2 | footnote | title3.semibold | headline.semibold | caption.semibold | caption2.monospaced',
        description: '字体 token。',
      },
      {
        prop: 'italic',
        type: 'boolean',
        defaultValue: 'false',
        values: 'true | false',
        description: '斜体。',
      },
      {
        prop: 'monospaced',
        type: 'boolean',
        defaultValue: 'false',
        values: 'true | false',
        description: '强制等宽字体。',
      },
      {
        prop: 'textSelection',
        type: "'enabled' | 'disabled'",
        defaultValue: '-',
        values: 'enabled | disabled',
        description: '是否可选中文本。',
      },
      {
        prop: 'multilineTextAlignment',
        type: 'TextAlign',
        defaultValue: '-',
        values: 'leading | center | trailing',
        description: '多行文本对齐。',
      },
      {
        prop: 'children',
        type: 'ReactNode',
        defaultValue: '-',
        values: '文本或 JSX',
        description: '显示内容。',
      },
    ],
  },
  Button: {
    title: 'Button Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'title',
        type: 'string',
        defaultValue: '-',
        values: '任意字符串',
        description: '按钮标题。未传 `children` 时显示它。',
      },
      {
        prop: 'children',
        type: 'ReactNode',
        defaultValue: '-',
        values: '任意 JSX',
        description: '自定义按钮内容，会覆盖 `title`。',
      },
      {
        prop: 'onPress',
        type: '() => void',
        defaultValue: '-',
        values: '函数',
        description: '点击回调。',
      },
      {
        prop: 'buttonStyle',
        type: 'ButtonStyleToken',
        defaultValue: 'plain',
        values: 'plain | bordered | borderedProminent | borderless | link',
        description: '按钮视觉样式。',
      },
      {
        prop: 'controlSize',
        type: 'ControlSizeToken',
        defaultValue: 'regular',
        values: 'mini | small | regular | large',
        description: '按钮尺寸级别。',
      },
    ],
  },
  Image: {
    title: 'Image Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'systemName',
        type: 'string',
        defaultValue: '-',
        values: 'symbolMap 中已支持 token 或任意字符串',
        description: '系统图标名。未传 `src` 时走 mock symbol 展示。',
      },
      {
        prop: 'src',
        type: 'string',
        defaultValue: '-',
        values: '图片 URL',
        description: '真实图片地址。',
      },
      {
        prop: 'alt',
        type: 'string',
        defaultValue: "''",
        values: '任意字符串',
        description: '真实图片的 alt。',
      },
      {
        prop: 'resizable',
        type: 'boolean',
        defaultValue: 'false',
        values: 'true | false',
        description: '开启后图片按 contain 渲染。',
      },
      {
        prop: 'scaledToFit',
        type: 'boolean',
        defaultValue: 'false',
        values: 'true | false',
        description: '等比适应容器。',
      },
      {
        prop: 'children',
        type: 'ReactNode',
        defaultValue: '-',
        values: '任意 JSX',
        description: '无 `src` 时可作为占位文本内容。',
      },
    ],
  },
  Label: {
    title: 'Label Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'title',
        type: 'string',
        defaultValue: '-',
        values: '任意字符串',
        description: '标签文案。',
      },
      {
        prop: 'systemImage',
        type: 'string',
        defaultValue: '-',
        values: '同 Image.systemName',
        description: '左侧图标名。',
      },
    ],
  },
  List: {
    title: 'List Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'children',
        type: 'ReactNode',
        defaultValue: '-',
        values: 'row / Section / 任意 JSX',
        description: '列表内容。当前以 mock grouped list 语义渲染。',
      },
    ],
  },
  Section: {
    title: 'Section Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'title',
        type: 'string',
        defaultValue: '-',
        values: '任意字符串',
        description: '简写 header。',
      },
      {
        prop: 'header',
        type: 'ReactNode',
        defaultValue: '-',
        values: '任意 JSX',
        description: '自定义 header。',
      },
      {
        prop: 'footer',
        type: 'ReactNode',
        defaultValue: '-',
        values: '任意 JSX',
        description: '自定义 footer / 注释。',
      },
      {
        prop: 'children',
        type: 'ReactNode',
        defaultValue: '-',
        values: 'row / 任意 JSX',
        description: 'section 内容。',
      },
    ],
  },
  NavigationLink: {
    title: 'NavigationLink Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'title',
        type: 'string',
        defaultValue: '-',
        values: '任意字符串',
        description: '简写 label。',
      },
      {
        prop: 'onNavigate',
        type: '() => void',
        defaultValue: '-',
        values: '函数',
        description: '点击后的导航回调。当前 mock 不含完整 NavigationStack。',
      },
      {
        prop: 'children',
        type: 'ReactNode',
        defaultValue: '-',
        values: '任意 JSX',
        description: '自定义 link label。',
      },
    ],
  },
  Popover: {
    title: 'Popover Props',
    rows: [
      {
        prop: 'isPresented',
        type: 'Binding<boolean>',
        defaultValue: '-',
        values: '{ value, setValue }',
        description: '控制 popover 展开/关闭。',
      },
      {
        prop: 'content',
        type: 'ReactNode',
        defaultValue: '-',
        values: '任意 JSX',
        description: '浮层内容。',
      },
      {
        prop: 'children',
        type: 'ReactElement',
        defaultValue: '-',
        values: '单个 JSX 元素',
        description: '触发 popover 的 anchor 视图。',
      },
    ],
  },
  Popconfirm: {
    title: 'Popconfirm Props',
    rows: [
      {
        prop: 'title',
        type: 'string',
        defaultValue: '-',
        values: '任意字符串',
        description: '确认标题。',
      },
      {
        prop: 'description',
        type: 'string',
        defaultValue: '-',
        values: '任意字符串',
        description: '补充说明。',
      },
      {
        prop: 'onConfirm',
        type: '() => void',
        defaultValue: '-',
        values: '函数',
        description: '确认回调。',
      },
      {
        prop: 'onCancel',
        type: '() => void',
        defaultValue: '-',
        values: '函数',
        description: '取消回调。',
      },
      {
        prop: 'confirmText',
        type: 'string',
        defaultValue: '确定',
        values: '任意字符串',
        description: '确认按钮文案。',
      },
      {
        prop: 'cancelText',
        type: 'string',
        defaultValue: '取消',
        values: '任意字符串',
        description: '取消按钮文案。',
      },
      {
        prop: 'children',
        type: 'ReactElement',
        defaultValue: '-',
        values: '单个 JSX 元素',
        description: '触发确认浮层的 anchor。',
      },
    ],
  },
  Picker: {
    title: 'Picker Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'selection',
        type: 'Binding<T>',
        defaultValue: '-',
        values: 'T 为 string | number',
        description: '当前选中值 binding。',
      },
      {
        prop: 'options',
        type: 'Array<{ label: string; value: T }>',
        defaultValue: '-',
        values: '任意数组',
        description: '候选项列表。',
      },
      {
        prop: 'pickerStyle',
        type: 'PickerStyleToken',
        defaultValue: 'segmented',
        values: 'segmented',
        description: '当前仅支持 segmented。',
      },
    ],
  },
  Toggle: {
    title: 'Toggle Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'isOn',
        type: 'Binding<boolean>',
        defaultValue: '-',
        values: '{ value, setValue }',
        description: '开关状态 binding。',
      },
      {
        prop: 'title',
        type: 'string',
        defaultValue: '-',
        values: '任意字符串',
        description: '标题。未传 children 时显示它。',
      },
      {
        prop: 'children',
        type: 'ReactNode',
        defaultValue: '-',
        values: '任意 JSX',
        description: '自定义 label。',
      },
    ],
  },
  ProgressView: {
    title: 'ProgressView Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'value',
        type: 'number',
        defaultValue: '-',
        values: '0..total',
        description: '当前进度值。不传时视为 indeterminate mock。',
      },
      {
        prop: 'total',
        type: 'number',
        defaultValue: '1',
        values: '正数',
        description: '总量。',
      },
      {
        prop: 'label',
        type: 'string',
        defaultValue: '-',
        values: '任意字符串',
        description: '顶部说明文案。',
      },
      {
        prop: 'currentValueLabel',
        type: 'string',
        defaultValue: '-',
        values: '任意字符串',
        description: '底部当前值文案。',
      },
    ],
  },
  Slider: {
    title: 'Slider Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'value',
        type: 'Binding<number>',
        defaultValue: '-',
        values: '{ value, setValue }',
        description: '当前值 binding。',
      },
      {
        prop: 'in',
        type: '[number, number]',
        defaultValue: '[0, 1]',
        values: '[min, max]',
        description: '范围。',
      },
      {
        prop: 'step',
        type: 'number',
        defaultValue: '0.01',
        values: '正数',
        description: '步长。',
      },
    ],
  },
  Stepper: {
    title: 'Stepper Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'value',
        type: 'Binding<number>',
        defaultValue: '-',
        values: '{ value, setValue }',
        description: '当前值 binding。',
      },
      {
        prop: 'in',
        type: '[number, number]',
        defaultValue: '[-Infinity, Infinity]',
        values: '[min, max]',
        description: '上下界。',
      },
      {
        prop: 'step',
        type: 'number',
        defaultValue: '1',
        values: '正数',
        description: '增减步长。',
      },
      {
        prop: 'title',
        type: 'string',
        defaultValue: '-',
        values: '任意字符串',
        description: '简写 label。',
      },
      {
        prop: 'children',
        type: 'ReactNode',
        defaultValue: '-',
        values: '任意 JSX',
        description: '自定义 label。',
      },
    ],
  },
  Table: {
    title: 'Table Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'columns',
        type: 'TableColumn<T>[]',
        defaultValue: '-',
        values: "[{ key, title, dataIndex?, width?, render? }]",
        description: '列定义。',
      },
      {
        prop: 'dataSource',
        type: 'T[]',
        defaultValue: '-',
        values: '数组',
        description: '数据源。',
      },
      {
        prop: 'rowKey',
        type: '(record, index) => string',
        defaultValue: '-',
        values: '函数',
        description: '行 key 生成器。',
      },
      {
        prop: 'emptyText',
        type: 'string',
        defaultValue: 'No Data',
        values: '任意字符串',
        description: '空态文案。',
      },
    ],
  },
  TextField: {
    title: 'TextField Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'text',
        type: 'Binding<string>',
        defaultValue: '-',
        values: '{ value, setValue }',
        description: '输入值 binding。',
      },
      {
        prop: 'placeholder',
        type: 'string',
        defaultValue: '-',
        values: '任意字符串',
        description: '占位文本。',
      },
      {
        prop: 'textFieldStyle',
        type: 'TextFieldStyleToken',
        defaultValue: 'roundedBorder',
        values: 'roundedBorder',
        description: '当前仅支持圆角边框输入框。',
      },
    ],
  },
  TextEditor: {
    title: 'TextEditor Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'text',
        type: 'Binding<string>',
        defaultValue: '-',
        values: '{ value, setValue }',
        description: '多行文本 binding。',
      },
    ],
  },
  VStack: {
    title: 'VStack Props',
    rows: [...viewBaseProps, ...stackProps],
  },
  HStack: {
    title: 'HStack Props',
    rows: [...viewBaseProps, ...stackProps],
  },
  Spacer: {
    title: 'Spacer Props',
    rows: [
      {
        prop: 'minLength',
        type: 'number',
        defaultValue: '0',
        values: '任意数字',
        description: '最小占位长度；横向栈下表现为 minWidth，纵向栈下表现为 minHeight。',
      },
    ],
  },
  Divider: {
    title: 'Divider Props',
    rows: [
      {
        prop: 'axis',
        type: 'Axis',
        defaultValue: 'horizontal',
        values: 'horizontal | vertical',
        description: '分隔线方向。',
      },
    ],
  },
  ScrollView: {
    title: 'ScrollView Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'axes',
        type: 'Axis | Axis[]',
        defaultValue: 'vertical',
        values: 'horizontal | vertical | [horizontal, vertical]',
        description: '滚动方向。',
      },
      {
        prop: 'children',
        type: 'ReactNode',
        defaultValue: '-',
        values: '任意 JSX',
        description: '滚动内容。',
      },
    ],
  },
  LazyHStack: {
    title: 'LazyHStack Props',
    rows: [...viewBaseProps, ...stackProps],
  },
  LazyVGrid: {
    title: 'LazyVGrid Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'columns',
        type: 'GridItemSpec[]',
        defaultValue: '-',
        values:
          "[{ size: { kind: 'fixed', width } | { kind: 'flexible', minimum?, maximum? } | { kind: 'adaptive', minimum, maximum? }, spacing? }]",
        description: '列定义。当前最稳的是 repeated flexible/fixed。',
      },
      {
        prop: 'spacing',
        type: 'number',
        defaultValue: '8',
        values: '任意数字',
        description: '网格项间距。',
      },
      {
        prop: 'children',
        type: 'ReactNode',
        defaultValue: '-',
        values: '任意 JSX',
        description: '网格项内容。',
      },
    ],
  },
  Sheet: {
    title: 'Sheet Props',
    rows: [
      {
        prop: 'isPresented',
        type: 'Binding<boolean>',
        defaultValue: '-',
        values: '{ value, setValue }',
        description: '控制显示/关闭。',
      },
      {
        prop: 'children',
        type: 'ReactNode',
        defaultValue: '-',
        values: '任意 JSX',
        description: '弹层内容。',
      },
    ],
  },
  ContextMenu: {
    title: 'ContextMenu Props',
    rows: [
      {
        prop: 'items',
        type: 'Array<{ title; onPress?; disabled? }>',
        defaultValue: '-',
        values: '数组',
        description: '右键菜单项。',
      },
      {
        prop: 'children',
        type: 'ReactElement',
        defaultValue: '-',
        values: '单个 JSX 元素',
        description: '触发右键菜单的元素。',
      },
    ],
  },
  Menu: {
    title: 'Menu Props',
    rows: [
      {
        prop: 'items',
        type: 'Array<{ title; onPress?; disabled? }>',
        defaultValue: '-',
        values: '数组',
        description: '菜单项。',
      },
      {
        prop: 'children',
        type: 'ReactElement',
        defaultValue: '-',
        values: '单个 JSX 元素',
        description: '点击后打开菜单的 label 视图。',
      },
    ],
  },
  TabView: {
    title: 'TabView Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'selection',
        type: 'Binding<T>',
        defaultValue: '-',
        values: 'T 为 string | number',
        description: '当前选中 tab。可不传，默认首项。',
      },
      {
        prop: 'children',
        type: 'Tab[]',
        defaultValue: '-',
        values: '<Tab tag=... title=... systemImage? />',
        description: 'tab 内容列表。',
      },
    ],
  },
  DisclosureGroup: {
    title: 'DisclosureGroup Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'title',
        type: 'string',
        defaultValue: '-',
        values: '任意字符串',
        description: '标题文案。',
      },
      {
        prop: 'isExpanded',
        type: 'Binding<boolean>',
        defaultValue: '-',
        values: '{ value, setValue }',
        description: '展开态 binding。不传则内部自管。',
      },
      {
        prop: 'children',
        type: 'ReactNode',
        defaultValue: '-',
        values: '任意 JSX',
        description: '折叠内容。',
      },
    ],
  },
  RoundedRectangle: {
    title: 'RoundedRectangle Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'fill',
        type: 'ForegroundStyleToken | MaterialToken',
        defaultValue: '-',
        values: 'primary | secondary | tertiary | red | blue | green | accentColor | thinMaterial | ultraThinMaterial',
        description: '形状填充。',
      },
      {
        prop: 'stroke',
        type: 'BorderSpec',
        defaultValue: '-',
        values: '{ color?, lineWidth?, dash? }',
        description: '描边设置。',
      },
      {
        prop: 'cornerRadius',
        type: 'number',
        defaultValue: '16',
        values: '任意数字',
        description: '圆角半径。',
      },
      {
        prop: 'children',
        type: 'ReactNode',
        defaultValue: '-',
        values: '任意 JSX',
        description: '容器内内容。',
      },
    ],
  },
  TokenColor: {
    title: 'ForegroundStyle Tokens',
    rows: [
      {
        prop: 'foregroundStyle',
        type: 'ForegroundStyleToken',
        defaultValue: '-',
        values: 'primary | secondary | tertiary | red | blue | green | accentColor',
        description: '文字和前景层使用的语义色。',
      },
      {
        prop: 'background.fill',
        type: 'ForegroundStyleToken | MaterialToken',
        defaultValue: '-',
        values: 'foreground token + thinMaterial | ultraThinMaterial',
        description: '背景填充常用值。',
      },
      {
        prop: 'foregroundColor',
        type: 'string',
        defaultValue: '-',
        values: 'hex | rgb(...) | rgba(...) | css color',
        description: '需要强制覆盖语义 token 时使用。',
      },
    ],
  },
  GeometryReader: {
    title: 'GeometryReader Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'children',
        type: '(proxy: { size: { width: number; height: number } }) => ReactNode',
        defaultValue: '-',
        values: '函数',
        description: '读取布局尺寸。当前 mock 固定返回 1280×800。',
      },
    ],
  },
  ScrollViewReader: {
    title: 'ScrollViewReader Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'children',
        type: "(proxy: { scrollTo: (id: string, options?: { anchor?: 'top' | 'center' | 'bottom' }) => void }) => ReactNode",
        defaultValue: '-',
        values: '函数',
        description: '当前 mock 暴露 `scrollTo` 接口。',
      },
    ],
  },
  DropArea: {
    title: 'DropArea Props',
    rows: [
      ...viewBaseProps,
      {
        prop: 'isTargeted',
        type: 'Binding<boolean>',
        defaultValue: '-',
        values: '{ value, setValue }',
        description: '拖拽命中态 binding。',
      },
      {
        prop: 'onDrop',
        type: '() => void',
        defaultValue: '-',
        values: '函数',
        description: 'drop 回调。',
      },
      {
        prop: 'children',
        type: 'ReactNode',
        defaultValue: '-',
        values: '任意 JSX',
        description: '拖放区域内容。',
      },
    ],
  },
  WindowAccessor: {
    title: 'WindowAccessor Props',
    rows: [
      {
        prop: 'onResolve',
        type: '(window: { title: string }) => void',
        defaultValue: '-',
        values: '函数',
        description: '拿到 mock window 对象。当前只提供 `title`。',
      },
    ],
  },
}

const headerCell = (title: string, width: number) => {
  return (
    <Text font="caption.semibold" frame={{ width, alignment: 'leading' }}>
      {title}
    </Text>
  )
}

const bodyCell = (value: string, width: number, monospaced?: boolean) => {
  return (
    <Text
      font={monospaced ? 'caption2.monospaced' : 'caption'}
      foregroundStyle={monospaced ? undefined : 'secondary'}
      textSelection={monospaced ? 'enabled' : undefined}
      frame={{ width, alignment: 'leading' }}
    >
      {value}
    </Text>
  )
}

export const ComponentPropsTable: FC<{
  component: ComponentDocKey
}> = ({ component }) => {
  const entry = docs[component]

  return (
    <FormSection title={entry.title}>
      <Text foregroundStyle="secondary">页底参数表。用于对齐 SwiftUI 语义、默认值与枚举面。</Text>
      <ScrollView axes="horizontal" frame={{ maxWidth: 'infinity' }}>
        <VStack spacing={0} frame={{ width: 1320, alignment: 'leading' }}>
          <HStack
            spacing={12}
            padding={{ horizontal: 12, vertical: 10 }}
            frame={{ maxWidth: 'infinity', alignment: 'leading' }}
            background={{ fill: 'ultraThinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
          >
            {headerCell('Prop', 150)}
            {headerCell('Type', 280)}
            {headerCell('Default', 120)}
            {headerCell('Values', 330)}
            {headerCell('Description', 380)}
          </HStack>
          <Divider />
          {entry.rows.map(row => (
            <VStack key={`${component}-${row.prop}`} spacing={0} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              <HStack spacing={12} padding={{ horizontal: 12, vertical: 10 }} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
                {bodyCell(row.prop, 150, true)}
                {bodyCell(row.type, 280, true)}
                {bodyCell(row.defaultValue ?? '-', 120, true)}
                {bodyCell(row.values ?? '-', 330, true)}
                {bodyCell(row.description, 380, false)}
              </HStack>
              <Divider />
            </VStack>
          ))}
        </VStack>
      </ScrollView>
    </FormSection>
  )
}
