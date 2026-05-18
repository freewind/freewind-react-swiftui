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
  tabBarHidden = false,
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
    <VStack data-type="TabView" spacing={12} alignment="leading" {...rest}>
      {tabBarHidden ? null : (
        <HStack
          spacing={6}
          padding={4}
          background={{ fill: 'tertiary', in: { kind: 'roundedRectangle', cornerRadius: 12 } }}
        >
          {tabs.map(tab => (
            <Button
              key={String(tab.props.tag)}
              buttonStyle={tab.props.tag === currentTag ? 'borderedProminent' : 'plain'}
              controlSize={rest.controlSize ?? 'small'}
              tint={rest.tint}
              onPress={() => setCurrentTag(tab.props.tag)}
              disabled={tab.props.disabled}
            >
              <HStack spacing={6}>
                {tab.props.systemImage ? <Image systemName={tab.props.systemImage}/> : null}
                <Text>{tab.props.title}</Text>
                {tab.props.badge != null ? (
                  <Text font="caption2.monospaced" foregroundStyle={tab.props.tag === currentTag ? 'primary' : 'secondary'}>
                    {String(tab.props.badge)}
                  </Text>
                ) : null}
              </HStack>
            </Button>
          ))}
        </HStack>
      )}
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
