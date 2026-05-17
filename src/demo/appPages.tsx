import type { FC } from 'react'
import {
  AppFileApi,
  AppSystemApi,
  Button,
  ChatMessage,
  Divider,
  FormSection,
  HStack,
  If,
  Image,
  MockFileNode,
  Picker,
  ScrollView,
  Sheet,
  Spacer,
  Text,
  TextEditor,
  TextField,
  TextFieldRow,
  useBinding,
  useMockAppShell,
  useMockEnvironment,
  VStack,
} from '../swift'
import { emojiGroups, fileRows, imageItems, todoItems } from './model'

export const QQDemo: FC = () => {
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

export const TodoDemo: FC = () => {
  const segment = useBinding<'all' | 'open' | 'done'>('all')
  const input = useBinding('给 SwiftUI JSX demo 再加更多 case')

  return (
    <FormSection title="Todo List">
      <VStack spacing={14} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Picker
          selection={segment}
          pickerStyle="segmented"
          options={[
            { label: '全部', value: 'all' },
            { label: '待办', value: 'open' },
            { label: '完成', value: 'done' },
          ]}
        />
        <HStack spacing={10}>
          <TextField text={input} placeholder="new task" textFieldStyle="roundedBorder" frame={{ maxWidth: 'infinity' }} />
          <Button title="添加" buttonStyle="borderedProminent" />
        </HStack>
        <VStack spacing={8}>
          {todoItems
            .filter(item => (segment.value === 'all' ? true : segment.value === 'done' ? item.done : !item.done))
            .map(item => (
              <HStack
                key={item.id}
                spacing={10}
                padding={12}
                frame={{ maxWidth: 'infinity', alignment: 'leading' }}
                background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
              >
                <Image systemName={item.done ? 'pin.fill' : 'doc'} />
                <VStack spacing={2} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
                  <Text>{item.title}</Text>
                  <Text font="caption" foregroundStyle="secondary">
                    {item.tag}
                  </Text>
                </VStack>
                <Text font="caption" foregroundStyle={item.done ? 'green' : 'secondary'}>
                  {item.done ? 'done' : 'open'}
                </Text>
              </HStack>
            ))}
        </VStack>
      </VStack>
    </FormSection>
  )
}

export const EmojiDemo: FC = () => {
  const selected = useBinding('🪄')

  return (
    <FormSection title="Emoji Picker">
      <VStack spacing={14} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text foregroundStyle="secondary">selected: {selected.value}</Text>
        {emojiGroups.map((row, index) => (
          <HStack key={String(index)} spacing={10}>
            {row.map(emoji => (
              <Button
                key={emoji}
                title={emoji}
                onPress={() => selected.setValue(emoji)}
                buttonStyle={selected.value === emoji ? 'borderedProminent' : 'bordered'}
                frame={{ width: 60, height: 48 }}
              />
            ))}
          </HStack>
        ))}
      </VStack>
    </FormSection>
  )
}

export const ImageBrowserDemo: FC = () => {
  return (
    <FormSection title="Image Browser">
      <VStack spacing={14} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <HStack spacing={14}>
          {imageItems.slice(0, 2).map(item => (
            <ImageTile key={item.id} item={item} />
          ))}
        </HStack>
        <HStack spacing={14}>
          {imageItems.slice(2).map(item => (
            <ImageTile key={item.id} item={item} />
          ))}
        </HStack>
      </VStack>
    </FormSection>
  )
}

const ImageTile: FC<{
  item: {
    id: string
    title: string
    tone: 'blue' | 'red' | 'green' | 'secondary'
    size: string
  }
}> = ({ item }) => {
  return (
    <VStack
      spacing={10}
      padding={12}
      frame={{ width: 240, alignment: 'leading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
    >
      <VStack
        frame={{ width: 'infinity', height: 160 }}
        background={{ fill: item.tone, in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
      >
        <Text font="title2" foregroundColor="#ffffff">
          {item.title}
        </Text>
      </VStack>
      <Text font="headline">{item.title}</Text>
      <Text font="caption" foregroundStyle="secondary">
        {item.size}
      </Text>
    </VStack>
  )
}

export const FileBrowserDemo: FC = () => {
  return (
    <FormSection title="File Browser">
      <HStack spacing={0} frame={{ maxWidth: 'infinity', minHeight: 420 }}>
        <VStack
          spacing={8}
          padding={14}
          frame={{ width: 220, maxHeight: 'infinity', alignment: 'leading' }}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
        >
          <Text font="headline">Favorites</Text>
          <Button title="Documents" buttonStyle="borderedProminent" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
          <Button title="Downloads" buttonStyle="bordered" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
          <Button title="Pictures" buttonStyle="bordered" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
        </VStack>
        <Divider axis="vertical" />
        <VStack spacing={12} frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
          <HStack
            padding={14}
            frame={{ maxWidth: 'infinity' }}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
          >
            <Text font="title3.semibold">Documents</Text>
            <Spacer />
            <Button title="New Folder" buttonStyle="bordered" />
          </HStack>
          <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            {fileRows.map(row => (
              <HStack
                key={row.id}
                spacing={10}
                padding={12}
                frame={{ maxWidth: 'infinity', alignment: 'leading' }}
                background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
              >
                <Image systemName={row.kind === 'folder' ? 'doc' : row.kind === 'image' ? 'photo' : 'doc'} />
                <VStack spacing={2} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
                  <Text>{row.name}</Text>
                  <Text font="caption" foregroundStyle="secondary">
                    {row.meta}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </HStack>
    </FormSection>
  )
}

export const SystemApiMockDemo: FC = () => {
  const env = useMockEnvironment()
  const renameInput = useBinding(env.identity.deviceName)
  const createFileName = useBinding('draft.txt')
  const createFolderName = useBinding('new-folder')
  const selectedFolder = useBinding('/Downloads')
  const selectedPath = useBinding('/Downloads/mock-note.txt')
  const message: ChatMessage = {
    messageId: 'm1',
    conversationId: 'peer-mac',
    kind: 'file',
    status: 'sent',
    filePath: selectedPath.value,
    fileName: selectedPath.value.split('/').pop(),
  }
  const [systemApi, fileApi] = [env.systemApi, env.fileApi] as [AppSystemApi, AppFileApi]

  const folderOptions = ['/Downloads', '/Downloads/peer-mac/files', '/Downloads/peer-mac/images', '/Pictures']
  const folderItems = env.listFolder(selectedFolder.value)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="AppSystemApi">
        <VStack spacing={12} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text>deviceId: {systemApi.loadIdentity().deviceId}</Text>
          <Text>deviceName: {systemApi.loadIdentity().deviceName}</Text>
          <Text>downloadRoot: {systemApi.makeDownloadRoot()}</Text>
          <Text>pickFiles(): {systemApi.pickFiles().join(', ') || '[]'}</Text>
          <Text>clipboardImage(): {systemApi.clipboardImage()?.fileName ?? 'nil'}</Text>
          <HStack spacing={10}>
            <TextField text={renameInput} placeholder="rename device" textFieldStyle="roundedBorder" frame={{ maxWidth: 'infinity' }} />
            <Button
              title="renameDevice"
              buttonStyle="borderedProminent"
              onPress={() => {
                const next = systemApi.renameDevice(systemApi.loadIdentity(), renameInput.value)
                if (next) {
                  renameInput.setValue(next.deviceName)
                }
              }}
            />
          </HStack>
        </VStack>
      </FormSection>

      <FormSection title="Mock File System">
        <VStack spacing={12} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Picker
            selection={selectedFolder}
            pickerStyle="segmented"
            options={folderOptions.map(path => ({ label: path.split('/').pop() || '/', value: path }))}
          />
          <HStack spacing={10}>
            <TextField text={createFolderName} placeholder="new folder" textFieldStyle="roundedBorder" frame={{ maxWidth: 'infinity' }} />
            <Button
              title="mkdir"
              buttonStyle="bordered"
              onPress={() =>
                env.createFile(selectedFolder.value, {
                  fileName: createFolderName.value,
                  kind: 'folder',
                  mimeType: 'inode/directory',
                  data: '',
                  children: [],
                })
              }
            />
          </HStack>
          <HStack spacing={10}>
            <TextField text={createFileName} placeholder="new file" textFieldStyle="roundedBorder" frame={{ maxWidth: 'infinity' }} />
            <Button
              title="touch"
              buttonStyle="borderedProminent"
              onPress={() =>
                env.createFile(selectedFolder.value, {
                  fileName: createFileName.value,
                  kind: createFileName.value.endsWith('.png') ? 'image' : 'file',
                  mimeType: createFileName.value.endsWith('.png') ? 'image/png' : 'text/plain',
                  data: `mock data for ${createFileName.value}`,
                })
              }
            />
          </HStack>
          <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            {folderItems.map(item => (
              <MockFileRow
                key={item.path}
                item={item}
                isSelected={selectedPath.value === item.path}
                onSelect={() => selectedPath.setValue(item.path)}
                onDelete={() => env.removePath(item.path)}
                onReveal={() => fileApi.revealPath(item.path)}
              />
            ))}
          </VStack>
        </VStack>
      </FormSection>

      <FormSection title="AppFileApi">
        <VStack spacing={12} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text>prepareOutgoingFile(): {JSON.stringify(fileApi.prepareOutgoingFile(selectedPath.value))}</Text>
          <Text>readMessageData(): {fileApi.readMessageData(message) ?? 'nil'}</Text>
          <Text>filePreview(): {fileApi.filePreview('file', 'brief.md')}</Text>
          <Text>messagePreview(): {fileApi.messagePreview(message)}</Text>
          <HStack spacing={10}>
            <Button title="ensureSavedAttachment" buttonStyle="bordered" onPress={() => fileApi.ensureSavedAttachment(message)} />
            <Button title="openAttachment" buttonStyle="bordered" onPress={() => fileApi.openAttachment(message)} />
            <Button title="revealAttachment" buttonStyle="bordered" onPress={() => fileApi.revealAttachment(message)} />
            <Button
              title="saveIncomingFile"
              buttonStyle="borderedProminent"
              onPress={() => fileApi.saveIncomingFile('peer-ios', 'file', 'incoming.txt', 'mock incoming data')}
            />
          </HStack>
        </VStack>
      </FormSection>

      <FormSection title="Recent Mock Events">
        <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {env.recentEvents.map((event, index) => (
            <Text key={`${event.kind}-${event.path}-${String(index)}`} font="caption2.monospaced">
              {event.kind}: {event.path}
            </Text>
          ))}
        </VStack>
      </FormSection>
    </VStack>
  )
}

const MockFileRow: FC<{
  item: MockFileNode
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
  onReveal: () => void
}> = ({ item, isSelected, onSelect, onDelete, onReveal }) => {
  return (
    <HStack
      spacing={10}
      padding={12}
      frame={{ maxWidth: 'infinity', alignment: 'leading' }}
      background={{
        fill: isSelected ? 'accentColor' : 'thinMaterial',
        in: { kind: 'roundedRectangle', cornerRadius: 14 },
      }}
    >
      <Button buttonStyle="plain" onPress={onSelect}>
        <Image systemName={item.kind === 'image' ? 'photo' : item.kind === 'folder' ? 'doc' : 'doc'} />
      </Button>
      <VStack spacing={2} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text foregroundColor={isSelected ? '#ffffff' : undefined}>{item.fileName}</Text>
        <Text font="caption" foregroundColor={isSelected ? 'rgba(255,255,255,0.82)' : undefined} foregroundStyle={isSelected ? undefined : 'secondary'}>
          {item.path}
        </Text>
      </VStack>
      <Button title="reveal" buttonStyle="bordered" onPress={onReveal} />
      <Button title="delete" buttonStyle="bordered" onPress={onDelete} />
    </HStack>
  )
}
