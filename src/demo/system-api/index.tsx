import type { FC } from 'react'
import { FormSection, Text, VStack, useMockEnvironment } from '../../swift'

export const SystemApiMockDemo: FC = () => {
  const env = useMockEnvironment()
  return (
    <FormSection title="系统 API Mock">
      <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text>download root: {env.downloadRoot}</Text>
        <Text>files: {String(env.files.length)}</Text>
        <Text>recent events: {String(env.recentEvents.length)}</Text>
      </VStack>
    </FormSection>
  )
}
