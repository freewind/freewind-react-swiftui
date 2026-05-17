import type { FC } from 'react'
import type { ViewBaseProps } from '../runtime'

export const Scene: FC<ViewBaseProps> = ({ children }) => {
  return <>{children}</>
}
