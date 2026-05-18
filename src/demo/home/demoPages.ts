import type { DemoCategory, DemoIdName } from './model'

type ComponentGroup =
  | '文本与内容'
  | '输入与操作'
  | '布局与容器'
  | '数据与集合'
  | '导航与弹层'
  | '图形与视觉'
  | '系统与运行时'

type DemoPage = DemoIdName & {
  group?: ComponentGroup
}

const titleCompare = (left: DemoPage, right: DemoPage) => {
  return left.title.localeCompare(right.title, 'en', { sensitivity: 'base', numeric: true })
}

const componentGroupOrder: ComponentGroup[] = [
  '文本与内容',
  '输入与操作',
  '布局与容器',
  '数据与集合',
  '导航与弹层',
  '图形与视觉',
  '系统与运行时',
]

const componentGroups: Record<ComponentGroup, DemoPage[]> = {
  文本与内容: [
    { id: 'component-any-view', title: 'AnyView', category: 'components' },
    { id: 'component-color', title: 'Color', category: 'components' },
    { id: 'component-group', title: 'Group', category: 'components' },
    { id: 'component-image', title: 'Image', category: 'components' },
    { id: 'component-label', title: 'Label', category: 'components' },
    { id: 'component-text', title: 'Text', category: 'components' },
    { id: 'component-token-color', title: 'Token Color', category: 'components' },
  ],
  输入与操作: [
    { id: 'component-button', title: 'Button', category: 'components' },
    { id: 'component-color-picker', title: 'ColorPicker', category: 'components' },
    { id: 'component-date-picker', title: 'DatePicker', category: 'components' },
    { id: 'component-edit-button', title: 'EditButton', category: 'components' },
    { id: 'component-gauge', title: 'Gauge', category: 'components' },
    { id: 'component-help-link', title: 'HelpLink', category: 'components' },
    { id: 'component-link', title: 'Link', category: 'components' },
    { id: 'component-paste-button', title: 'PasteButton', category: 'components' },
    { id: 'component-picker', title: 'Picker', category: 'components' },
    { id: 'component-progress-view', title: 'ProgressView', category: 'components' },
    { id: 'component-secure-field', title: 'SecureField', category: 'components' },
    { id: 'component-share-link', title: 'ShareLink', category: 'components' },
    { id: 'component-slider', title: 'Slider', category: 'components' },
    { id: 'component-stepper', title: 'Stepper', category: 'components' },
    { id: 'component-text-editor', title: 'TextEditor', category: 'components' },
    { id: 'component-text-field', title: 'TextField', category: 'components' },
    { id: 'component-toggle', title: 'Toggle', category: 'components' },
  ],
  布局与容器: [
    { id: 'component-control-group', title: 'ControlGroup', category: 'components' },
    { id: 'component-divider', title: 'Divider', category: 'components' },
    { id: 'component-form', title: 'Form', category: 'components' },
    { id: 'component-grid', title: 'Grid', category: 'components' },
    { id: 'component-grid-row', title: 'GridRow', category: 'components' },
    { id: 'component-group-box', title: 'GroupBox', category: 'components' },
    { id: 'component-hstack', title: 'HStack', category: 'components' },
    { id: 'component-lazy-hgrid', title: 'LazyHGrid', category: 'components' },
    { id: 'component-lazy-hstack', title: 'LazyHStack', category: 'components' },
    { id: 'component-lazy-vgrid', title: 'LazyVGrid', category: 'components' },
    { id: 'component-lazy-vstack', title: 'LazyVStack', category: 'components' },
    { id: 'component-scroll-view', title: 'ScrollView', category: 'components' },
    { id: 'component-scroll-view-reader', title: 'ScrollViewReader', category: 'components' },
    { id: 'component-section', title: 'Section', category: 'components' },
    { id: 'component-spacer', title: 'Spacer', category: 'components' },
    { id: 'component-tab-view', title: 'TabView', category: 'components' },
    { id: 'component-toolbar', title: 'Toolbar', category: 'components' },
    { id: 'component-vstack', title: 'VStack', category: 'components' },
    { id: 'component-zstack', title: 'ZStack', category: 'components' },
  ],
  数据与集合: [
    { id: 'component-document-group', title: 'DocumentGroup', category: 'components' },
    { id: 'component-for-each', title: 'ForEach', category: 'components' },
    { id: 'component-list', title: 'List', category: 'components' },
    { id: 'component-outline-group', title: 'OutlineGroup', category: 'components' },
    { id: 'component-table', title: 'Table', category: 'components' },
  ],
  导航与弹层: [
    { id: 'component-alert', title: 'Alert', category: 'components' },
    { id: 'component-commands', title: 'Commands', category: 'components' },
    { id: 'component-confirmation-dialog', title: 'ConfirmationDialog', category: 'components' },
    { id: 'component-context-menu', title: 'ContextMenu', category: 'components' },
    { id: 'component-disclosure-group', title: 'DisclosureGroup', category: 'components' },
    { id: 'component-full-screen-cover', title: 'FullScreenCover', category: 'components' },
    { id: 'component-menu', title: 'Menu', category: 'components' },
    { id: 'component-menu-bar-extra', title: 'MenuBarExtra', category: 'components' },
    { id: 'component-navigation-link', title: 'NavigationLink', category: 'components' },
    { id: 'component-navigation-stack', title: 'NavigationStack', category: 'components' },
    { id: 'component-popconfirm', title: 'Popconfirm', category: 'components' },
    { id: 'component-popover', title: 'Popover', category: 'components' },
    { id: 'component-sheet', title: 'Sheet', category: 'components' },
  ],
  图形与视觉: [
    { id: 'component-canvas', title: 'Canvas', category: 'components' },
    { id: 'component-capsule', title: 'Capsule', category: 'components' },
    { id: 'component-circle', title: 'Circle', category: 'components' },
    { id: 'component-gradient', title: 'Gradient', category: 'components' },
    { id: 'component-geometry-reader', title: 'GeometryReader', category: 'components' },
    { id: 'component-map', title: 'Map', category: 'components' },
    { id: 'component-mesh-gradient', title: 'MeshGradient', category: 'components' },
    { id: 'component-rectangle', title: 'Rectangle', category: 'components' },
    { id: 'component-rounded-rectangle', title: 'RoundedRectangle', category: 'components' },
  ],
  系统与运行时: [
    { id: 'component-drop-area', title: 'DropArea', category: 'components' },
    { id: 'component-immersive-space', title: 'ImmersiveSpace', category: 'components' },
    { id: 'component-runtime-state', title: 'Runtime State', category: 'components' },
    { id: 'component-scene', title: 'Scene', category: 'components' },
    { id: 'component-timeline-view', title: 'TimelineView', category: 'components' },
    { id: 'component-web-view', title: 'WebView', category: 'components' },
    { id: 'component-window-accessor', title: 'WindowAccessor', category: 'components' },
    { id: 'component-window-group', title: 'WindowGroup', category: 'components' },
  ],
}

const componentPages = componentGroupOrder.flatMap(group =>
  componentGroups[group]
    .slice()
    .sort(titleCompare)
    .map(page => ({ ...page, group })),
)

const otherPages: DemoPage[] = [
  { id: 'split-view', title: '分栏布局', category: 'layouts' },
  { id: 'dashboard', title: '看板布局', category: 'layouts' },
  { id: 'form-sheet', title: '表单弹层', category: 'layouts' },
  { id: 'qq', title: 'QQ 聊天', category: 'apps' },
  { id: 'todo', title: 'Todo List', category: 'apps' },
  { id: 'emoji', title: 'Emoji 选择器', category: 'apps' },
  { id: 'image-browser', title: '图片浏览器', category: 'apps' },
  { id: 'file-browser', title: '文件浏览器', category: 'apps' },
  { id: 'system-api', title: '系统 API Mock', category: 'apps' },
]

export const demoPages: DemoPage[] = [...componentPages, ...otherPages]

export const groupPagesByCategory = (pages: DemoPage[], category: DemoCategory) => {
  if (category !== 'components') {
    return [{ title: '', pages }]
  }

  return componentGroupOrder
    .map(group => ({
      title: group,
      pages: pages.filter(page => page.group === group),
    }))
    .filter(group => group.pages.length > 0)
}
