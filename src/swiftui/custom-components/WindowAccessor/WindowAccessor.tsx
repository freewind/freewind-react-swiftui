import type { FC } from 'react'
import type { WindowAccessorProps } from '../runtime'

export const WindowAccessor: FC<WindowAccessorProps> = ({ onResolve }) => {
  if (onResolve) {
    onResolve({ title: 'Mock Window' })
  }

  return null
}
