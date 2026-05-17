import type { FC } from 'react'
import { FormSection, HStack, Text, type ThemeMode, useBinding, VStack, Button } from '../swiftui'
import type { DemoSection } from './model'
import { sectionEntries } from './model'
import { ButtonCard } from './shared'

export const HomePage: FC<{
  theme: ReturnType<typeof useBinding<ThemeMode>>
  onOpenSection: (section: DemoSection) => void
}> = ({ theme, onOpenSection }) => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <HStack
        padding={18}
        frame={{ maxWidth: 'infinity' }}
        background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
        spacing={14}
      >
        <VStack spacing={4} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text font="title2">Demo Home</Text>
          <Text foregroundStyle="secondary">
            先选入口，再看对应栏目。避免所有 demo 混在一层导航。
          </Text>
        </VStack>
        <Button title={theme.value === 'light' ? 'Light' : 'Dark'} buttonStyle="borderedProminent" />
      </HStack>

      <FormSection title="入口">
        <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {sectionEntries.map(entry => (
            <ButtonCard
              key={entry.id}
              title={entry.title}
              summary={entry.summary}
              buttonTitle="进入"
              onPress={() => onOpenSection(entry.id)}
            />
          ))}
        </VStack>
      </FormSection>
    </VStack>
  )
}
