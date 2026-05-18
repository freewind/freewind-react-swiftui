import type { FC } from 'react'
import type { ViewBaseProps } from '../View'


export const Group: FC<ViewBaseProps> = ({ children }) => {
  return <div data-type="Group" style={{ display: 'contents' }}>{children}</div>
}
