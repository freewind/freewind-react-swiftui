import type { FC } from 'react'
import { LazyVGrid, Text, type GridItemSpec } from '../runtime'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import {VStack} from "../VStack";
import {FormSection} from "../FormSection";

const columns: GridItemSpec[] = Array.from({ length: 4 }).map(() => ({
  size: { kind: 'flexible', minimum: 120 },
  spacing: 8,
}))

export const LazyVGridDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="四列图片网格">
        <LazyVGrid columns={columns} spacing={8} frame={{ maxWidth: 'infinity' }} padding={12} background={{ fill: 'ultraThinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
          {Array.from({ length: 8 }).map((_, index) => (
            <VStack
              key={String(index)}
              spacing={6}
              padding={12}
              frame={{ minHeight: 96, alignment: 'leading' }}
              background={{ fill: index % 3 === 0 ? 'blue' : index % 3 === 1 ? 'green' : 'red', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
            >
              <Text font="headline" foregroundColor="#ffffff">item {String(index + 1)}</Text>
              <Text font="caption" foregroundColor="rgba(255,255,255,0.82)">grid cell</Text>
            </VStack>
          ))}
        </LazyVGrid>
      </FormSection>
      <PlaygroundSection
        title="原生附件墙语义"
        summary="对应 SwiftUI `LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 8), count: 4), spacing: 8)` 常见写法。"
        preview={
          <LazyVGrid columns={columns} spacing={8} frame={{ maxWidth: 'infinity' }} padding={12} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((item, index) => (
              <VStack
                key={item}
                padding={12}
                frame={{ minHeight: 82 }}
                background={{ fill: index % 2 === 0 ? 'blue' : 'green', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
              >
                <Text foregroundColor="#ffffff">{item}</Text>
              </VStack>
            ))}
          </LazyVGrid>
        }
      />
      <ComponentPropsTable component="LazyVGrid" />
    </VStack>
  )
}
