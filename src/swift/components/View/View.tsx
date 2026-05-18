import {type CSSProperties, type FC, type PropsWithChildren, type ReactNode, useContext, useRef} from 'react'
import type { BackgroundSpec, ControlSizeToken, ForegroundStyleToken, FrameSpec, ShapeSpec, TintValue } from '../runtime'
import {disabledContext, parentStackAxisContext, viewStyle} from '../runtime'

export type ViewBaseProps = PropsWithChildren<{
  'data-type'?: string
  padding?: number | {
    top?: number
    bottom?: number
    leading?: number
    trailing?: number
    horizontal?: number
    vertical?: number
  }
  frame?: FrameSpec
  background?: BackgroundSpec
  foregroundStyle?: ForegroundStyleToken
  foregroundColor?: string
  tint?: TintValue
  opacity?: number
  lineLimit?: number
  labelsHidden?: boolean
  controlSize?: ControlSizeToken
  clipShape?: ShapeSpec
  overlay?: ReactNode
  disabled?: boolean
  onTapGesture?: () => void
  onLongPressGesture?: () => void
  onDragGesture?: (value: { translation: { x: number; y: number } }) => void
  onMagnificationGesture?: (scale: number) => void
  onRotationGesture?: (angle: number) => void
}>

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

export const View: FC<
  ViewBaseProps & {
  stack?: {
    axis: 'horizontal' | 'vertical' | 'z'
    gap?: number
    align?: string
  }
}
> = ({children, stack, overlay, disabled, ['data-type']: dataType = 'View', ...rest}) => {
  const inheritedDisabled = useContext(disabledContext)
  const parentStackAxis = useContext(parentStackAxisContext)
  const finalDisabled = inheritedDisabled || Boolean(disabled)
  const longPressTimerRef = useRef<number | null>(null)
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)
  const baseStyle = viewStyle(rest, parentStackAxis)
  const stackStyle = stackStyleFrom(stack)
  const fillsWidth = baseStyle.width !== undefined || baseStyle.maxWidth !== undefined || baseStyle.alignSelf === 'stretch'
  const fillsHeight = baseStyle.height !== undefined || baseStyle.maxHeight !== undefined
  const containerStyle: CSSProperties = {
    ...baseStyle,
    ...(stack && fillsWidth
      ? { width: baseStyle.width ?? '100%' }
      : null),
    ...(stack && fillsHeight
      ? { height: baseStyle.height ?? '100%' }
      : null),
    position: 'relative',
    pointerEvents: finalDisabled ? 'none' : undefined,
    opacity: finalDisabled ? 0.55 : baseStyle.opacity,
  }
  const contentStyle: CSSProperties = stack
    ? {
        ...stackStyle,
        minWidth: 0,
        minHeight: 0,
        ...(fillsWidth
          ? { width: '100%' }
          : null),
        ...(fillsHeight
          ? { height: '100%' }
          : null),
      }
    : { display: 'contents' }

  return (
    <disabledContext.Provider value={finalDisabled}>
      <parentStackAxisContext.Provider value={stack?.axis ?? parentStackAxis}>
        <div data-type={dataType} style={containerStyle}>
          <div
            style={contentStyle}
            onClick={() => rest.onTapGesture?.()}
            onMouseDown={event => {
              if (rest.onLongPressGesture) {
                longPressTimerRef.current = window.setTimeout(() => {
                  rest.onLongPressGesture?.()
                  longPressTimerRef.current = null
                }, 450)
              }
              if (rest.onDragGesture) {
                dragStartRef.current = {x: event.clientX, y: event.clientY}
              }
            }}
            onMouseMove={event => {
              if (!dragStartRef.current || !rest.onDragGesture) {
                return
              }
              rest.onDragGesture({
                translation: {
                  x: event.clientX - dragStartRef.current.x,
                  y: event.clientY - dragStartRef.current.y,
                },
              })
            }}
            onMouseUp={() => {
              if (longPressTimerRef.current != null) {
                window.clearTimeout(longPressTimerRef.current)
                longPressTimerRef.current = null
              }
              dragStartRef.current = null
            }}
            onMouseLeave={() => {
              if (longPressTimerRef.current != null) {
                window.clearTimeout(longPressTimerRef.current)
                longPressTimerRef.current = null
              }
              dragStartRef.current = null
            }}
            onWheel={event => {
              if (rest.onMagnificationGesture) {
                rest.onMagnificationGesture(Number((1 - event.deltaY / 1000).toFixed(3)))
              }
              if (rest.onRotationGesture) {
                rest.onRotationGesture(Number((-event.deltaY / 6).toFixed(2)))
              }
            }}
          >
            {children}
          </div>
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
