import type { FC } from 'react'
import { ScrollView, useBinding, VStack } from './runtime'
import { FormSection } from './controls'
import { NumberField, PlaygroundSection, toNumber } from './demo-playground'
import { GalleryRow } from './demo-shared'

export const ScrollViewDemo: FC = () => {
  const rowCount = useBinding('8')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <ScrollView frame={{ height: 180, maxWidth: 'infinity' }}>
          <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <GalleryRow key={String(index)} title={`scroll row ${String(index + 1)}`} meta="vertical scroll content" />
            ))}
          </VStack>
        </ScrollView>
      </FormSection>
      <PlaygroundSection
        title="ScrollView Playground"
        preview={
          <ScrollView frame={{ height: 180, maxWidth: 'infinity' }}>
            <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              {Array.from({ length: Math.max(1, toNumber(rowCount.value, 8)) }).map((_, index) => (
                <GalleryRow key={String(index)} title={`scroll row ${String(index + 1)}`} meta="vertical scroll content" />
              ))}
            </VStack>
          </ScrollView>
        }
        form={<NumberField label="row count" binding={rowCount} />}
      />
    </VStack>
  )
}
