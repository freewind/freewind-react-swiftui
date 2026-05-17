import type { FC } from 'react'
import type { StackProps } from '../runtime'
import { VStack } from '../VStack'

export const Commands: FC<StackProps> = ({ spacing = 6, children, ...rest }) => {
  return (
    <VStack spacing={spacing} padding={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }} {...rest}>
      {children}
    </VStack>
  )
}
