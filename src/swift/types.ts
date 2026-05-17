import type { ReactNode } from 'react'
import type { ViewBaseProps } from './components/View/View'

export type Axis = 'horizontal' | 'vertical'

export type HorizontalAlignment = 'leading' | 'center' | 'trailing'

export type VerticalAlignment = 'top' | 'center' | 'bottom'

export type StackAlignment = HorizontalAlignment | VerticalAlignment

export type FrameAlignment =
  | 'center'
  | 'leading'
  | 'trailing'
  | 'top'
  | 'bottom'
  | 'topLeading'
  | 'topTrailing'
  | 'bottomLeading'
  | 'bottomTrailing'

export type ShapeName = 'roundedRectangle' | 'capsule' | 'rectangle'

export type FontToken =
  | 'largeTitle'
  | 'title'
  | 'title2'
  | 'title3'
  | 'headline'
  | 'subheadline'
  | 'body'
  | 'callout'
  | 'caption'
  | 'caption2'
  | 'footnote'
  | 'title3.semibold'
  | 'headline.semibold'
  | 'caption.semibold'
  | 'caption2.monospaced'

export type ForegroundStyleToken =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'red'
  | 'blue'
  | 'green'
  | 'accentColor'

export type MaterialToken = 'thinMaterial' | 'ultraThinMaterial'

export type ThemeMode = 'light' | 'dark'

export type PickerStyleToken = 'segmented'

export type TextFieldStyleToken = 'roundedBorder'

export type TextAlign = 'leading' | 'center' | 'trailing'

export type ControlSizeToken = 'mini' | 'small' | 'regular' | 'large'

export type TintValue = ForegroundStyleToken | string

export type EdgeInsets = {
  top?: number
  bottom?: number
  leading?: number
  trailing?: number
  horizontal?: number
  vertical?: number
}

export type FrameValue = number | 'infinity'

export type FrameSpec = {
  width?: FrameValue
  height?: FrameValue
  minWidth?: number
  maxWidth?: FrameValue
  minHeight?: number
  maxHeight?: FrameValue
  alignment?: FrameAlignment
}

export type ShapeSpec = {
  kind: ShapeName
  cornerRadius?: number
}

export type BackgroundSpec =
  | ForegroundStyleToken
  | MaterialToken
  | {
  fill: ForegroundStyleToken | MaterialToken
  in?: ShapeSpec
}

export type BorderSpec = {
  color?: string
  lineWidth?: number
  dash?: number[]
}

export type Binding<T> = {
  value: T
  setValue: (next: T) => void
}

export type TabProps<T extends string | number> = {
  tag: T
  title: string
  systemImage?: string
  badge?: string | number
  disabled?: boolean
  children: ReactNode
}

export type TabViewProps<T extends string | number> = ViewBaseProps & {
  selection?: Binding<T>
  tabBarHidden?: boolean
  children: ReactNode
}

export type EnvironmentValues = Record<string, unknown>

export type FocusedValues = Record<string, unknown>

export type NavigationPath = {
  items: unknown[]
}

export type ScrollPosition = {
  x?: number
  y?: number
  targetId?: string
}

export type ScrollTarget = {
  id: string
  anchor?: 'top' | 'center' | 'bottom'
}

export type FileDocument = {
  id: string
  fileName: string
  path: string
  mimeType: string
  data: string
}

export type ReferenceFileDocument = FileDocument

export type OpenUrlResult = 'handled' | 'discarded' | 'systemAction'

export type OpenURLAction = {
  callAsFunction: (url: string) => OpenUrlResult | Promise<OpenUrlResult>
}

export type ObservableObject<T extends object> = {
  value: T
  setValue: (updater: T | ((prev: T) => T)) => void
}

export type MockWindowInfo = {
  id: string
  title: string
  isKeyWindow: boolean
  defaultWidth?: number
  defaultHeight?: number
}

export type MockCommandGroup = {
  id: string
  title: string
  commandTitles: string[]
}

export type MockSceneInfo = {
  id: string
  role: 'windowApplication' | 'document' | 'settings'
  title?: string
}

export type MockSceneLifecycle = {
  phase: 'active' | 'inactive' | 'background'
  windows: MockWindowInfo[]
  commands: MockCommandGroup[]
  scenes: MockSceneInfo[]
}
