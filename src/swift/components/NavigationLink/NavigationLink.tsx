import type { FC, ReactNode } from 'react'
import { useContext, useEffect } from 'react'
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

  useEffect(() => {
    if (!value || !destination || !navigation) {
      return
    }
    navigation.register(value, destination, { title: destinationTitle ?? title ?? value })
  }, [destination, destinationTitle, navigation, title, value])

  return (
    <Button data-type="NavigationLink"
      buttonStyle="plain"
      onPress={() => {
        onNavigate?.()
        if (value && navigation) {
          navigation.pushValue(value, { title: destinationTitle ?? title ?? value })
          return
        }
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
