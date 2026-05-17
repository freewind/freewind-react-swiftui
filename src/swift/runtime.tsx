import {
  createContext,
  type CSSProperties,
  isValidElement,
  type ReactNode,
} from 'react'
import type { ViewBaseProps } from './components/View/View'

type Axis = 'horizontal' | 'vertical'
type HorizontalAlignment = 'leading' | 'center' | 'trailing'
type VerticalAlignment = 'top' | 'center' | 'bottom'
type StackAlignment = HorizontalAlignment | VerticalAlignment
type FrameAlignment =
  | 'center'
  | 'leading'
  | 'trailing'
  | 'top'
  | 'bottom'
  | 'topLeading'
  | 'topTrailing'
  | 'bottomLeading'
  | 'bottomTrailing'
type ShapeName = 'roundedRectangle' | 'capsule' | 'rectangle'
type FontToken =
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
type ForegroundStyleToken =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'red'
  | 'blue'
  | 'green'
  | 'accentColor'
type MaterialToken = 'thinMaterial' | 'ultraThinMaterial'
type ThemeMode = 'light' | 'dark'
type PickerStyleToken = 'segmented'
type TextFieldStyleToken = 'roundedBorder'
type TextAlign = 'leading' | 'center' | 'trailing'

type EdgeInsets = {
  top?: number
  bottom?: number
  leading?: number
  trailing?: number
  horizontal?: number
  vertical?: number
}

type FrameValue = number | 'infinity'

type FrameSpec = {
  width?: FrameValue
  height?: FrameValue
  minWidth?: number
  maxWidth?: FrameValue
  minHeight?: number
  maxHeight?: FrameValue
  alignment?: FrameAlignment
}

type ShapeSpec = {
  kind: ShapeName
  cornerRadius?: number
}

type BackgroundSpec =
  | ForegroundStyleToken
  | MaterialToken
  | {
      fill: ForegroundStyleToken | MaterialToken
      in?: ShapeSpec
    }

type BorderSpec = {
  color?: string
  lineWidth?: number
  dash?: number[]
}

type Binding<T> = {
  value: T
  setValue: (next: T) => void
}

type TabProps<T extends string | number> = {
  tag: T
  title: string
  systemImage?: string
  children: ReactNode
}

type TabViewProps<T extends string | number> = ViewBaseProps & {
  selection?: Binding<T>
  children: ReactNode
}

const surfaceColors = {
  appBg: 'var(--swui-app-bg)',
  panelBg: 'var(--swui-panel-bg)',
  border: 'var(--swui-border)',
  primaryText: 'var(--swui-primary-text)',
  secondaryText: 'var(--swui-secondary-text)',
  tertiaryText: 'var(--swui-tertiary-text)',
  accent: 'var(--swui-accent)',
  red: 'var(--swui-red)',
  green: 'var(--swui-green)',
  blue: 'var(--swui-blue)',
  material: 'var(--swui-material)',
  ultraThinMaterial: 'var(--swui-ultra-thin-material)',
  tertiaryFill: 'var(--swui-tertiary-fill)',
  inputBg: 'var(--swui-input-bg)',
} as const

const foregroundTokens: readonly ForegroundStyleToken[] = [
  'primary',
  'secondary',
  'tertiary',
  'red',
  'blue',
  'green',
  'accentColor',
]

const isForegroundToken = (value: ForegroundStyleToken | MaterialToken): value is ForegroundStyleToken => {
  return (foregroundTokens as readonly string[]).includes(value)
}

const textColorMap: Record<ForegroundStyleToken, string> = {
  primary: surfaceColors.primaryText,
  secondary: surfaceColors.secondaryText,
  tertiary: surfaceColors.tertiaryText,
  red: surfaceColors.red,
  blue: surfaceColors.blue,
  green: surfaceColors.green,
  accentColor: surfaceColors.accent,
}

const disabledContext = createContext(false)
const parentStackAxisContext = createContext<'horizontal' | 'vertical' | 'z' | undefined>(undefined)

const inputChrome = (_style: TextFieldStyleToken): CSSProperties => {
  return {
    width: '100%',
    borderRadius: 10,
    border: `1px solid ${surfaceColors.border}`,
    background: surfaceColors.inputBg,
    color: textColorMap.primary,
    padding: '10px 12px',
    fontSize: 15,
    lineHeight: '22px',
    boxSizing: 'border-box',
    outline: 'none',
  }
}

const mapFrameAlignment = (alignment?: FrameAlignment): string | undefined => {
  switch (alignment) {
    case 'leading':
      return 'flex-start center'
    case 'trailing':
      return 'flex-end center'
    case 'top':
      return 'center flex-start'
    case 'bottom':
      return 'center flex-end'
    case 'topLeading':
      return 'flex-start flex-start'
    case 'topTrailing':
      return 'flex-end flex-start'
    case 'bottomLeading':
      return 'flex-start flex-end'
    case 'bottomTrailing':
      return 'flex-end flex-end'
    case 'center':
    default:
      return 'center center'
  }
}

const mapStackAlignment = (axis: 'horizontal' | 'vertical', alignment: StackAlignment): string => {
  if (axis === 'vertical') {
    switch (alignment) {
      case 'leading':
        return 'flex-start'
      case 'trailing':
        return 'flex-end'
      default:
        return 'center'
    }
  }

  switch (alignment) {
    case 'top':
      return 'flex-start'
    case 'bottom':
      return 'flex-end'
    default:
      return 'center'
  }
}

const viewStyle = (
  props: Omit<ViewBaseProps, 'children'>,
  parentStackAxis?: 'horizontal' | 'vertical' | 'z',
): CSSProperties => {
  const style: CSSProperties = {
    boxSizing: 'border-box',
    minWidth: 0,
    minHeight: 0,
  }

  applyPadding(style, props.padding)
  applyFrame(style, props.frame, parentStackAxis)
  applyBackground(style, props.background)
  applyForeground(style, props.foregroundStyle, props.foregroundColor)

  if (props.opacity !== undefined) {
    style.opacity = props.opacity
  }

  if (props.clipShape) {
    applyShape(style, props.clipShape)
    style.overflow = 'hidden'
  }

  return style
}

const applyForeground = (
  style: CSSProperties,
  foregroundStyle?: ForegroundStyleToken,
  foregroundColor?: string,
) => {
  if (foregroundStyle) {
    style.color = textColorMap[foregroundStyle]
  }

  if (foregroundColor) {
    style.color = foregroundColor
  }
}

const applyPadding = (style: CSSProperties, padding?: number | EdgeInsets) => {
  if (padding === undefined) {
    return
  }

  if (typeof padding === 'number') {
    style.padding = padding
    return
  }

  style.paddingTop = padding.top ?? padding.vertical ?? 0
  style.paddingBottom = padding.bottom ?? padding.vertical ?? 0
  style.paddingLeft = padding.leading ?? padding.horizontal ?? 0
  style.paddingRight = padding.trailing ?? padding.horizontal ?? 0
}

const applyFrame = (
  style: CSSProperties,
  frame?: FrameSpec,
  parentStackAxis?: 'horizontal' | 'vertical' | 'z',
) => {
  if (!frame) {
    return
  }

  const expandAlongParentAxis = (axis: 'horizontal' | 'vertical') => {
    style.flexGrow = 1
    style.flexShrink = 1
    style.flexBasis = 0
    if (axis === 'horizontal') {
      style.minWidth = style.minWidth ?? 0
    } else {
      style.minHeight = style.minHeight ?? 0
    }
  }

  const stretchCrossAxis = (axis: 'horizontal' | 'vertical') => {
    style.alignSelf = 'stretch'
    if (axis === 'horizontal') {
      style.height = style.height ?? '100%'
    } else {
      style.width = style.width ?? '100%'
    }
  }

  const setLength = (key: keyof FrameSpec, value?: FrameValue | number) => {
    if (value === undefined) {
      return
    }
    const nextValue = value === 'infinity' ? '100%' : value
    switch (key) {
      case 'width':
        style.width = nextValue
        break
      case 'height':
        style.height = nextValue
        break
      case 'minWidth':
        style.minWidth = nextValue
        break
      case 'maxWidth':
        style.maxWidth = nextValue
        break
      case 'minHeight':
        style.minHeight = nextValue
        break
      case 'maxHeight':
        style.maxHeight = nextValue
        break
      default:
        break
    }
  }

  setLength('width', frame.width)
  setLength('height', frame.height)
  setLength('minWidth', frame.minWidth)
  setLength('minHeight', frame.minHeight)
  setLength('maxWidth', frame.maxWidth)
  setLength('maxHeight', frame.maxHeight)

  if (frame.maxWidth === 'infinity') {
    style.maxWidth = '100%'
    if (parentStackAxis === 'horizontal') {
      expandAlongParentAxis('horizontal')
    } else if (parentStackAxis === 'vertical') {
      stretchCrossAxis('vertical')
    } else {
      style.width = style.width ?? '100%'
    }
  }

  if (frame.maxHeight === 'infinity') {
    style.maxHeight = '100%'
    if (parentStackAxis === 'vertical') {
      expandAlongParentAxis('vertical')
    } else if (parentStackAxis === 'horizontal') {
      stretchCrossAxis('horizontal')
    } else {
      style.height = style.height ?? '100%'
    }
  }

  const alignment = mapFrameAlignment(frame.alignment)
  if (alignment) {
    const [justifyContent, alignItems] = alignment.split(' ')
    style.display = style.display ?? 'flex'
    style.justifyContent = justifyContent as CSSProperties['justifyContent']
    style.alignItems = alignItems as CSSProperties['alignItems']
  }
}

const applyBackground = (style: CSSProperties, background?: BackgroundSpec) => {
  if (!background) {
    return
  }

  if (typeof background === 'string') {
    if (isForegroundToken(background)) {
      style.background = background === 'tertiary' ? surfaceColors.tertiaryFill : textColorMap[background]
      return
    }
    style.background = materialValue(background)
    return
  }

  style.background = 'transparent'
  style.backdropFilter = background.fill.includes('Material') ? 'blur(18px)' : undefined
  style.backgroundColor = isForegroundToken(background.fill)
    ? background.fill === 'tertiary'
      ? surfaceColors.tertiaryFill
      : textColorMap[background.fill]
    : materialValue(background.fill)

  if (background.in) {
    applyShape(style, background.in)
  }
}

const materialValue = (material: MaterialToken) => {
  return material === 'ultraThinMaterial' ? surfaceColors.ultraThinMaterial : surfaceColors.material
}

const applyShape = (style: CSSProperties, shape: ShapeSpec) => {
  if (shape.kind === 'capsule') {
    style.borderRadius = 9999
    return
  }

  if (shape.kind === 'roundedRectangle') {
    style.borderRadius = shape.cornerRadius ?? 16
    return
  }

  style.borderRadius = 0
}

export const _internal = {
  isValidElement,
}

export * from './hooks/useBinding'
export * from './components'

export {
  disabledContext,
  inputChrome,
  mapFrameAlignment,
  mapStackAlignment,
  parentStackAxisContext,
  surfaceColors,
  textColorMap,
  viewStyle,
}

export type {
  Axis,
  BackgroundSpec,
  Binding,
  BorderSpec,
  EdgeInsets,
  FontToken,
  ForegroundStyleToken,
  FrameAlignment,
  FrameSpec,
  HorizontalAlignment,
  MaterialToken,
  PickerStyleToken,
  ShapeName,
  ShapeSpec,
  StackAlignment,
  TabProps,
  TabViewProps,
  TextAlign,
  TextFieldStyleToken,
  ThemeMode,
  VerticalAlignment,
}
