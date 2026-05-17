import type { FC } from 'react'
import { Button, Divider, FormSection, HStack, Spacer, Text, VStack } from '../swift'

export const SplitViewDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Classic Split View">
        <HStack spacing={0} frame={{ maxWidth: 'infinity', minHeight: 380 }}>
          <VStack
            spacing={8}
            padding={14}
            frame={{ width: 240, maxHeight: 'infinity', alignment: 'leading' }}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
          >
            <Text font="headline">Sidebar</Text>
            <Button title="Inbox" buttonStyle="borderedProminent" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
            <Button title="Archive" buttonStyle="bordered" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
            <Button title="Drafts" buttonStyle="bordered" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
          </VStack>
          <Divider axis="vertical" />
          <VStack
            spacing={12}
            padding={18}
            frame={{ maxWidth: 'infinity', maxHeight: 'infinity', alignment: 'leading' }}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
          >
            <Text font="title3.semibold">Detail Panel</Text>
            <Text foregroundStyle="secondary">常见三段：toolbar / content / footer。适合 mail、chat、file browser。</Text>
            <Spacer />
            <HStack>
              <Button title="Cancel" buttonStyle="bordered" />
              <Button title="Save" buttonStyle="borderedProminent" />
            </HStack>
          </VStack>
        </HStack>
      </FormSection>
    </VStack>
  )
}
