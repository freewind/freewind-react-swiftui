import {type CSSProperties, type FC, type PropsWithChildren, type ReactNode, useContext, useRef} from 'react'
import type { BackgroundSpec, ForegroundStyleToken, FrameSpec, ShapeSpec } from '../runtime'
import {disabledContext, parentStackAxisContext, viewStyle} from '../runtime'

export type ViewBaseProps = PropsWithChildren<{
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
  opacity?: number
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
> = ({children, stack, overlay, disabled, ...rest}) => {
  const inheritedDisabled = useContext(disabledContext)
  const parentStackAxis = useContext(parentStackAxisContext)
  const finalDisabled = inheritedDisabled || Boolean(disabled)
  const longPressTimerRef = useRef<number | null>(null)
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)
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
          <div
            style={{display: stack ? undefined : 'contents'}}
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
