import type { FC } from 'react'
import type { StackProps } from '../VStack'
import { Text } from '../Text'
import { VStack } from '../VStack'

export type CommandsProps = StackProps & {
  title?: string
}

export const Commands: FC<CommandsProps> = ({ spacing = 6, title, children, ...rest }) => {
  return (
    <VStack spacing={spacing} padding={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }} {...rest}>
      {title ? (
        <Text font="caption.semibold" foregroundStyle="secondary">
          {title}
        </Text>
      ) : null}
      {children}
    </VStack>
  )
}
