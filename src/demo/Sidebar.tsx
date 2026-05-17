import type { FC } from 'react'
import { Button, FormSection, ScrollView, Text, type ThemeMode, useBinding, VStack } from '../swiftui'
import type { DemoHomeSection, DemoPage, DemoSection } from './model'

export const Sidebar: FC<{
  theme: ReturnType<typeof useBinding<ThemeMode>>
  section: ReturnType<typeof useBinding<DemoHomeSection>>
  currentPage: ReturnType<typeof useBinding<string>>
  pages: DemoPage[]
  onOpenNotes: () => void
  onOpenSection: (section: DemoSection) => void
}> = ({ section, currentPage, pages, onOpenNotes }) => {
  return (
    <VStack
      spacing={14}
      padding={16}
      frame={{ width: 280, maxHeight: 'infinity', alignment: 'topLeading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'rectangle' } }}
    >
      <VStack spacing={6} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text font="title3.semibold">Demo Hub</Text>
        <Text font="caption" foregroundStyle="secondary">
          {section.value}
        </Text>
      </VStack>

      <ScrollView frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
        <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {pages.map(page => (
            <Button
              key={page.id}
              title={page.title}
              onPress={() => currentPage.setValue(page.id)}
              buttonStyle={currentPage.value === page.id ? 'borderedProminent' : 'bordered'}
              frame={{ maxWidth: 'infinity', alignment: 'leading' }}
            />
          ))}
        </VStack>
      </ScrollView>

      <FormSection title="demo 原则">
        <VStack spacing={8} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text font="caption" foregroundStyle="secondary">
            只用项目 DSL，不写 raw CSS / DOM / 外部 UI 组件。
          </Text>
          <Button title="编辑说明" buttonStyle="plain" onPress={onOpenNotes} />
        </VStack>
      </FormSection>
    </VStack>
  )
}
