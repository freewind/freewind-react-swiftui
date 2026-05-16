import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type FC,
  type MouseEvent,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react'

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
type ButtonStyleToken = 'plain' | 'bordered' | 'borderedProminent' | 'borderless'
type ControlSizeToken = 'mini' | 'small' | 'regular' | 'large'
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

type ViewBaseProps = PropsWithChildren<{
  padding?: number | EdgeInsets
  frame?: FrameSpec
  background?: BackgroundSpec
  foregroundStyle?: ForegroundStyleToken
  foregroundColor?: string
  opacity?: number
  clipShape?: ShapeSpec
  overlay?: ReactNode
  disabled?: boolean
}>

type TextProps = ViewBaseProps & {
  font?: FontToken
  italic?: boolean
  monospaced?: boolean
  textSelection?: 'enabled' | 'disabled'
  multilineTextAlignment?: TextAlign
}

type StackProps = ViewBaseProps & {
  spacing?: number
  alignment?: StackAlignment
}

type ScrollViewProps = ViewBaseProps & {
  axes?: Axis | Axis[]
}

type ButtonProps = ViewBaseProps & {
  title?: string
  onPress?: () => void
  buttonStyle?: ButtonStyleToken
  controlSize?: ControlSizeToken
}

type SheetProps = {
  isPresented: Binding<boolean>
  children: ReactNode
}

type TextFieldProps = ViewBaseProps & {
  placeholder?: string
  text: Binding<string>
  textFieldStyle?: TextFieldStyleToken
}

type TextEditorProps = ViewBaseProps & {
  text: Binding<string>
}

type PickerOption<T extends string | number> = {
  label: string
  value: T
}

type PickerProps<T extends string | number> = ViewBaseProps & {
  selection: Binding<T>
  options: PickerOption<T>[]
  pickerStyle?: PickerStyleToken
}

type ImageProps = ViewBaseProps & {
  systemName?: string
  src?: string
  alt?: string
  resizable?: boolean
  scaledToFit?: boolean
}

type LabelProps = ViewBaseProps & {
  title: string
  systemImage?: string
}

type SpacerProps = {
  minLength?: number
}

type DividerProps = {
  axis?: Axis
}

type ForEachProps<T> = {
  each: T[]
  keyBy: (item: T, index: number) => string | number
  children: (item: T, index: number) => ReactNode
}

type ShapeProps = ViewBaseProps & {
  fill?: ForegroundStyleToken | MaterialToken
  stroke?: BorderSpec
  cornerRadius?: number
}

type ContextMenuItem = {
  title: string
  onPress?: () => void
  disabled?: boolean
}

type ContextMenuProps = {
  items: ContextMenuItem[]
  children: ReactElement
}

type WindowStyleProps = {
  minWidth?: number
  minHeight?: number
  theme?: ThemeMode
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

const themePalettes: Record<ThemeMode, Record<string, string>> = {
  light: {
    '--swui-app-bg': '#f3f3f5',
    '--swui-panel-bg': '#ffffff',
    '--swui-border': 'rgba(60, 60, 67, 0.16)',
    '--swui-primary-text': '#111111',
    '--swui-secondary-text': '#6e6e73',
    '--swui-tertiary-text': '#8e8e93',
    '--swui-accent': '#0a84ff',
    '--swui-red': '#ff3b30',
    '--swui-green': '#34c759',
    '--swui-blue': '#0a84ff',
    '--swui-material': 'rgba(255, 255, 255, 0.78)',
    '--swui-ultra-thin-material': 'rgba(255, 255, 255, 0.58)',
    '--swui-tertiary-fill': 'rgba(118, 118, 128, 0.12)',
    '--swui-input-bg': '#ffffff',
  },
  dark: {
    '--swui-app-bg': '#161618',
    '--swui-panel-bg': '#1f1f22',
    '--swui-border': 'rgba(84, 84, 88, 0.65)',
    '--swui-primary-text': '#f5f5f7',
    '--swui-secondary-text': '#a1a1aa',
    '--swui-tertiary-text': '#8e8e93',
    '--swui-accent': '#0a84ff',
    '--swui-red': '#ff453a',
    '--swui-green': '#32d74b',
    '--swui-blue': '#64d2ff',
    '--swui-material': 'rgba(44, 44, 46, 0.74)',
    '--swui-ultra-thin-material': 'rgba(58, 58, 60, 0.52)',
    '--swui-tertiary-fill': 'rgba(118, 118, 128, 0.24)',
    '--swui-input-bg': '#2c2c2e',
  },
}

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

const fontStyles: Record<FontToken, CSSProperties> = {
  largeTitle: { fontSize: 34, fontWeight: 700, lineHeight: '42px' },
  title: { fontSize: 28, fontWeight: 700, lineHeight: '36px' },
  title2: { fontSize: 22, fontWeight: 700, lineHeight: '30px' },
  title3: { fontSize: 20, fontWeight: 600, lineHeight: '28px' },
  'title3.semibold': { fontSize: 20, fontWeight: 600, lineHeight: '28px' },
  headline: { fontSize: 17, fontWeight: 600, lineHeight: '24px' },
  'headline.semibold': { fontSize: 17, fontWeight: 600, lineHeight: '24px' },
  subheadline: { fontSize: 15, fontWeight: 500, lineHeight: '22px' },
  body: { fontSize: 17, fontWeight: 400, lineHeight: '24px' },
  callout: { fontSize: 16, fontWeight: 400, lineHeight: '22px' },
  caption: { fontSize: 12, fontWeight: 400, lineHeight: '18px' },
  'caption.semibold': { fontSize: 12, fontWeight: 600, lineHeight: '18px' },
  footnote: { fontSize: 13, fontWeight: 400, lineHeight: '19px' },
  caption2: { fontSize: 11, fontWeight: 400, lineHeight: '16px' },
  'caption2.monospaced': {
    fontSize: 11,
    fontWeight: 400,
    lineHeight: '16px',
    fontFamily: '"SF Mono", Monaco, Consolas, monospace',
  },
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

const symbolMap: Record<string, string> = {
  xmark: '×',
  iphone: 'iPhone',
  laptopcomputer: 'Mac',
  'pin.fill': '●',
  photo: '▣',
  doc: '▤',
}

const disabledContext = createContext(false)

export const useBinding = <T,>(initialValue: T): Binding<T> => {
  const [value, setValue] = useState(initialValue)
  return useMemo(() => ({ value, setValue }), [value])
}

export const VStack: FC<StackProps> = ({ spacing = 0, alignment = 'center', children, ...rest }) => {
  return (
    <View
      {...rest}
      stack={{
        axis: 'vertical',
        gap: spacing,
        align: mapStackAlignment('vertical', alignment),
      }}
    >
      {children}
    </View>
  )
}

export const HStack: FC<StackProps> = ({ spacing = 0, alignment = 'center', children, ...rest }) => {
  return (
    <View
      {...rest}
      stack={{
        axis: 'horizontal',
        gap: spacing,
        align: mapStackAlignment('horizontal', alignment),
      }}
    >
      {children}
    </View>
  )
}

export const ZStack: FC<StackProps> = ({ alignment = 'center', children, ...rest }) => {
  return (
    <View
      {...rest}
      stack={{
        axis: 'z',
        align: mapFrameAlignment(alignment === 'center' ? 'center' : 'leading'),
      }}
    >
      {children}
    </View>
  )
}

export const View: FC<
  ViewBaseProps & {
    stack?: {
      axis: 'horizontal' | 'vertical' | 'z'
      gap?: number
      align?: string
    }
  }
> = ({ children, stack, overlay, disabled, ...rest }) => {
  const inheritedDisabled = useContext(disabledContext)
  const finalDisabled = inheritedDisabled || Boolean(disabled)
  const baseStyle = viewStyle(rest)
  const stackStyle = stackStyleFrom(stack)
  const containerStyle: CSSProperties = {
    ...baseStyle,
    ...stackStyle,
    position: 'relative',
    pointerEvents: finalDisabled ? 'none' : undefined,
    opacity: finalDisabled ? 0.55 : baseStyle.opacity,
  }

  return (
    <disabledContext.Provider value={finalDisabled}>
      <div style={containerStyle}>
        {children}
        {overlay ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            {overlay}
          </div>
        ) : null}
      </div>
    </disabledContext.Provider>
  )
}

export const Text: FC<TextProps> = ({
  children,
  font = 'body',
  italic,
  monospaced,
  textSelection,
  multilineTextAlignment,
  ...rest
}) => {
  const style: CSSProperties = {
    ...viewStyle(rest),
    ...fontStyles[font],
    fontStyle: italic ? 'italic' : undefined,
    fontFamily: monospaced ? '"SF Mono", Monaco, Consolas, monospace' : fontStyles[font].fontFamily,
    userSelect: textSelection === 'enabled' ? 'text' : undefined,
    textAlign: mapTextAlign(multilineTextAlignment),
  }
  return <div style={style}>{children}</div>
}

export const Button: FC<ButtonProps> = ({
  title,
  children,
  onPress,
  buttonStyle = 'plain',
  controlSize = 'regular',
  ...rest
}) => {
  const disabled = useContext(disabledContext) || Boolean(rest.disabled)
  const style = {
    ...buttonChrome(buttonStyle, controlSize, disabled),
    ...viewStyle(rest),
  }

  return (
    <button type="button" style={style} onClick={onPress} disabled={disabled}>
      {children ?? title}
    </button>
  )
}

export const ScrollView: FC<ScrollViewProps> = ({ axes = 'vertical', children, ...rest }) => {
  const normalized = Array.isArray(axes) ? axes : [axes]
  const style: CSSProperties = {
    ...viewStyle(rest),
    overflowX: normalized.includes('horizontal') ? 'auto' : 'hidden',
    overflowY: normalized.includes('vertical') ? 'auto' : 'hidden',
  }
  return <div style={style}>{children}</div>
}

export const LazyVStack: FC<StackProps> = props => {
  return <VStack {...props} />
}

export const Spacer: FC<SpacerProps> = ({ minLength = 0 }) => {
  return <div style={{ flex: 1, minWidth: minLength, minHeight: minLength }} />
}

export const Divider: FC<DividerProps> = ({ axis = 'horizontal' }) => {
  return (
    <div
      style={
        axis === 'horizontal'
          ? { height: 1, width: '100%', background: surfaceColors.border, flexShrink: 0 }
          : { width: 1, alignSelf: 'stretch', background: surfaceColors.border, flexShrink: 0 }
      }
    />
  )
}

export const TextField: FC<TextFieldProps> = ({ text, placeholder, textFieldStyle = 'roundedBorder', ...rest }) => {
  return (
    <input
      value={text.value}
      placeholder={placeholder}
      onChange={event => text.setValue(event.target.value)}
      style={{
        ...inputChrome(textFieldStyle),
        ...viewStyle(rest),
      }}
    />
  )
}

export const TextEditor: FC<TextEditorProps> = ({ text, ...rest }) => {
  return (
    <textarea
      value={text.value}
      onChange={event => text.setValue(event.target.value)}
      style={{
        ...inputChrome('roundedBorder'),
        ...viewStyle(rest),
        resize: 'none',
        minHeight: 120,
      }}
    />
  )
}

export const Picker = <T extends string | number>({
  selection,
  options,
  pickerStyle = 'segmented',
  ...rest
}: PickerProps<T>) => {
  if (pickerStyle !== 'segmented') {
    throw new Error(`Unsupported pickerStyle: ${pickerStyle}`)
  }

  return (
    <HStack
      spacing={4}
      padding={4}
      background={{ fill: 'tertiary', in: { kind: 'roundedRectangle', cornerRadius: 10 } }}
      {...rest}
    >
      {options.map(option => {
        const selected = selection.value === option.value
        return (
          <Button
            key={String(option.value)}
            title={option.label}
            buttonStyle={selected ? 'borderedProminent' : 'plain'}
            controlSize="small"
            onPress={() => selection.setValue(option.value)}
            frame={{ maxWidth: 'infinity' }}
          />
        )
      })}
    </HStack>
  )
}

export const Image: FC<ImageProps> = ({
  systemName,
  src,
  alt = '',
  scaledToFit,
  resizable,
  children,
  ...rest
}) => {
  const style: CSSProperties = {
    ...viewStyle(rest),
    objectFit: scaledToFit || resizable ? 'contain' : undefined,
    display: 'block',
  }

  if (src) {
    return <img src={src} alt={alt} style={style} />
  }

  return (
    <Text
      {...rest}
      font="caption"
      padding={{ horizontal: 8, vertical: 4 }}
      background={{ fill: 'tertiary', in: { kind: 'capsule' } }}
    >
      {children ?? symbolMap[systemName ?? ''] ?? systemName ?? 'image'}
    </Text>
  )
}

export const Label: FC<LabelProps> = ({ title, systemImage, ...rest }) => {
  return (
    <HStack spacing={8} {...rest}>
      {systemImage ? <Image systemName={systemImage} /> : null}
      <Text>{title}</Text>
    </HStack>
  )
}

export const Color: FC<ViewBaseProps & { tone?: ForegroundStyleToken }> = ({ tone = 'primary', ...rest }) => {
  return <View background={tone} {...rest} />
}

export const RoundedRectangle: FC<ShapeProps> = ({ cornerRadius = 16, fill, stroke, ...rest }) => {
  return (
    <ShapeView
      {...rest}
      shape={{ kind: 'roundedRectangle', cornerRadius }}
      fill={fill}
      stroke={stroke}
    />
  )
}

export const Capsule: FC<ShapeProps> = ({ fill, stroke, ...rest }) => {
  return <ShapeView {...rest} shape={{ kind: 'capsule' }} fill={fill} stroke={stroke} />
}

export const Rectangle: FC<ShapeProps> = ({ fill, stroke, ...rest }) => {
  return <ShapeView {...rest} shape={{ kind: 'rectangle' }} fill={fill} stroke={stroke} />
}

const ShapeView: FC<
  ShapeProps & {
    shape: ShapeSpec
  }
> = ({ shape, fill, stroke, ...rest }) => {
  const style: CSSProperties = {
    ...viewStyle({
      ...rest,
      background: fill
        ? {
            fill,
            in: shape,
          }
        : rest.background,
      clipShape: shape,
    }),
    border: stroke
      ? `${stroke.lineWidth ?? 1}px ${stroke.dash?.length ? 'dashed' : 'solid'} ${stroke.color ?? surfaceColors.border}`
      : undefined,
  }
  return <div style={style}>{rest.children}</div>
}

export const ForEach = <T,>({ each, keyBy, children }: ForEachProps<T>) => {
  return <>{each.map((item, index) => <FragmentKey key={keyBy(item, index)}>{children(item, index)}</FragmentKey>)}</>
}

const FragmentKey: FC<PropsWithChildren> = ({ children }) => <>{children}</>

export const If: FC<{ when: boolean; children: ReactNode }> = ({ when, children }) => {
  return when ? <>{children}</> : null
}

export const Sheet: FC<SheetProps> = ({ isPresented, children }) => {
  if (!isPresented.value) {
    return null
  }

  return (
    <div
      onClick={() => isPresented.setValue(false)}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        zIndex: 999,
      }}
    >
      <div onClick={stopClick} style={{ maxWidth: '100%', maxHeight: '100%' }}>
        {children}
      </div>
    </div>
  )
}

export const ContextMenu: FC<ContextMenuProps> = ({ items, children }) => {
  const [open, setOpen] = useState(false)
  const id = useId()
  const menu = open ? (
    <VStack
      spacing={4}
      padding={6}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 12 } }}
      frame={{ width: 180 }}
      overlay={null}
    >
      {items.map(item => (
        <Button
          key={`${id}-${item.title}`}
          title={item.title}
          onPress={() => {
            setOpen(false)
            item.onPress?.()
          }}
          disabled={item.disabled}
          buttonStyle="plain"
          padding={{ horizontal: 8, vertical: 6 }}
          frame={{ maxWidth: 'infinity', alignment: 'leading' }}
        />
      ))}
    </VStack>
  ) : null

  return (
    <div style={{ position: 'relative' }}>
      {cloneElement(children, {
        onContextMenu: (event: MouseEvent) => {
          event.preventDefault()
          setOpen(prev => !prev)
        },
      })}
      {open ? <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8 }}>{menu}</div> : null}
    </div>
  )
}

export const WindowGroup: FC<PropsWithChildren<WindowStyleProps>> = ({
  children,
  minWidth,
  minHeight,
  theme = 'light',
}) => {
  const vars = themePalettes[theme] as CSSProperties
  return (
    <div
      style={{
        ...vars,
        minWidth,
        minHeight,
        width: '100vw',
        height: '100vh',
        background: surfaceColors.appBg,
        color: textColorMap.primary,
        fontFamily:
          '"SF Pro Text", "SF Pro Display", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {children}
    </div>
  )
}

const stopClick = (event: MouseEvent<HTMLDivElement>) => {
  event.stopPropagation()
}

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

const buttonChrome = (
  buttonStyle: ButtonStyleToken,
  controlSize: ControlSizeToken,
  disabled: boolean,
): CSSProperties => {
  const sizes: Record<ControlSizeToken, CSSProperties> = {
    mini: { padding: '3px 8px', fontSize: 11, lineHeight: '16px' },
    small: { padding: '5px 10px', fontSize: 12, lineHeight: '18px' },
    regular: { padding: '7px 12px', fontSize: 13, lineHeight: '20px' },
    large: { padding: '9px 14px', fontSize: 15, lineHeight: '22px' },
  }

  const common: CSSProperties = {
    borderRadius: 10,
    border: '1px solid transparent',
    background: 'transparent',
    color: textColorMap.primary,
    cursor: disabled ? 'default' : 'pointer',
    transition: 'all 120ms ease-out',
    ...sizes[controlSize],
  }

  switch (buttonStyle) {
    case 'bordered':
      return { ...common, borderColor: surfaceColors.border, background: surfaceColors.panelBg }
    case 'borderedProminent':
      return { ...common, background: surfaceColors.accent, color: '#fff' }
    case 'borderless':
      return { ...common, padding: 0 }
    case 'plain':
    default:
      return common
  }
}

const mapTextAlign = (align?: TextAlign): CSSProperties['textAlign'] => {
  if (!align) {
    return undefined
  }
  if (align === 'leading') {
    return 'left'
  }
  if (align === 'trailing') {
    return 'right'
  }
  return 'center'
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

const stackStyleFrom = (
  stack?: {
    axis: 'horizontal' | 'vertical' | 'z'
    gap?: number
    align?: string
  },
): CSSProperties => {
  if (!stack) {
    return {}
  }

  if (stack.axis === 'z') {
    return {
      display: 'grid',
    }
  }

  return {
    display: 'flex',
    flexDirection: stack.axis === 'horizontal' ? 'row' : 'column',
    gap: stack.gap,
    alignItems: stack.align,
  }
}

const viewStyle = (props: Omit<ViewBaseProps, 'children'>): CSSProperties => {
  const style: CSSProperties = {
    boxSizing: 'border-box',
  }

  applyPadding(style, props.padding)
  applyFrame(style, props.frame)
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

const applyFrame = (style: CSSProperties, frame?: FrameSpec) => {
  if (!frame) {
    return
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

export type {
  Binding,
  BackgroundSpec,
  ButtonStyleToken,
  ControlSizeToken,
  FontToken,
  ForegroundStyleToken,
  FrameSpec,
  PickerOption,
  ShapeSpec,
  ThemeMode,
  TextFieldStyleToken,
  ViewBaseProps,
}
