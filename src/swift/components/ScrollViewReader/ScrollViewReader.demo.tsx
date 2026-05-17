import type { FC } from 'react'
import { HStack, scrollPosition, ScrollViewReader, Spacer, Text, useBinding } from '../runtime'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import { Button } from '../Button'
import { VStack } from '../VStack'
import { FormSection } from '../FormSection'

export const ScrollViewReaderDemo: FC = () => {
  const position = useBinding(scrollPosition())

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <ScrollViewReader
          position={position}
          padding={12}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
          frame={{ maxWidth: 'infinity' }}
        >
          {proxy => (
            <HStack>
              <Text>ScrollViewReader mock</Text>
              <Spacer />
              <Button title="scrollTo(bottom)" buttonStyle="bordered" onPress={() => proxy.scrollTo('bottom', { anchor: 'bottom' })} />
            </HStack>
          )}
        </ScrollViewReader>
      </FormSection>
      <PlaygroundSection
        title="常见操作按钮"
        summary="当前 mock 支持 `scrollTo(id, anchor)`，这里展示 top/bottom 两种调用入口。"
        preview={
          <ScrollViewReader
            position={position}
            padding={12}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
            frame={{ maxWidth: 'infinity' }}
          >
            {proxy => (
              <HStack spacing={10}>
                <Text>ScrollViewReader mock</Text>
                <Spacer />
                <Button title="scrollTo(top)" buttonStyle="bordered" onPress={() => proxy.scrollTo('top', { anchor: 'top' })} />
                <Button title="scrollTo(bottom)" buttonStyle="bordered" onPress={() => proxy.scrollTo('bottom', { anchor: 'bottom' })} />
              </HStack>
            )}
          </ScrollViewReader>
        }
      />
      <Text font="caption2.monospaced" foregroundStyle="secondary">
        target: {position.value.targetId ?? 'none'}
      </Text>
      <ComponentPropsTable component="ScrollViewReader" />
    </VStack>
  )
}
