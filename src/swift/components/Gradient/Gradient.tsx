import type { FC } from 'react'
import { type ViewBaseProps, viewStyle } from '../runtime'

export type GradientProps = ViewBaseProps & {
  colors: string[]
  direction?: string
}

export const Gradient: FC<GradientProps> = ({ colors, direction = '135deg', ...rest }) => {
  return (
    <div
      style={{
        ...viewStyle(rest),
        background: `linear-gradient(${direction}, ${colors.join(', ')})`,
      }}
    >
      {rest.children}
    </div>
  )
}
