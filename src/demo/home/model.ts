export type DemoCategory = 'components' | 'layouts' | 'apps'

export type DemoSection = DemoCategory | 'translator' | 'native-swift'

export type DemoHomeSection = DemoSection | 'home'

export type DemoIdName = {
  id: string
  title: string
  category: DemoCategory
  group?: string
}

export type SectionEntry = {
  id: DemoSection
  title: string
  summary: string
  defaultPageId: string
}

export { demoPages, groupPagesByCategory } from './demoPages'
export { isDemoCategory } from './isDemoCategory'

export const sectionEntries: SectionEntry[] = [
  {
    id: 'components',
    title: '组件',
    summary: 'SwiftUI/OpenSwiftUI 组件外观、参数、用法对齐。',
    defaultPageId: 'component-text',
  },
  {
    id: 'layouts',
    title: '布局',
    summary: '分栏、表单弹层、看板等组合布局样例。',
    defaultPageId: 'split-view',
  },
  {
    id: 'apps',
    title: '案例',
    summary: 'QQ、Todo、图片/文件浏览、系统 mock。',
    defaultPageId: 'qq',
  },
  {
    id: 'translator',
    title: '转换规约',
    summary: 'JSX 到 SwiftUI 的结构化导出与 draft 预览。',
    defaultPageId: 'translator',
  },
  {
    id: 'native-swift',
    title: '真实 Swift',
    summary: '真实 Swift 源与 mock 预览并排对照。',
    defaultPageId: 'native-swift',
  },
]
