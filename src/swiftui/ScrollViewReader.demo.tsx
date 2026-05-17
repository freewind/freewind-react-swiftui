import type { FC } from 'react'
import { Button, HStack, ScrollViewReader, Spacer, Text, VStack } from './runtime'
import { FormSection } from './controls'
import { PlaygroundSection } from './demo-playground'

export const ScrollViewReaderDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <ScrollViewReader
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
        title="ScrollViewReader Playground"
        preview={
          <ScrollViewReader
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
        }
        form={<Text foregroundStyle="secondary">当前支持面：`scrollTo(id, anchor)` mock</Text>}
      />
    </VStack>
  )
}
