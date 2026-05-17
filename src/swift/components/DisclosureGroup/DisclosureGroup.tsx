import type { FC } from 'react'
import { useState } from 'react'
import { Button } from '../Button'
import { HStack } from '../HStack'
import type { DisclosureGroupProps } from '../runtime'
import { Text } from '../Text'
import { VStack } from '../VStack'

export const DisclosureGroup: FC<DisclosureGroupProps> = ({ title, isExpanded, children, ...rest }) => {
  const [localExpanded, setLocalExpanded] = useState(false)
  const expanded = isExpanded ? isExpanded.value : localExpanded
  const setExpanded = isExpanded ? isExpanded.setValue : setLocalExpanded

  return (
    <VStack spacing={8} alignment="leading" {...rest}>
      <Button buttonStyle="plain" onPress={() => setExpanded(!expanded)} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <HStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text font="caption2.monospaced">{expanded ? '▾' : '▸'}</Text>
          <Text>{title ?? 'DisclosureGroup'}</Text>
        </HStack>
      </Button>
      {expanded ? (
        <VStack spacing={8} padding={{ leading: 20 }} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {children}
        </VStack>
      ) : null}
    </VStack>
  )
}
