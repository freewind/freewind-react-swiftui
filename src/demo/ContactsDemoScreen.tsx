import type { FC } from 'react'
import {
  binding,
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
  TextEditorSheet,
  TextFieldRow,
  useBinding,
  VStack,
  WindowGroup,
  Button,
  Divider,
  Label,
} from '../swiftui'

type Peer = {
  id: string
  deviceName: string
  platform: 'macos' | 'ios'
  isOnline: boolean
  lastMessage: string
  pinned: boolean
}

const peers: Peer[] = [
  { id: '1', deviceName: 'MacBook Pro', platform: 'macos', isOnline: true, lastMessage: '刚收到图片', pinned: true },
  { id: '2', deviceName: 'iPhone 16', platform: 'ios', isOnline: false, lastMessage: '离线待发送', pinned: false },
  { id: '3', deviceName: '测试机', platform: 'ios', isOnline: true, lastMessage: '文件传输完成', pinned: false },
]

export const ContactsDemoScreen: FC = () => {
  const selectedTab = useBinding(0)
  const draftDeviceName = useBinding('freewind-mac')
  const scanLogsPresented = useBinding(true)
  const notesSheetPresented = useBinding(false)
  const notes = useBinding('把这里当 SwiftUI sheet + TextEditor playground。')

  return (
    <WindowGroup minWidth={340} minHeight={720}>
      <HStack frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }} spacing={0}>
        <VStack
          spacing={0}
          frame={{ width: 320, maxHeight: 'infinity' }}
          background={{ fill: 'thinMaterial', in: { kind: 'rectangle' } }}
        >
          <VStack spacing={0} frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
            {selectedTab.value === 0 ? (
              <ContactsPane scanLogsPresented={scanLogsPresented} onOpenSheet={() => notesSheetPresented.setValue(true)} />
            ) : null}
            {selectedTab.value === 1 ? <AttachmentPane title="图片" emptyText="还没有收到图片" /> : null}
            {selectedTab.value === 2 ? <AttachmentPane title="文件" emptyText="还没有收到文件" /> : null}
            {selectedTab.value === 3 ? <MePane draftDeviceName={draftDeviceName} /> : null}
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
        <ChatPreview />
      </HStack>

      <TextEditorSheet title="修改消息" isPresented={notesSheetPresented} text={notes} />
    </WindowGroup>
  )
}

const ContactsPane: FC<{
  scanLogsPresented: ReturnType<typeof useBinding<boolean>>
  onOpenSheet: () => void
}> = ({ scanLogsPresented, onOpenSheet }) => {
  return (
    <VStack spacing={0} frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
      <HStack padding={{ horizontal: 10, top: 4, bottom: 8 }}>
        <Text font="title3.semibold">联系人</Text>
        <Spacer />
        <Button title="扫描" buttonStyle="bordered" controlSize="small" />
      </HStack>

      <ScrollView frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
        <VStack spacing={10} padding={10}>
          {peers.map(peer => (
            <PeerRow key={peer.id} peer={peer} />
          ))}
        </VStack>
      </ScrollView>

      <If when={scanLogsPresented.value}>
        <Divider />
        <VStack spacing={8} padding={{ horizontal: 10, vertical: 8 }} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <HStack>
            <Text font="caption.semibold" foregroundStyle="secondary">
              扫描日志
            </Text>
            <Spacer />
            <Button
              title="关闭"
              buttonStyle="bordered"
              controlSize="small"
              onPress={() => scanLogsPresented.setValue(false)}
            />
          </HStack>
          <ScrollView frame={{ height: 118 }}>
            <VStack spacing={4} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              <Text font="caption2.monospaced">discover peer 192.168.1.20</Text>
              <Text font="caption2.monospaced">sync digest 3 conversations</Text>
              <Text font="caption2.monospaced">rebuild list done</Text>
            </VStack>
          </ScrollView>
          <Button title="打开 Sheet Playground" buttonStyle="plain" onPress={onOpenSheet} />
        </VStack>
      </If>
    </VStack>
  )
}

const PeerRow: FC<{
  peer: Peer
}> = ({ peer }) => {
  return (
    <VStack
      spacing={8}
      padding={12}
      frame={{ maxWidth: 'infinity', alignment: 'leading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
    >
      <HStack spacing={8}>
        <Image systemName={peer.platform === 'macos' ? 'laptopcomputer' : 'iphone'} />
        <VStack spacing={2} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <HStack spacing={4}>
            <Text font="headline.semibold">{peer.deviceName}</Text>
            {peer.pinned ? <Image systemName="pin.fill" /> : null}
          </HStack>
          <Text font="caption" foregroundStyle="secondary">
            {peer.isOnline ? '在线' : '离线'}
          </Text>
        </VStack>
      </HStack>
      <Text font="caption" foregroundStyle="secondary">
        {peer.lastMessage}
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

const MePane: FC<{
  draftDeviceName: ReturnType<typeof useBinding<string>>
}> = ({ draftDeviceName }) => {
  return (
    <ScrollView frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
      <VStack spacing={12} padding={14}>
        <FormSection title="我">
          <Text font="headline">freewind-mac</Text>
          <Text font="caption2" foregroundStyle="secondary">
            deviceId: abc-123 logV: 1
          </Text>
          <Text font="caption2.monospaced" foregroundStyle="secondary" textSelection="enabled">
            192.168.1.8:50321
          </Text>
        </FormSection>

        <FormSection title="设置">
          <TextFieldRow label="device name" text={draftDeviceName} placeholder="device name" />
          <HStack>
            <Spacer />
            <Button title="保存" buttonStyle="borderedProminent" />
          </HStack>
        </FormSection>
      </VStack>
    </ScrollView>
  )
}

const ChatPreview: FC = () => {
  const sheetPresented = useBinding(false)
  const draft = useBinding('这里先做 SwiftUI 风格 JSX。')

  return (
    <VStack spacing={0} frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
      <HStack spacing={12} padding={{ horizontal: 24, vertical: 10 }}>
        <Image systemName="laptopcomputer" />
        <VStack spacing={4} alignment="leading">
          <Text font="title3.semibold">MacBook Pro</Text>
          <Text font="caption" foregroundStyle="secondary">
            在线
          </Text>
        </VStack>
        <Spacer />
        <Button buttonStyle="borderless" onPress={() => sheetPresented.setValue(true)}>
          <Image systemName="xmark" />
        </Button>
      </HStack>

      <Divider />

      <ScrollView frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
        <VStack spacing={14} padding={{ horizontal: 20, vertical: 18 }}>
          <Bubble direction="inbound" text="这个方向对，先做受限 DSL。" meta="09:41" />
          <Bubble direction="outbound" text="行，那我直接拿 React 热更调 UI。" meta="09:43" />
          <Bubble direction="inbound" text="最后 AI 再转 SwiftUI。" meta="09:44" />
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
            <Button title="选文件" buttonStyle="bordered" />
            <Button title="发送" buttonStyle="borderedProminent" />
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

const Bubble: FC<{
  direction: 'inbound' | 'outbound'
  text: string
  meta: string
}> = ({ direction, text, meta }) => {
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
      </VStack>
      {direction === 'inbound' ? <Spacer minLength={90} /> : null}
    </HStack>
  )
}
