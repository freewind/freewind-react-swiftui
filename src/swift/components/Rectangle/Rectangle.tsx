import type { CSSProperties, FC } from 'react'
import { surfaceColors, viewStyle } from '../runtime'
import type { ForegroundStyleToken, ShapeSpec } from '../runtime'
import type { ViewBaseProps } from '../View'

export type ShapeProps = ViewBaseProps & {
  fill?: ForegroundStyleToken | 'thinMaterial' | 'ultraThinMaterial'
  stroke?: {
    color?: string
    lineWidth?: number
    dash?: number[]
  }
  cornerRadius?: number
}

export const ShapeView: FC<
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

export const Rectangle: FC<ShapeProps> = ({ fill, stroke, ...rest }) => {
  return <ShapeView {...rest} shape={{ kind: 'rectangle' }} fill={fill} stroke={stroke} />
}
