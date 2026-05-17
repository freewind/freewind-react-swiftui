import type { FC } from 'react'
import { Button, useBinding, VStack, type ButtonStyleToken, type ControlSizeToken } from './runtime'
import { FormSection } from './controls'
import { BoolField, EnumField, PlaygroundSection, StringField, toBoolBinding, useBoolBinding } from './demo-playground'

export const ButtonDemo: FC = () => {
  const title = useBinding('Send')
  const buttonStyle = useBinding<ButtonStyleToken>('borderedProminent')
  const controlSize = useBinding<ControlSizeToken>('regular')
  const disabled = useBoolBinding(false)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <VStack spacing={10} alignment="leading">
          <Button title="plain button" buttonStyle="plain" />
          <Button title="bordered button" buttonStyle="bordered" />
          <Button title="prominent button" buttonStyle="borderedProminent" />
          <Button title="borderless button" buttonStyle="borderless" />
          <Button title="link style button" buttonStyle="link" />
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="Button Playground"
        preview={<Button title={title.value} buttonStyle={buttonStyle.value} controlSize={controlSize.value} disabled={toBoolBinding(disabled)} />}
        form={
          <>
            <StringField label="title" binding={title} />
            <EnumField
              label="buttonStyle"
              binding={buttonStyle}
              options={[
                { label: 'plain', value: 'plain' },
                { label: 'bordered', value: 'bordered' },
                { label: 'prominent', value: 'borderedProminent' },
                { label: 'borderless', value: 'borderless' },
                { label: 'link', value: 'link' },
              ]}
            />
            <EnumField
              label="controlSize"
              binding={controlSize}
              options={[
                { label: 'mini', value: 'mini' },
                { label: 'small', value: 'small' },
                { label: 'regular', value: 'regular' },
                { label: 'large', value: 'large' },
              ]}
            />
            <BoolField label="disabled" binding={disabled} />
          </>
        }
      />
    </VStack>
  )
}
