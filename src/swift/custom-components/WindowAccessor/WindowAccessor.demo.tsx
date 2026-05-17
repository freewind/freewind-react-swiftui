import type { FC } from 'react'
import { Text, useBinding, WindowAccessor } from '../runtime'
import { FormSection } from '../../controls'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import { VStack } from '../../components/VStack'

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
        title="读取窗口信息"
        summary="当前兼容层先 mock `onResolve(window)`，用于桥接窗口对象。"
        preview={
          <VStack spacing={8} padding={12} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Text font="headline">WindowAccessor</Text>
            <Text foregroundStyle="secondary">resolve 后把 title 写回 binding。</Text>
            <WindowAccessor onResolve={window => resolved.setValue(window.title)} />
            <Text font="caption2.monospaced">{resolved.value}</Text>
          </VStack>
        }
      />
      <ComponentPropsTable component="WindowAccessor" />
    </VStack>
  )
}
