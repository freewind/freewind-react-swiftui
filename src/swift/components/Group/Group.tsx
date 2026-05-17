import type { FC } from 'react'
import type { ViewBaseProps } from '../runtime'

export const Group: FC<ViewBaseProps> = ({ children }) => {
  return <>{children}</>
}
