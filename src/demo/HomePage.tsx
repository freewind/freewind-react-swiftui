import type { FC } from 'react'
import { FormSection, VStack } from '../swiftui'
import type { DemoSection } from './model'
import { sectionEntries } from './model'
import { ButtonCard } from './shared'

export const HomePage: FC<{
  onOpenSection: (section: DemoSection) => void
}> = ({ onOpenSection }) => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
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
