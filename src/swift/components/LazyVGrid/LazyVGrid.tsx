import type { FC } from 'react'
import { viewStyle } from '../runtime'
import type { ViewBaseProps } from '../View'


export type GridItemSize =
  | {
      kind: 'fixed'
      width: number
    }
  | {
      kind: 'flexible'
      minimum?: number
      maximum?: number
    }
  | {
      kind: 'adaptive'
      minimum: number
      maximum?: number
    }

export type GridItemSpec = {
  size: GridItemSize
  spacing?: number
}

export type LazyVGridProps = ViewBaseProps & {
  columns: GridItemSpec[]
  spacing?: number
}

const gridTemplateColumns = (columns: GridItemSpec[]) => {
  return columns
    .map(column => {
      switch (column.size.kind) {
        case 'fixed':
          return `${String(column.size.width)}px`
        case 'adaptive':
          return `minmax(${String(column.size.minimum)}px, 1fr)`
        case 'flexible':
        default:
          return `minmax(${String(column.size.minimum ?? 0)}px, ${column.size.maximum ? `${String(column.size.maximum)}px` : '1fr'})`
      }
    })
    .join(' ')
}

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
