import type { FC } from 'react'
import { gridTemplateColumns, type LazyVGridProps, viewStyle } from '../runtime'

export const LazyVGrid: FC<LazyVGridProps> = ({ columns, spacing = 8, children, ...rest }) => {
  return (
    <div
      style={{
        ...viewStyle(rest),
        display: 'grid',
        gridTemplateColumns: gridTemplateColumns(columns),
        gap: spacing,
      }}
    >
      {children}
    </div>
  )
}
