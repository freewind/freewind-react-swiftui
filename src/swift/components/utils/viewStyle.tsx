import type { CSSProperties } from 'react'
import type { BackgroundSpec, ControlSizeToken, EdgeInsets, ForegroundStyleToken, FrameSpec, FrameValue, ShapeSpec, TintValue } from '../../types'
import type { ViewBaseProps } from '../View/View'
import { mapFrameAlignment } from '../ZStack/mapFrameAlignment'
import { surfaceColors } from './surfaceColors'
import { textColorMap } from './textColorMap'
import { isForegroundToken, materialValue } from './colorTokens'

const controlSizeFontMap: Record<ControlSizeToken, number> = {
  mini: 11,
  small: 12,
  regular: 13,
  large: 15,
}

const tintTokens: readonly ForegroundStyleToken[] = ['primary', 'secondary', 'tertiary', 'red', 'blue', 'green', 'accentColor']

const isTintToken = (value: TintValue): value is ForegroundStyleToken => {
  return (tintTokens as readonly string[]).includes(value)
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

const applyTint = (style: CSSProperties, tint?: TintValue) => {
  if (!tint) {
    return
  }
  style.accentColor = isTintToken(tint) ? textColorMap[tint] : tint
}

const applyLineLimit = (style: CSSProperties, lineLimit?: number) => {
  if (lineLimit === undefined) {
    return
  }
  if (lineLimit <= 1) {
    style.whiteSpace = 'nowrap'
    style.overflow = 'hidden'
    style.textOverflow = 'ellipsis'
    return
  }
  style.display = '-webkit-box'
  style.WebkitBoxOrient = 'vertical'
  style.WebkitLineClamp = String(lineLimit)
  style.overflow = 'hidden'
}

const applyControlSize = (style: CSSProperties, controlSize?: ControlSizeToken) => {
  if (!controlSize) {
    return
  }
  style.fontSize = controlSizeFontMap[controlSize]
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

export const viewStyle = (
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
  applyTint(style, props.tint)
  applyLineLimit(style, props.lineLimit)
  applyControlSize(style, props.controlSize)

  if (props.opacity !== undefined) {
    style.opacity = props.opacity
  }

  if (props.clipShape) {
    applyShape(style, props.clipShape)
    style.overflow = 'hidden'
  }

  return style
};
