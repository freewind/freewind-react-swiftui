import type { FC } from 'react'
import { DocumentGroup } from './DocumentGroup'
import { Text, useMockFileDocument } from '../runtime'
import { VStack } from '../VStack'
import { FormSection } from '../FormSection'

export const DocumentGroupDemo: FC = () => {
  const document = useMockFileDocument('/Downloads/mock-note.txt')
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="DocumentGroup">
        <DocumentGroup document={document ?? undefined}>
          <Text>Document scoped workspace shell.</Text>
        </DocumentGroup>
      </FormSection>
    </VStack>
  )
}
