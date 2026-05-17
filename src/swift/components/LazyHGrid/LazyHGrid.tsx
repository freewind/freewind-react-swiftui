import type { CSSProperties, FC } from 'react'
import { viewStyle } from '../runtime'
import type { ViewBaseProps } from '../View'

export type LazyHGridProps = ViewBaseProps & {
  rows?: number
  spacing?: number
}

export const LazyHGrid: FC<LazyHGridProps> = ({ rows = 2, spacing = 12, children, ...rest }) => {
  const style: CSSProperties = {
    ...viewStyle(rest),
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateRows: `repeat(${String(rows)}, minmax(0, 1fr))`,
    gap: spacing,
    overflowX: 'auto',
  }
  return <div style={style}>{children}</div>
}
