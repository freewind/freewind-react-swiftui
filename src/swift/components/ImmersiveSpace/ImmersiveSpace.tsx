import type { FC } from 'react'
import { ZStack } from '../runtime'
import type { StackProps } from '../VStack'

export const ImmersiveSpace: FC<StackProps> = ({ children, ...rest }) => {
  return (
    <ZStack
      frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}
      background="primary"
      foregroundColor="#ffffff"
      {...rest}
    >
      {children}
    </ZStack>
  )
}
