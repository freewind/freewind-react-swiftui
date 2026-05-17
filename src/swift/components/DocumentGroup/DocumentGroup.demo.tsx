import type { FC } from 'react'
import { FormSection } from '../../controls'
import { DocumentGroup } from './DocumentGroup'
import { Text } from '../runtime'
import { VStack } from '../VStack'

export const DocumentGroupDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="DocumentGroup">
        <DocumentGroup documentName="brief.md">
          <Text>Document scoped workspace shell.</Text>
        </DocumentGroup>
      </FormSection>
    </VStack>
  )
}
