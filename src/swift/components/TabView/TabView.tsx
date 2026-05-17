import { isValidElement, type ReactElement, useState } from 'react'
import type { TabProps, TabViewProps } from '../../types'
import { Button } from '../Button'
import { HStack } from '../HStack'
import { Image } from '../Image'
import { Text } from '../Text'
import { VStack } from '../VStack'

export const TabView = <T extends string | number>({
  selection,
  children,
  ...rest
}: TabViewProps<T>) => {
  const tabs = (Array.isArray(children) ? children : [children]).filter(isValidElement) as Array<ReactElement<TabProps<T>>>
  const firstTag = tabs[0]?.props.tag
  const [localSelection, setLocalSelection] = useState<T | undefined>(firstTag)
  const currentTag = selection ? selection.value : localSelection
  const setCurrentTag = (next: T) => {
    if (selection) {
      selection.setValue(next)
      return
    }
    setLocalSelection(next)
  }
  const currentTab = tabs.find(tab => tab.props.tag === currentTag) ?? tabs[0]

  return (
    <VStack spacing={12} alignment="leading" {...rest}>
      <HStack
        spacing={6}
        padding={4}
        background={{ fill: 'tertiary', in: { kind: 'roundedRectangle', cornerRadius: 12 } }}
      >
        {tabs.map(tab => (
          <Button
            key={String(tab.props.tag)}
            buttonStyle={tab.props.tag === currentTag ? 'borderedProminent' : 'plain'}
            controlSize="small"
            onPress={() => setCurrentTag(tab.props.tag)}
          >
            <HStack spacing={6}>
              {tab.props.systemImage ? <Image systemName={tab.props.systemImage}/> : null}
              <Text>{tab.props.title}</Text>
            </HStack>
          </Button>
        ))}
      </HStack>
      <VStack
        spacing={10}
        padding={14}
        frame={{ maxWidth: 'infinity', alignment: 'leading' }}
        background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
      >
        {currentTab?.props.children}
      </VStack>
    </VStack>
  )
}
