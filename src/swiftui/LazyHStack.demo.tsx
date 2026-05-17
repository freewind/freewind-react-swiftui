import type { FC } from 'react'
import { HStack, LazyHStack, ScrollView, VStack } from './runtime'
import { FormSection } from './controls'
import { PlaygroundSection } from './demo-playground'
import { Chip } from './demo-shared'

export const LazyHStackDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础横向懒加载行">
        <ScrollView axes="horizontal" frame={{ maxWidth: 'infinity' }}>
          <LazyHStack spacing={10}>
            <Chip title="LazyHStack" />
            <Chip title="Horizontal" />
            <Chip title="Scrollable" />
          </LazyHStack>
        </ScrollView>
      </FormSection>
      <PlaygroundSection
        title="紧凑与舒展"
        summary="展示 chip 流在不同 spacing 下的视觉密度。"
        preview={
          <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <ScrollView axes="horizontal" frame={{ maxWidth: 'infinity' }}>
              <LazyHStack spacing={6}>
                {['Dense', 'Quick', 'Compact', 'Tokens', 'Preview'].map(item => (
                  <Chip key={item} title={item} />
                ))}
              </LazyHStack>
            </ScrollView>
            <ScrollView axes="horizontal" frame={{ maxWidth: 'infinity' }}>
              <HStack spacing={0}>
                <LazyHStack spacing={16}>
                  {['Relaxed', 'Readable', 'SwiftUI', 'Compatible', 'Gallery'].map(item => (
                    <Chip key={item} title={item} />
                  ))}
                </LazyHStack>
              </HStack>
            </ScrollView>
          </VStack>
        }
      />
    </VStack>
  )
}
