import type { FC } from 'react'
import type { ViewBaseProps } from '../View'


export const GridRow: FC<ViewBaseProps> = ({ children }) => {
  return <div style={{ display: 'contents' }}>{children}</div>
}
