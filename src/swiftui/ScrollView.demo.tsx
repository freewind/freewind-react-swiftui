import type { FC } from 'react'
import { HStack, ScrollView, VStack } from './runtime'
import { FormSection } from './controls'
import { PlaygroundSection } from './demo-playground'
import { ComponentPropsTable } from './props-table'
import { Chip, GalleryRow } from './demo-shared'

export const ScrollViewDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="纵向滚动">
        <ScrollView frame={{ height: 180, maxWidth: 'infinity' }}>
          <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <GalleryRow key={String(index)} title={`scroll row ${String(index + 1)}`} meta="vertical scroll content" />
            ))}
          </VStack>
        </ScrollView>
      </FormSection>
      <PlaygroundSection
        title="横向与长列表"
        summary="同页覆盖 horizontal axes 与更长的内容列表。"
        preview={
          <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <ScrollView axes="horizontal" frame={{ maxWidth: 'infinity' }}>
              <HStack spacing={10}>
                {['Inbox', 'Archive', 'Drafts', 'Pinned', 'Media', 'Files', 'Devices'].map(item => (
                  <Chip key={item} title={item} />
                ))}
              </HStack>
            </ScrollView>
            <ScrollView frame={{ height: 220, maxWidth: 'infinity' }}>
              <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <GalleryRow key={String(index)} title={`long row ${String(index + 1)}`} meta="more scroll content" />
                ))}
              </VStack>
            </ScrollView>
          </VStack>
        }
      />
      <ComponentPropsTable component="ScrollView" />
    </VStack>
  )
}
