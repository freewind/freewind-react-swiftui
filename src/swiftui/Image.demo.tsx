import type { FC } from 'react'
import { HStack, Image, useBinding, VStack } from './runtime'
import { FormSection } from './controls'
import { BoolField, PlaygroundSection, StringField, toBoolBinding, useBoolBinding } from './demo-playground'

export const ImageDemo: FC = () => {
  const systemName = useBinding('iphone')
  const resizable = useBoolBinding(false)
  const scaledToFit = useBoolBinding(false)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <HStack spacing={12}>
          <Image systemName="iphone" />
          <Image systemName="laptopcomputer" />
          <Image systemName="pin.fill" />
          <Image systemName="photo" />
          <Image systemName="doc" />
        </HStack>
      </FormSection>
      <PlaygroundSection
        title="Image Playground"
        preview={
          <Image
            systemName={systemName.value}
            resizable={toBoolBinding(resizable)}
            scaledToFit={toBoolBinding(scaledToFit)}
            padding={8}
            background={{ fill: 'tertiary', in: { kind: 'roundedRectangle', cornerRadius: 12 } }}
          />
        }
        form={
          <>
            <StringField label="systemName" binding={systemName} />
            <BoolField label="resizable" binding={resizable} />
            <BoolField label="scaledToFit" binding={scaledToFit} />
          </>
        }
      />
    </VStack>
  )
}
