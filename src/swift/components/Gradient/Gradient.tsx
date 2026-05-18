import type { FC } from 'react'
import { viewStyle } from '../runtime'
import type { ViewBaseProps } from '../View'

export type GradientProps = ViewBaseProps & {
  colors: string[]
  direction?: string
}

export const Gradient: FC<GradientProps> = ({ colors, direction = '135deg', ...rest }) => {
  return (
    <div data-type="Gradient"
      style={{
        ...viewStyle(rest),
        background: `linear-gradient(${direction}, ${colors.join(', ')})`,
      }}
    >
      {rest.children}
    </div>
  )
}
