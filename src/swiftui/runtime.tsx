import {
  cloneElement,
  createContext,
  type CSSProperties,
  type FC,
  isValidElement,
  type MouseEvent,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  useContext,
  useId,
  useMemo,
  useState,
} from 'react'
import { Button } from './Button/Button'
import { DisclosureGroup } from './DisclosureGroup/DisclosureGroup'
import { Divider } from './Divider/Divider'
import { GeometryReader } from './GeometryReader/GeometryReader'
import { HStack } from './HStack/HStack'
import { Image } from './Image/Image'
import { Label } from './Label/Label'
import { LazyHStack } from './LazyHStack/LazyHStack'
import { LazyVGrid } from './LazyVGrid/LazyVGrid'
import { List } from './List/List'
import { NavigationLink } from './NavigationLink/NavigationLink'
import { Picker } from './Picker/Picker'
import { RoundedRectangle } from './RoundedRectangle/RoundedRectangle'
import { ScrollView } from './ScrollView/ScrollView'
import { ScrollViewReader } from './ScrollViewReader/ScrollViewReader'
import { Section } from './Section/Section'
import { Slider } from './Slider/Slider'
import { Spacer } from './Spacer/Spacer'
import { Stepper } from './Stepper/Stepper'
import { Table } from './Table/Table'
import { Text } from './Text/Text'
import { TextEditor } from './TextEditor/TextEditor'
import { TextField } from './TextField/TextField'
import { VStack } from './VStack/VStack'
import { WindowAccessor } from './WindowAccessor/WindowAccessor'

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
type ButtonStyleToken = 'plain' | 'bordered' | 'borderedProminent' | 'borderless' | 'link'
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

type GeometryProxy = {
  size: {
    width: number
    height: number
  }
}

type GeometryReaderProps = Omit<ViewBaseProps, 'children'> & {
  children: (proxy: GeometryProxy) => ReactNode
}

type ScrollViewReaderProps = Omit<ViewBaseProps, 'children'> & {
  children: (proxy: {
    scrollTo: (id: string, options?: { anchor?: 'top' | 'center' | 'bottom' }) => void
  }) => ReactNode
}

type ListProps = ViewBaseProps & {
  children: ReactNode
}

type SectionProps = ViewBaseProps & {
  title?: string
  header?: ReactNode
  footer?: ReactNode
}

type ToggleProps = ViewBaseProps & {
  isOn: Binding<boolean>
  title?: string
}


type ProgressViewProps = ViewBaseProps & {
  value?: number
  total?: number
  label?: string
  currentValueLabel?: string
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

type SliderProps = ViewBaseProps & {
  value: Binding<number>
  in?: [number, number]
  step?: number
}

type StepperProps = ViewBaseProps & {
  value: Binding<number>
  in?: [number, number]
  step?: number
  title?: string
}

type TableColumn<T> = {
  key: string
  title: string
  dataIndex?: keyof T
  width?: number
  render?: (record: T, index: number) => ReactNode
}

type TableProps<T> = ViewBaseProps & {
  columns: TableColumn<T>[]
  dataSource: T[]
  rowKey: (record: T, index: number) => string
  emptyText?: string
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

type GridItemSize =
  | {
      kind: 'fixed'
      width: number
    }
  | {
      kind: 'flexible'
      minimum?: number
      maximum?: number
    }
  | {
      kind: 'adaptive'
      minimum: number
      maximum?: number
    }

type GridItemSpec = {
  size: GridItemSize
  spacing?: number
}

type LazyVGridProps = ViewBaseProps & {
  columns: GridItemSpec[]
  spacing?: number
}

type DisclosureGroupProps = ViewBaseProps & {
  title?: string
  isExpanded?: Binding<boolean>
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

type NavigationLinkProps = ViewBaseProps & {
  title?: string
  onNavigate?: () => void
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

type MenuProps = {
  items: ContextMenuItem[]
  children: ReactElement
}

type PopoverProps = {
  isPresented: Binding<boolean>
  content: ReactNode
  children: ReactElement
}

type PopconfirmProps = {
  title: string
  description?: string
  onConfirm?: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  children: ReactElement
}

type DropAreaProps = ViewBaseProps & {
  isTargeted?: Binding<boolean>
  onDrop?: () => void
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

type WindowAccessorProps = {
  onResolve?: (window: { title: string }) => void
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
const parentStackAxisContext = createContext<'horizontal' | 'vertical' | 'z' | undefined>(undefined)

export const useBinding = <T,>(initialValue: T): Binding<T> => {
  const [value, setValue] = useState(initialValue)
  return useMemo(() => ({ value, setValue }), [value])
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
  const parentStackAxis = useContext(parentStackAxisContext)
  const finalDisabled = inheritedDisabled || Boolean(disabled)
  const baseStyle = viewStyle(rest, parentStackAxis)
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
      <parentStackAxisContext.Provider value={stack?.axis ?? parentStackAxis}>
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
      </parentStackAxisContext.Provider>
    </disabledContext.Provider>
  )
}

export const Toggle: FC<ToggleProps> = ({ isOn, title, children, ...rest }) => {
  return (
    <Button buttonStyle="plain" onPress={() => isOn.setValue(!isOn.value)} {...rest}>
      <HStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <HStack
          spacing={0}
          padding={3}
          frame={{ width: 42, height: 24 }}
          background={{ fill: isOn.value ? 'accentColor' : 'tertiary', in: { kind: 'capsule' } }}
        >
          {isOn.value ? <Spacer minLength={0} /> : null}
          <View
            frame={{ width: 18, height: 18 }}
            background={{ fill: 'primary', in: { kind: 'capsule' } }}
            foregroundColor="#ffffff"
            overlay={
              <Text font="caption2.monospaced" foregroundColor={isOn.value ? '#0a84ff' : '#8e8e93'}>
                {isOn.value ? '1' : '0'}
              </Text>
            }
          />
        </HStack>
        <Text>{children ?? title ?? 'Toggle'}</Text>
      </HStack>
    </Button>
  )
}

export const ProgressView: FC<ProgressViewProps> = ({
  value,
  total = 1,
  label,
  currentValueLabel,
  ...rest
}) => {
  const normalized = value === undefined ? 0.36 : Math.max(0, Math.min(1, total <= 0 ? 0 : value / total))
  return (
    <VStack spacing={8} alignment="leading" {...rest}>
      {label ? <Text>{label}</Text> : null}
      <div
        style={{
          width: '100%',
          height: 8,
          borderRadius: 9999,
          background: surfaceColors.tertiaryFill,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${String(normalized * 100)}%`,
            height: '100%',
            borderRadius: 9999,
            background: surfaceColors.accent,
            transition: 'width 160ms ease-out',
          }}
        />
      </div>
      {currentValueLabel ? (
        <Text font="caption" foregroundStyle="secondary">
          {currentValueLabel}
        </Text>
      ) : value !== undefined ? (
        <Text font="caption" foregroundStyle="secondary">
          {`${Math.round(normalized * 100)}%`}
        </Text>
      ) : (
        <Text font="caption" foregroundStyle="secondary">
          Loading…
        </Text>
      )}
    </VStack>
  )
}

export const LazyVStack: FC<StackProps> = props => {
  return <VStack {...props} />
}

export const Color: FC<ViewBaseProps & { tone?: ForegroundStyleToken }> = ({ tone = 'primary', ...rest }) => {
  return <View background={tone} {...rest} />
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

export const Menu: FC<MenuProps> = ({ items, children }) => {
  const [open, setOpen] = useState(false)
  const id = useId()
  const menu = open ? (
    <VStack
      spacing={4}
      padding={6}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 12 } }}
      frame={{ width: 180 }}
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
        onClick: (event: MouseEvent) => {
          event.preventDefault()
          event.stopPropagation()
          setOpen(prev => !prev)
        },
      })}
      {open ? <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 8, zIndex: 20 }}>{menu}</div> : null}
    </div>
  )
}

export const Popover: FC<PopoverProps> = ({ isPresented, content, children }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      {cloneElement(children, {
        onClick: (event: MouseEvent) => {
          event.preventDefault()
          event.stopPropagation()
          isPresented.setValue(!isPresented.value)
        },
      })}
      {isPresented.value ? (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: 8,
            zIndex: 20,
            minWidth: 220,
          }}
        >
          <VStack
            spacing={10}
            padding={14}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
            frame={{ maxWidth: 'infinity', alignment: 'leading' }}
          >
            {content}
          </VStack>
        </div>
      ) : null}
    </div>
  )
}

export const Popconfirm: FC<PopconfirmProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = '确定',
  cancelText = '取消',
  children,
}) => {
  const shown = useBinding(false)
  return (
    <Popover
      isPresented={shown}
      content={
        <VStack spacing={10} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text font="headline">{title}</Text>
          {description ? (
            <Text font="caption" foregroundStyle="secondary">
              {description}
            </Text>
          ) : null}
          <HStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'trailing' }}>
            <Spacer />
            <Button
              title={cancelText}
              buttonStyle="bordered"
              onPress={() => {
                shown.setValue(false)
                onCancel?.()
              }}
            />
            <Button
              title={confirmText}
              buttonStyle="borderedProminent"
              onPress={() => {
                shown.setValue(false)
                onConfirm?.()
              }}
            />
          </HStack>
        </VStack>
      }
    >
      {children}
    </Popover>
  )
}

export const Tab = <T extends string | number>({ children }: TabProps<T>) => {
  return <>{children}</>
}

export const TabView = <T extends string | number>({
  selection,
  children,
  ...rest
}: TabViewProps<T>) => {
  const tabs = (Array.isArray(children) ? children : [children]).filter(isValidElement) as Array<ReactElement<TabProps<T>>>
  const firstTag = tabs[0]?.props.tag
  const [localSelection, setLocalSelection] = useState<T | undefined>(firstTag)
  const currentTag = selection ? selection.value : localSelection
  const setCurrentTag = (next: T) => {
    if (selection) {
      selection.setValue(next)
      return
    }
    setLocalSelection(next)
  }
  const currentTab = tabs.find(tab => tab.props.tag === currentTag) ?? tabs[0]

  return (
    <VStack spacing={12} alignment="leading" {...rest}>
      <HStack
        spacing={6}
        padding={4}
        background={{ fill: 'tertiary', in: { kind: 'roundedRectangle', cornerRadius: 12 } }}
      >
        {tabs.map(tab => (
          <Button
            key={String(tab.props.tag)}
            buttonStyle={tab.props.tag === currentTag ? 'borderedProminent' : 'plain'}
            controlSize="small"
            onPress={() => setCurrentTag(tab.props.tag)}
          >
            <HStack spacing={6}>
              {tab.props.systemImage ? <Image systemName={tab.props.systemImage} /> : null}
              <Text>{tab.props.title}</Text>
            </HStack>
          </Button>
        ))}
      </HStack>
      <VStack
        spacing={10}
        padding={14}
        frame={{ maxWidth: 'infinity', alignment: 'leading' }}
        background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
      >
        {currentTab?.props.children}
      </VStack>
    </VStack>
  )
}

export const DropArea: FC<DropAreaProps> = ({ children, isTargeted, onDrop, ...rest }) => {
  const targeted = Boolean(isTargeted?.value)
  return (
    <View
      {...rest}
      overlay={
        targeted ? (
          <Text
            font="caption.semibold"
            padding={{ horizontal: 12, vertical: 8 }}
            background={{ fill: 'ultraThinMaterial', in: { kind: 'capsule' } }}
          >
            Drop Targeted
          </Text>
        ) : undefined
      }
    >
      <Button
        title="mock drop"
        buttonStyle="plain"
        onPress={() => {
          if (isTargeted) {
            isTargeted.setValue(!isTargeted.value)
          }
          onDrop?.()
        }}
      />
      {children}
    </View>
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

const gridTemplateColumns = (columns: GridItemSpec[]) => {
  return columns
    .map(column => {
      switch (column.size.kind) {
        case 'fixed':
          return `${String(column.size.width)}px`
        case 'adaptive':
          return `minmax(${String(column.size.minimum)}px, 1fr)`
        case 'flexible':
        default:
          return `minmax(${String(column.size.minimum ?? 0)}px, ${column.size.maximum ? `${String(column.size.maximum)}px` : '1fr'})`
      }
    })
    .join(' ')
}

const normalizeChildren = (children: ReactNode) => {
  if (Array.isArray(children)) {
    return children.filter(child => child !== null && child !== undefined && child !== false)
  }
  return children === null || children === undefined || children === false ? [] : [children]
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
    case 'link':
      return { ...common, color: surfaceColors.accent, padding: 0, border: 'none', background: 'transparent' }
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

export {
  buttonChrome,
  disabledContext,
  fontStyles,
  gridTemplateColumns,
  inputChrome,
  mapTextAlign,
  mapStackAlignment,
  normalizeChildren,
  parentStackAxisContext,
  stopClick,
  surfaceColors,
  symbolMap,
  textColorMap,
  viewStyle,
}

export {
  DisclosureGroup,
  Divider,
  GeometryReader,
  HStack,
  Image,
  Label,
  LazyHStack,
  LazyVGrid,
  List,
  NavigationLink,
  Picker,
  RoundedRectangle,
  ScrollView,
  ScrollViewReader,
  Section,
  Slider,
  Spacer,
  Stepper,
  Table,
  Text,
  TextEditor,
  TextField,
  WindowAccessor,
}

export type {
  Binding,
  BackgroundSpec,
  ButtonStyleToken,
  ControlSizeToken,
  DisclosureGroupProps,
  FontToken,
  ForegroundStyleToken,
  FrameSpec,
  GeometryReaderProps,
  GridItemSpec,
  GridItemSize,
  ImageProps,
  LabelProps,
  ListProps,
  ShapeProps,
  NavigationLinkProps,
  PopconfirmProps,
  PickerProps,
  PickerOption,
  PopoverProps,
  ScrollViewProps,
  ScrollViewReaderProps,
  ShapeSpec,
  SectionProps,
  SliderProps,
  SpacerProps,
  StackProps,
  StepperProps,
  TableColumn,
  TableProps,
  ThemeMode,
  ProgressViewProps,
  LazyVGridProps,
  MenuProps,
  TabProps,
  TabViewProps,
  TextAlign,
  TextEditorProps,
  TextFieldProps,
  TextProps,
  TextFieldStyleToken,
  ToggleProps,
  ViewBaseProps,
  DividerProps,
  WindowAccessorProps,
}
