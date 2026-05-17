import type { FC } from 'react'
import { FormSection, Text, VStack } from '../../swift'

export const NativeSwiftSourceDemo: FC = () => {
  return (
    <FormSection title="原生 Swift 对照">
      <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text>当前仓库未内嵌真实 Swift 源面板。</Text>
        <Text foregroundStyle="secondary">保留此页，作为 DSL / mock / translator 与原生实现的对照入口。</Text>
      </VStack>
    </FormSection>
  )
}
