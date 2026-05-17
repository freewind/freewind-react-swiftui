import type { FC } from 'react'
import type { ViewBaseProps } from '../runtime'

export const GridRow: FC<ViewBaseProps> = ({ children }) => {
  return <div style={{ display: 'contents' }}>{children}</div>
}
