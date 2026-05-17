import type { FC, ReactNode } from 'react'
import { useContext } from 'react'
import { Button } from '../Button'
import { HStack } from '../HStack'
import { navigationStackContext } from '../NavigationStack/NavigationStack'
import type { ViewBaseProps } from '../View'

import { Text } from '../Text'
import { VStack } from '../VStack'

export type NavigationLinkProps = ViewBaseProps & {
  title?: string
  value?: string
  isDetailLink?: boolean
  onNavigate?: () => void
  destination?: ReactNode
  destinationTitle?: string
}


export const NavigationLink: FC<NavigationLinkProps> = ({
  title,
  value,
  onNavigate,
  destination,
  destinationTitle,
  children,
  ...rest
}) => {
  const navigation = useContext(navigationStackContext)
  return (
    <Button
      buttonStyle="plain"
      onPress={() => {
        onNavigate?.()
        if (destination && navigation) {
          navigation.push(destination, { title: destinationTitle ?? title ?? value })
        }
      }}
      frame={{ maxWidth: 'infinity', alignment: 'leading' }}
      {...rest}
    >
      <HStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <VStack spacing={0} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {children ?? <Text>{title ?? 'NavigationLink'}</Text>}
          {value ? (
            <Text font="caption" foregroundStyle="secondary">
              {value}
            </Text>
          ) : null}
        </VStack>
        <Text font="caption2.monospaced" foregroundStyle="tertiary">
          ›
        </Text>
      </HStack>
    </Button>
  )
}
