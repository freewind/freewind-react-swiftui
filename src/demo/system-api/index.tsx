import type { FC } from 'react'
import {
  Button,
  FormSection,
  HStack,
  Text,
  TextField,
  useAppStorage,
  useMockEnvironment,
  VStack,
} from '../../swift'

export const SystemApiMockDemo: FC = () => {
  const env = useMockEnvironment()
  const fileName = useAppStorage('system-api:new-file-name', 'draft.txt')

  return (
    <VStack spacing={16} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="系统 API Mock">
        <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text>download root: {env.downloadRoot}</Text>
          <Text>files: {String(env.files.length)}</Text>
          <Text>recent events: {String(env.recentEvents.length)}</Text>
        </VStack>
      </FormSection>
      <FormSection title="文件 stub">
        <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <TextField text={fileName} placeholder="file name" textFieldStyle="roundedBorder" />
          <HStack spacing={10}>
            <Button
              title="Create"
              buttonStyle="borderedProminent"
              onPress={() => {
                env.createFile('/Downloads', {
                  fileName: fileName.value,
                  kind: 'file',
                  mimeType: 'text/plain',
                  data: 'mock file',
                })
              }}
            />
            <Button title="Open URL" buttonStyle="bordered" onPress={() => env.systemApi.openUrl('https://developer.apple.com/xcode/swiftui/')} />
            <Button title="Reveal Downloads" buttonStyle="bordered" onPress={() => env.fileApi.revealPath(env.downloadRoot)} />
          </HStack>
          <VStack spacing={6} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            {env.listFolder('/Downloads').slice(0, 8).map(node => (
              <Text key={node.path} font="caption2.monospaced">
                {node.path}
              </Text>
            ))}
          </VStack>
        </VStack>
      </FormSection>
      <FormSection title="事件流">
        <VStack spacing={6} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {env.recentEvents.length ? (
            env.recentEvents.map((event, index) => (
              <Text key={`${event.kind}-${index}`} font="caption2.monospaced">
                {JSON.stringify(event)}
              </Text>
            ))
          ) : (
            <Text foregroundStyle="secondary">no events</Text>
          )}
        </VStack>
      </FormSection>
    </VStack>
  )
}
