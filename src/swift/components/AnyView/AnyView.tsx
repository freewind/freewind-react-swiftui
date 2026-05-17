import type { FC } from 'react'
import type { ViewBaseProps } from '../runtime'

export const AnyView: FC<ViewBaseProps> = ({ children }) => {
  return <>{children}</>
}
