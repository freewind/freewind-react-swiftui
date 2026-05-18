import type { FC } from 'react'
import type { ViewBaseProps } from '../View'


export const GridRow: FC<ViewBaseProps> = ({ children }) => {
  return <div data-type="GridRow" style={{ display: 'contents' }}>{children}</div>
}
