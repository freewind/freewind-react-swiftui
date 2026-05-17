import type { FC } from 'react'
import { Button } from '../Button'
import { HStack } from '../HStack'
import type { NavigationLinkProps } from '../runtime'
import { Text } from '../Text'
import { VStack } from '../VStack'

export const NavigationLink: FC<NavigationLinkProps> = ({ title, onNavigate, children, ...rest }) => {
  return (
    <Button buttonStyle="plain" onPress={onNavigate} frame={{ maxWidth: 'infinity', alignment: 'leading' }} {...rest}>
      <HStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <VStack spacing={0} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {children ?? <Text>{title ?? 'NavigationLink'}</Text>}
        </VStack>
        <Text font="caption2.monospaced" foregroundStyle="tertiary">
          ›
        </Text>
      </HStack>
    </Button>
  )
}
