import type { FC } from 'react'
import {
  Button,
  Divider,
  FormSection,
  HStack,
  If,
  Image,
  Picker,
  ScrollView,
  Sheet,
  Spacer,
  Text,
  TextEditor,
  TextFieldRow,
  useBinding,
  useMockAppShell,
  VStack,
} from '../../swift'

export function QQDemo(): ReturnType<FC> {
  const shell = useMockAppShell()
  const selectedTab = useBinding(0)
  const draft = useBinding('这里先做 SwiftUI 风格 JSX。')

  return (
    <FormSection title="QQ / Chat Layout">
      <HStack frame={{ maxWidth: 'infinity', minHeight: 620 }} spacing={0}>
        <VStack
          spacing={0}
          frame={{ width: 320, maxHeight: 'infinity' }}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
        >
          <VStack spacing={0} frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
            {selectedTab.value === 0 ? <ContactsPaneMini /> : null}
            {selectedTab.value === 1 ? <AttachmentPane title="图片" emptyText="还没有收到图片" /> : null}
            {selectedTab.value === 2 ? <AttachmentPane title="文件" emptyText="还没有收到文件" /> : null}
            {selectedTab.value === 3 ? <MePaneMini /> : null}
          </VStack>
          <Divider />
          <Picker
            padding={10}
            selection={selectedTab}
            pickerStyle="segmented"
            options={[
              { label: '联系人', value: 0 },
              { label: '图片', value: 1 },
              { label: '文件', value: 2 },
              { label: '我', value: 3 },
            ]}
          />
        </VStack>
        <Divider axis="vertical" />
        {shell.openedDigest ? <ChatPanel draft={draft} /> : <EmptyChatPanel />}
      </HStack>
    </FormSection>
  )
}

const ContactsPaneMini: FC = () => {
  const shell = useMockAppShell()
  return (
    <VStack spacing={0} frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
      <HStack padding={{ horizontal: 10, top: 4, bottom: 8 }}>
        <Text font="title3.semibold">联系人</Text>
        <Spacer />
        <Button title="扫描" buttonStyle="bordered" controlSize="small" onPress={() => shell.scanNow()} />
      </HStack>
      <ScrollView frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
        <VStack spacing={10} padding={10}>
          {shell.peerDigests.map(digest => (
            <PeerRow key={digest.peer.deviceId} digest={digest} />
          ))}
        </VStack>
      </ScrollView>
      <If when={shell.isScanLogsPresented}>
        <Divider />
        <VStack spacing={6} padding={{ horizontal: 10, vertical: 8 }} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <HStack>
            <Text font="caption.semibold" foregroundStyle="secondary">
              扫描日志
            </Text>
            <Spacer />
            <Button title="关闭" buttonStyle="bordered" controlSize="small" onPress={() => shell.setScanLogsPresented(false)} />
          </HStack>
          {shell.scanLogs.map(line => (
            <Text key={line} font="caption2.monospaced">
              {line}
            </Text>
          ))}
        </VStack>
      </If>
    </VStack>
  )
}

const PeerRow: FC<{
  digest: {
    peer: {
      deviceId: string
      deviceName: string
      isOnline: boolean
      pinnedAt: number | null
      platform: 'macos' | 'ios'
    }
    lastMessagePreview: string
  }
}> = ({ digest }) => {
  const shell = useMockAppShell()
  const peer = digest.peer
  return (
    <VStack
      spacing={8}
      padding={12}
      frame={{ maxWidth: 'infinity', alignment: 'leading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
    >
      <HStack spacing={8}>
        <Button buttonStyle="plain" onPress={() => shell.openPeer(peer.deviceId)}>
          <Image systemName={peer.platform === 'macos' ? 'laptopcomputer' : 'iphone'} />
        </Button>
        <VStack spacing={2} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <HStack spacing={4}>
            <Text font="headline.semibold">{peer.deviceName}</Text>
            {peer.pinnedAt != null ? <Image systemName="pin.fill" /> : null}
          </HStack>
          <Text font="caption" foregroundStyle="secondary">
            {peer.isOnline ? '在线' : '离线'}
          </Text>
        </VStack>
        <Button title="置顶" buttonStyle="plain" onPress={() => shell.togglePinned(peer.deviceId)} />
      </HStack>
      <Text font="caption" foregroundStyle="secondary">
        {digest.lastMessagePreview}
      </Text>
    </VStack>
  )
}

const AttachmentPane: FC<{
  title: string
  emptyText: string
}> = ({ title, emptyText }) => {
  return (
    <ScrollView frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
      <VStack spacing={12} padding={14} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text font="headline">{title}</Text>
        <Text foregroundStyle="secondary">{emptyText}</Text>
      </VStack>
    </ScrollView>
  )
}

const MePaneMini: FC = () => {
  const shell = useMockAppShell()
  const draftDeviceName = useBinding(shell.deviceName)

  return (
    <ScrollView frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
      <VStack spacing={12} padding={14}>
        <FormSection title="我">
          <Text font="headline">{shell.deviceName}</Text>
          <Text font="caption2" foregroundStyle="secondary">
            deviceId: {shell.deviceId} logV: {String(shell.logDogVersion)}
          </Text>
          <Text font="caption2.monospaced" foregroundStyle="secondary" textSelection="enabled">
            {shell.localAccessAddress}
          </Text>
        </FormSection>
        <FormSection title="设置">
          <TextFieldRow label="device name" text={draftDeviceName} placeholder="device name" />
          <HStack>
            <Spacer />
            <Button title="保存" buttonStyle="borderedProminent" onPress={() => shell.renameDevice(draftDeviceName.value)} />
          </HStack>
        </FormSection>
        <FormSection title="下载目录">
          <HStack>
            <Text foregroundStyle="secondary">{shell.downloadRoot}</Text>
            <Spacer />
            <Button title="打开" buttonStyle="bordered" onPress={() => shell.openDirectory(shell.downloadRoot)} />
          </HStack>
        </FormSection>
      </VStack>
    </ScrollView>
  )
}

const ChatPanel: FC<{
  draft: ReturnType<typeof useBinding<string>>
}> = ({ draft }) => {
  const shell = useMockAppShell()
  const digest = shell.openedDigest
  const sheetPresented = useBinding(false)

  if (!digest) {
    return null
  }

  const chatMessages = shell.messages(digest.peer.deviceId)

  return (
    <VStack spacing={0} frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
      <HStack spacing={12} padding={{ horizontal: 24, vertical: 10 }}>
        <Image systemName={digest.peer.platform === 'macos' ? 'laptopcomputer' : 'iphone'} />
        <VStack spacing={4} alignment="leading">
          <Text font="title3.semibold">{digest.peer.deviceName}</Text>
          <Text font="caption" foregroundStyle="secondary">
            {digest.peer.isOnline ? '在线' : '离线'}
          </Text>
        </VStack>
        <Spacer />
        <Button buttonStyle="borderless" onPress={() => shell.closeOpenedPeer()}>
          <Image systemName="xmark" />
        </Button>
      </HStack>
      <Divider />
      <ScrollView frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
        <VStack spacing={14} padding={{ horizontal: 20, vertical: 18 }}>
          {chatMessages.map((message, index) => (
            <Bubble
              key={message.messageId}
              direction={index % 2 === 0 ? 'inbound' : 'outbound'}
              text={message.textContent ?? message.fileName ?? '[附件]'}
              meta={message.status}
              onOpen={
                message.filePath
                  ? () => {
                      shell.openMessageAttachment(message)
                    }
                  : undefined
              }
              onSave={
                message.filePath
                  ? () => {
                      shell.saveMessageAttachment(message)
                    }
                  : undefined
              }
            />
          ))}
        </VStack>
      </ScrollView>
      <Divider />
      <VStack spacing={12} padding={20}>
        <TextEditor text={draft} frame={{ height: 120, maxWidth: 'infinity' }} />
        <VStack spacing={6} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text font="caption" foregroundStyle="secondary">
            Enter 发送，Shift+Enter 换行
          </Text>
          <HStack>
            <Spacer />
            <Button title="贴图" buttonStyle="bordered" onPress={() => shell.sendClipboardImageFromPasteboard(digest.peer)} />
            <Button title="选文件" buttonStyle="bordered" onPress={() => shell.chooseFilesAndSend(digest.peer)} />
            <Button
              title="发送"
              buttonStyle="borderedProminent"
              onPress={() => {
                shell.sendText(digest.peer, draft.value)
                draft.setValue('')
              }}
            />
          </HStack>
        </VStack>
      </VStack>
      <Sheet isPresented={sheetPresented}>
        <VStack
          spacing={12}
          padding={20}
          frame={{ width: 360, height: 220 }}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 20 } }}
        >
          <Text font="headline">关闭预览？</Text>
          <Text foregroundStyle="secondary">这里是受限 DSL 的 Sheet 示例。</Text>
          <HStack>
            <Spacer />
            <Button title="关闭" buttonStyle="borderedProminent" onPress={() => sheetPresented.setValue(false)} />
          </HStack>
        </VStack>
      </Sheet>
    </VStack>
  )
}

const EmptyChatPanel: FC = () => {
  return (
    <VStack frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }} spacing={12}>
      <Text font="title3.semibold">未选中会话</Text>
      <Text foregroundStyle="secondary">从左侧选择联系人，或重新扫描。</Text>
    </VStack>
  )
}

const Bubble: FC<{
  direction: 'inbound' | 'outbound'
  text: string
  meta: string
  onOpen?: () => void
  onSave?: () => void
}> = ({ direction, text, meta, onOpen, onSave }) => {
  return (
    <HStack frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      {direction === 'outbound' ? <Spacer minLength={90} /> : null}
      <VStack
        spacing={6}
        alignment="leading"
        padding={{ horizontal: 14, vertical: 10 }}
        background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
      >
        <Text textSelection="enabled">{text}</Text>
        <Text font="caption" foregroundStyle="secondary">
          {meta}
        </Text>
        {onOpen || onSave ? (
          <HStack spacing={8}>
            {onOpen ? <Button title="打开" buttonStyle="bordered" controlSize="small" onPress={onOpen} /> : null}
            {onSave ? <Button title="保存" buttonStyle="bordered" controlSize="small" onPress={onSave} /> : null}
          </HStack>
        ) : null}
      </VStack>
      {direction === 'inbound' ? <Spacer minLength={90} /> : null}
    </HStack>
  )
}
