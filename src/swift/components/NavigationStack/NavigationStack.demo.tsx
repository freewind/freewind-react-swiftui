import type { FC } from 'react'
import { NavigationLink } from '../NavigationLink/NavigationLink'
import { NavigationStack } from './NavigationStack'
import { Toolbar } from '../Toolbar/Toolbar'
import { Button } from '../Button'
import { Text } from '../runtime'
import { VStack } from '../VStack'

const DetailPane: FC = () => {
  return (
    <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <Toolbar>
        <Button title="Archive" buttonStyle="bordered" />
        <Button title="Reply" buttonStyle="borderedProminent" />
      </Toolbar>
      <Text font="headline.semibold">Detail</Text>
      <Text foregroundStyle="secondary">NavigationLink.destination 已可推入本地栈。</Text>
    </VStack>
  )
}

export const NavigationStackDemo: FC = () => {
  return (
    <NavigationStack rootTitle="Inbox">
      <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <NavigationLink title="Open first message" destination={<DetailPane />} />
        <NavigationLink title="Open second message" destination={<DetailPane />} />
      </VStack>
    </NavigationStack>
  )
}
