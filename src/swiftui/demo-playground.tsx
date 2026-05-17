import type { FC, ReactNode } from 'react'
import { HStack, Picker, Text, TextField, useBinding, VStack, type Binding } from './runtime'
import { FormSection } from './controls'

export const PlaygroundSection: FC<{
  title: string
  preview: ReactNode
  form: ReactNode
}> = ({ title, preview, form }) => {
  return (
    <FormSection title={title}>
      <HStack spacing={18} alignment="top" frame={{ maxWidth: 'infinity' }}>
        <VStack
          spacing={12}
          padding={14}
          frame={{ minWidth: 340, maxWidth: 'infinity', alignment: 'leading' }}
          background={{ fill: 'ultraThinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
        >
          <Text font="caption.semibold" foregroundStyle="secondary">
            Live Preview
          </Text>
          {preview}
        </VStack>
        <VStack spacing={10} frame={{ width: 320, alignment: 'leading' }}>
          <Text font="caption.semibold" foregroundStyle="secondary">
            Props Form
          </Text>
          {form}
        </VStack>
      </HStack>
    </FormSection>
  )
}

export const BoolField: FC<{
  label: string
  binding: Binding<'true' | 'false'>
}> = ({ label, binding }) => {
  return (
    <VStack spacing={6} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <Text font="caption" foregroundStyle="secondary">
        {label}
      </Text>
      <Picker
        selection={binding}
        pickerStyle="segmented"
        options={[
          { label: 'true', value: 'true' },
          { label: 'false', value: 'false' },
        ]}
      />
    </VStack>
  )
}

export const StringField: FC<{
  label: string
  binding: Binding<string>
  placeholder?: string
}> = ({ label, binding, placeholder }) => {
  return (
    <VStack spacing={6} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <Text font="caption" foregroundStyle="secondary">
        {label}
      </Text>
      <TextField text={binding} placeholder={placeholder} textFieldStyle="roundedBorder" />
    </VStack>
  )
}

export const NumberField: FC<{
  label: string
  binding: Binding<string>
  placeholder?: string
}> = ({ label, binding, placeholder }) => <StringField label={label} binding={binding} placeholder={placeholder} />

export const EnumField = <T extends string | number>({
  label,
  binding,
  options,
}: {
  label: string
  binding: Binding<T>
  options: Array<{ label: string; value: T }>
}) => {
  return (
    <VStack spacing={6} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <Text font="caption" foregroundStyle="secondary">
        {label}
      </Text>
      <Picker selection={binding} pickerStyle="segmented" options={options} />
    </VStack>
  )
}

export const toBoolBinding = (binding: Binding<'true' | 'false'>) => binding.value === 'true'

export const toNumber = (value: string, fallback: number) => {
  const next = Number(value)
  return Number.isFinite(next) ? next : fallback
}

export const useBoolBinding = (initialValue: boolean) => useBinding<'true' | 'false'>(initialValue ? 'true' : 'false')
