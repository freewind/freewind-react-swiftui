import type { FC } from 'react'
import { useContext } from 'react'
import { Button } from '../Button'
import { HStack } from '../HStack'
import { navigationStackContext } from '../NavigationStack/NavigationStack'
import type { NavigationLinkProps } from '../runtime'
import { Text } from '../Text'
import { VStack } from '../VStack'

export const NavigationLink: FC<NavigationLinkProps> = ({ title, onNavigate, destination, children, ...rest }) => {
  const navigation = useContext(navigationStackContext)
  return (
    <Button
      buttonStyle="plain"
      onPress={() => {
        onNavigate?.()
        if (destination && navigation) {
          navigation.push(destination)
        }
      }}
      frame={{ maxWidth: 'infinity', alignment: 'leading' }}
      {...rest}
    >
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
