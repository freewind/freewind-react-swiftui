import type { FC } from 'react'
import { TextField, useBinding, VStack } from './runtime'
import { FormSection } from './controls'
import { PlaygroundSection, StringField } from './demo-playground'

export const TextFieldDemo: FC = () => {
  const text = useBinding('freewind-mac')
  const placeholder = useBinding('input device name')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <TextField text={text} placeholder="input device name" textFieldStyle="roundedBorder" frame={{ maxWidth: 'infinity' }} />
      </FormSection>
      <PlaygroundSection
        title="TextField Playground"
        preview={<TextField text={text} placeholder={placeholder.value} textFieldStyle="roundedBorder" frame={{ maxWidth: 'infinity' }} />}
        form={
          <>
            <StringField label="text" binding={text} />
            <StringField label="placeholder" binding={placeholder} />
          </>
        }
      />
    </VStack>
  )
}
