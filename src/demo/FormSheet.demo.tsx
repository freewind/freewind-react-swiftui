import type { FC } from 'react'
import { Button, HStack, Sheet, Spacer, Text, TextEditor, TextFieldRow, useBinding, VStack, FormSection } from '../swift'

export const FormSheetDemo: FC = () => {
  const profileName = useBinding('freewind')
  const profileBio = useBinding('喜欢先用 React 热更调 SwiftUI UI。')
  const sheetPresented = useBinding(false)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Form Layout">
        <VStack spacing={12} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <TextFieldRow label="username" text={profileName} placeholder="freewind" />
          <VStack spacing={6} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Text font="caption" foregroundStyle="secondary">bio</Text>
            <TextEditor text={profileBio} frame={{ height: 120, maxWidth: 'infinity' }} />
          </VStack>
          <HStack>
            <Spacer />
            <Button title="Preview Sheet" buttonStyle="borderedProminent" onPress={() => sheetPresented.setValue(true)} />
          </HStack>
        </VStack>
      </FormSection>

      <Sheet isPresented={sheetPresented}>
        <VStack
          spacing={14}
          padding={20}
          frame={{ width: 420, height: 250 }}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 20 } }}
        >
          <Text font="headline">Profile Preview</Text>
          <Text>{profileName.value}</Text>
          <Text foregroundStyle="secondary">{profileBio.value}</Text>
          <HStack>
            <Spacer />
            <Button title="Done" buttonStyle="borderedProminent" onPress={() => sheetPresented.setValue(false)} />
          </HStack>
        </VStack>
      </Sheet>
    </VStack>
  )
}
