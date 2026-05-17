import type { FC } from 'react'
import type { StackProps } from '../VStack'

import { VStack } from '../VStack'

export const Form: FC<StackProps> = ({ spacing = 12, padding = 16, children, ...rest }) => {
  return (
    <VStack
      spacing={spacing}
      padding={padding}
      frame={{ maxWidth: 'infinity', alignment: 'leading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
      {...rest}
    >
      {children}
    </VStack>
  )
}
