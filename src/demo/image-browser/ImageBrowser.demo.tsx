import type { FC } from 'react'
import { FormSection, HStack, Text, VStack } from '../../swift'
import { imageItems } from './imageItems'

export function ImageBrowserDemo() {
  return (
    <FormSection title="Image Browser">
      <VStack spacing={14} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <HStack spacing={14}>
          {imageItems.slice(0, 2).map(item => (
            <ImageTile key={item.id} item={item} />
          ))}
        </HStack>
        <HStack spacing={14}>
          {imageItems.slice(2).map(item => (
            <ImageTile key={item.id} item={item} />
          ))}
        </HStack>
      </VStack>
    </FormSection>
  )
}

const ImageTile: FC<{
  item: {
    id: string
    title: string
    tone: 'blue' | 'red' | 'green' | 'secondary'
    size: string
  }
}> = ({ item }) => {
  return (
    <VStack
      spacing={10}
      padding={12}
      frame={{ width: 240, alignment: 'leading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
    >
      <VStack
        frame={{ width: 'infinity', height: 160 }}
        background={{ fill: item.tone, in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
      >
        <Text font="title2" foregroundColor="#ffffff">
          {item.title}
        </Text>
      </VStack>
      <Text font="headline">{item.title}</Text>
      <Text font="caption" foregroundStyle="secondary">
        {item.size}
      </Text>
    </VStack>
  )
}
