import type { FC } from 'react'
import { Text, useBinding, VStack, WindowAccessor } from './runtime'
import { FormSection } from './controls'
import { PlaygroundSection } from './demo-playground'

export const WindowAccessorDemo: FC = () => {
  const resolved = useBinding('Mock Window')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <VStack spacing={8} padding={12} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text font="headline">WindowAccessor</Text>
          <Text foregroundStyle="secondary">对应 `NSViewRepresentable` bridge 的最小 mock。</Text>
          <WindowAccessor onResolve={window => resolved.setValue(window.title)} />
          <Text font="caption2.monospaced">{resolved.value}</Text>
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="WindowAccessor Playground"
        preview={
          <VStack spacing={8} padding={12} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Text font="headline">WindowAccessor</Text>
            <WindowAccessor onResolve={window => resolved.setValue(window.title)} />
            <Text font="caption2.monospaced">{resolved.value}</Text>
          </VStack>
        }
        form={<Text foregroundStyle="secondary">当前支持面：`onResolve(window)` mock</Text>}
      />
    </VStack>
  )
}
