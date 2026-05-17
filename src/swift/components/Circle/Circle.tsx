import type { FC } from 'react'
import { surfaceColors, viewStyle } from '../runtime'
import type { ShapeProps } from '../Rectangle'

export const Circle: FC<ShapeProps> = ({ fill = 'accentColor', stroke, ...rest }) => {
  return (
    <div
      style={{
        ...viewStyle({
          ...rest,
          background: fill,
        }),
        borderRadius: '9999px',
        border: stroke
          ? `${stroke.lineWidth ?? 1}px ${stroke.dash?.length ? 'dashed' : 'solid'} ${stroke.color ?? surfaceColors.border}`
          : undefined,
      }}
    >
      {rest.children}
    </div>
  )
}
