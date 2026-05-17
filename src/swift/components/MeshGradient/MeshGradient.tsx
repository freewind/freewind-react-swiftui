import type { FC } from 'react'
import { type ViewBaseProps, viewStyle } from '../runtime'

export type MeshGradientProps = ViewBaseProps & {
  colors: string[]
}

export const MeshGradient: FC<MeshGradientProps> = ({ colors, ...rest }) => {
  const [first = '#7dd3fc', second = '#c084fc', third = '#f9a8d4'] = colors
  return (
    <div
      style={{
        ...viewStyle(rest),
        background: `radial-gradient(circle at 20% 20%, ${first}, transparent 45%), radial-gradient(circle at 80% 20%, ${second}, transparent 40%), radial-gradient(circle at 50% 80%, ${third}, transparent 45%), #111827`,
      }}
    >
      {rest.children}
    </div>
  )
}
