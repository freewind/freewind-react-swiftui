import type { FC } from 'react'
import type { ViewBaseProps } from '../View'


export const AnyView: FC<ViewBaseProps> = ({ children }) => {
  return <div data-type="AnyView" style={{ display: 'contents' }}>{children}</div>
}
