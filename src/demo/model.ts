export type DemoCategory = 'components' | 'layouts' | 'apps'

export type DemoSection = DemoCategory | 'translator' | 'native-swift'

export type DemoHomeSection = DemoSection | 'home'

export type DemoPage = {
  id: string
  title: string
  category: DemoCategory
}

export type DemoSectionEntry = {
  id: DemoSection
  title: string
  summary: string
  defaultPageId: string
}

export const demoPages: DemoPage[] = [
  { id: 'component-text', title: 'Text', category: 'components' },
  { id: 'component-button', title: 'Button', category: 'components' },
  { id: 'component-image', title: 'Image', category: 'components' },
  { id: 'component-label', title: 'Label', category: 'components' },
  { id: 'component-picker', title: 'Picker', category: 'components' },
  { id: 'component-text-field', title: 'TextField', category: 'components' },
  { id: 'component-text-editor', title: 'TextEditor', category: 'components' },
  { id: 'component-vstack', title: 'VStack', category: 'components' },
  { id: 'component-hstack', title: 'HStack', category: 'components' },
  { id: 'component-spacer', title: 'Spacer', category: 'components' },
  { id: 'component-divider', title: 'Divider', category: 'components' },
  { id: 'component-scroll-view', title: 'ScrollView', category: 'components' },
  { id: 'component-lazy-hstack', title: 'LazyHStack', category: 'components' },
  { id: 'component-sheet', title: 'Sheet', category: 'components' },
  { id: 'component-context-menu', title: 'ContextMenu', category: 'components' },
  { id: 'component-rounded-rectangle', title: 'RoundedRectangle', category: 'components' },
  { id: 'component-token-color', title: 'Token Color', category: 'components' },
  { id: 'component-geometry-reader', title: 'GeometryReader', category: 'components' },
  { id: 'component-scroll-view-reader', title: 'ScrollViewReader', category: 'components' },
  { id: 'component-drop-area', title: 'DropArea', category: 'components' },
  { id: 'component-window-accessor', title: 'WindowAccessor', category: 'components' },
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

export const sectionEntries: DemoSectionEntry[] = [
  { id: 'components', title: '组件展厅', summary: '按真实组件逐个看用法、静态例子、属性组合。', defaultPageId: 'component-text' },
  { id: 'layouts', title: '布局样例', summary: '看常见 split view、dashboard、sheet 等页面骨架。', defaultPageId: 'split-view' },
  { id: 'apps', title: '应用案例', summary: '看 QQ、todo、emoji、图片/文件浏览器、系统 mock。', defaultPageId: 'qq' },
  { id: 'translator', title: '转换规约', summary: '查看 JSX DSL 约束、映射、导出包摘要。', defaultPageId: 'translator' },
  { id: 'native-swift', title: '原生对照', summary: '对照现有 macOS SwiftUI 结构与已补 mock/runtime 能力。', defaultPageId: 'native-swift' },
]

export const todoItems = [
  { id: 't1', title: '收敛 SwiftUI JSX DSL', done: true, tag: 'arch' },
  { id: 't2', title: '补组件展厅', done: false, tag: 'demo' },
  { id: 't3', title: '整理 JSX -> SwiftUI prompt', done: false, tag: 'ai' },
  { id: 't4', title: '补文件拖拽模型', done: false, tag: 'macos' },
]

export const emojiGroups = [
  ['😀', '😄', '😁', '🥹', '😎', '🤖'],
  ['🍎', '🍇', '🍋', '🥑', '🍑', '🥝'],
  ['🚀', '🧩', '🎯', '🪄', '📁', '🖼️'],
]

export const imageItems = [
  { id: 'i1', title: '日出', tone: 'blue' as const, size: '1344×896' },
  { id: 'i2', title: '人物', tone: 'red' as const, size: '1024×1024' },
  { id: 'i3', title: '窗景', tone: 'green' as const, size: '1536×1024' },
  { id: 'i4', title: '静物', tone: 'secondary' as const, size: '1200×900' },
]

export const fileRows = [
  { id: 'f1', name: 'Documents', kind: 'folder', meta: '12 items' },
  { id: 'f2', name: 'Design', kind: 'folder', meta: '8 items' },
  { id: 'f3', name: 'README.md', kind: 'file', meta: '12 KB' },
  { id: 'f4', name: 'preview.png', kind: 'image', meta: '1.2 MB' },
  { id: 'f5', name: 'archive.zip', kind: 'file', meta: '88 MB' },
]

export const isDemoCategory = (value: DemoHomeSection): value is DemoCategory =>
  value === 'components' || value === 'layouts' || value === 'apps'
