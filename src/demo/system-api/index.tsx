import type { FC } from 'react'
import {
  Button,
  GroupBox,
  FormSection,
  HStack,
  ScrollView,
  Text,
  TextField,
  buildSwiftUiDraft,
  buildTranslatorExportPacket,
  useAppStorage,
  useMockEnvironment,
  VStack,
} from '../../swift'

export const SystemApiMockDemo: FC = () => {
  const env = useMockEnvironment()
  const fileName = useAppStorage('system-api:new-file-name', 'draft.txt')
  const packet = buildTranslatorExportPacket('system-api')
  const draft = buildSwiftUiDraft(packet)

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
      <HStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <GroupBox title="Export Packet" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <ScrollView axes={['horizontal', 'vertical']} frame={{ height: 220, maxWidth: 'infinity' }} padding={12}>
            <Text monospaced textSelection="enabled" font="caption2.monospaced">
              {JSON.stringify(packet, null, 2)}
            </Text>
          </ScrollView>
        </GroupBox>
        <GroupBox title="SwiftUI Draft" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <ScrollView axes={['horizontal', 'vertical']} frame={{ height: 220, maxWidth: 'infinity' }} padding={12}>
            <Text monospaced textSelection="enabled" font="caption2.monospaced">
              {draft}
            </Text>
          </ScrollView>
        </GroupBox>
      </HStack>
    </VStack>
  )
}
