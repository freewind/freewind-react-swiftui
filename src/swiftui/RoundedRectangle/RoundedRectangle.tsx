import type { CSSProperties, FC } from 'react'
import { surfaceColors, type ShapeProps, viewStyle } from '../runtime'

export const RoundedRectangle: FC<ShapeProps> = ({ cornerRadius = 16, fill, stroke, ...rest }) => {
  const style: CSSProperties = {
    ...viewStyle({
      ...rest,
      background: fill
        ? {
            fill,
            in: { kind: 'roundedRectangle', cornerRadius },
          }
        : rest.background,
      clipShape: { kind: 'roundedRectangle', cornerRadius },
    }),
    border: stroke
      ? `${stroke.lineWidth ?? 1}px ${stroke.dash?.length ? 'dashed' : 'solid'} ${stroke.color ?? surfaceColors.border}`
      : undefined,
  }

  return <div style={style}>{rest.children}</div>
}
