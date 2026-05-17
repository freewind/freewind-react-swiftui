import type { CSSProperties, FC } from 'react'
import { type ViewBaseProps, viewStyle } from '../runtime'

export type GridProps = ViewBaseProps & {
  columns?: number
  spacing?: number
}

export const Grid: FC<GridProps> = ({ columns = 2, spacing = 12, children, ...rest }) => {
  const style: CSSProperties = {
    ...viewStyle(rest),
    display: 'grid',
    gridTemplateColumns: `repeat(${String(columns)}, minmax(0, 1fr))`,
    gap: spacing,
  }
  return <div style={style}>{children}</div>
}
