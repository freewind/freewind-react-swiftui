import type { FC } from 'react'
import {
  Button,
  Divider,
  FormSection,
  HStack,
  If,
  Image,
  Label,
  Picker,
  ScrollView,
  Sheet,
  Spacer,
  Text,
  TextEditor,
  TextEditorSheet,
  TextField,
  TextFieldRow,
  type ThemeMode,
  useBinding,
  VStack,
  WindowGroup,
} from '../swiftui'

type DemoCategory = 'components' | 'layouts' | 'apps'
type DemoPage = {
  id: string
  title: string
  category: DemoCategory
}

const demoPages: DemoPage[] = [
  { id: 'components', title: '组件总览', category: 'components' },
  { id: 'controls', title: '控件状态', category: 'components' },
  { id: 'text-image', title: '文本图片', category: 'components' },
  { id: 'split-view', title: '分栏布局', category: 'layouts' },
  { id: 'dashboard', title: '看板布局', category: 'layouts' },
  { id: 'form-sheet', title: '表单弹层', category: 'layouts' },
  { id: 'qq', title: 'QQ 聊天', category: 'apps' },
  { id: 'todo', title: 'Todo List', category: 'apps' },
  { id: 'emoji', title: 'Emoji 选择器', category: 'apps' },
  { id: 'image-browser', title: '图片浏览器', category: 'apps' },
  { id: 'file-browser', title: '文件浏览器', category: 'apps' },
]

const qqPeers = [
  { id: '1', name: 'MacBook Pro', online: true, pinned: true, lastMessage: '刚收到图片', platform: 'macos' as const },
  { id: '2', name: 'iPhone 16', online: false, pinned: false, lastMessage: '离线待发送', platform: 'ios' as const },
  { id: '3', name: '测试机', online: true, pinned: false, lastMessage: '文件传输完成', platform: 'ios' as const },
]

const todoItems = [
  { id: 't1', title: '收敛 SwiftUI JSX DSL', done: true, tag: 'arch' },
  { id: 't2', title: '补组件展厅', done: false, tag: 'demo' },
  { id: 't3', title: '整理 JSX -> SwiftUI prompt', done: false, tag: 'ai' },
  { id: 't4', title: '补文件拖拽模型', done: false, tag: 'macos' },
]

const emojiGroups = [
  ['😀', '😄', '😁', '🥹', '😎', '🤖'],
  ['🍎', '🍇', '🍋', '🥑', '🍑', '🥝'],
  ['🚀', '🧩', '🎯', '🪄', '📁', '🖼️'],
]

const imageItems = [
  { id: 'i1', title: '日出', tone: 'blue' as const, size: '1344×896' },
  { id: 'i2', title: '人物', tone: 'red' as const, size: '1024×1024' },
  { id: 'i3', title: '窗景', tone: 'green' as const, size: '1536×1024' },
  { id: 'i4', title: '静物', tone: 'secondary' as const, size: '1200×900' },
]

const fileRows = [
  { id: 'f1', name: 'Documents', kind: 'folder', meta: '12 items' },
  { id: 'f2', name: 'Design', kind: 'folder', meta: '8 items' },
  { id: 'f3', name: 'README.md', kind: 'file', meta: '12 KB' },
  { id: 'f4', name: 'preview.png', kind: 'image', meta: '1.2 MB' },
  { id: 'f5', name: 'archive.zip', kind: 'file', meta: '88 MB' },
]

export const DemoHub: FC = () => {
  const theme = useBinding<ThemeMode>('light')
  const category = useBinding<DemoCategory>('components')
  const currentPage = useBinding('components')
  const notesSheetPresented = useBinding(false)
  const notes = useBinding('这里放 demo 说明、转换 hint、组件限制。')

  const pages = demoPages.filter(page => page.category === category.value)
  const activePage = demoPages.find(page => page.id === currentPage.value) ?? demoPages[0]

  return (
    <WindowGroup minWidth={1100} minHeight={760} theme={theme.value}>
      <HStack frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }} spacing={0}>
        <Sidebar
          theme={theme}
          category={category}
          currentPage={currentPage}
          pages={pages}
          onOpenNotes={() => notesSheetPresented.setValue(true)}
        />
        <Divider axis="vertical" />
        <ScrollView frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
          <VStack spacing={18} padding={20} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <HeroHeader activePage={activePage.title} />
            {renderDemoPage(activePage.id)}
          </VStack>
        </ScrollView>
      </HStack>

      <TextEditorSheet title="Demo Notes" isPresented={notesSheetPresented} text={notes} />
    </WindowGroup>
  )
}

const Sidebar: FC<{
  theme: ReturnType<typeof useBinding<ThemeMode>>
  category: ReturnType<typeof useBinding<DemoCategory>>
  currentPage: ReturnType<typeof useBinding<string>>
  pages: DemoPage[]
  onOpenNotes: () => void
}> = ({ theme, category, currentPage, pages, onOpenNotes }) => {
  return (
    <VStack
      spacing={14}
      padding={16}
      frame={{ width: 280, maxHeight: 'infinity', alignment: 'leading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'rectangle' } }}
    >
      <VStack spacing={6} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text font="title3.semibold">Demo Hub</Text>
        <Text font="caption" foregroundStyle="secondary">
          组件展厅 / 布局展厅 / 常见 app 案例
        </Text>
      </VStack>

      <Picker
        selection={theme}
        pickerStyle="segmented"
        options={[
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
        ]}
      />

      <Picker
        selection={category}
        pickerStyle="segmented"
        options={[
          { label: '组件', value: 'components' },
          { label: '布局', value: 'layouts' },
          { label: '案例', value: 'apps' },
        ]}
      />

      <ScrollView frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
        <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {pages.map(page => (
            <Button
              key={page.id}
              title={page.title}
              onPress={() => currentPage.setValue(page.id)}
              buttonStyle={currentPage.value === page.id ? 'borderedProminent' : 'bordered'}
              frame={{ maxWidth: 'infinity', alignment: 'leading' }}
            />
          ))}
        </VStack>
      </ScrollView>

      <Divider />

      <VStack spacing={8} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text font="caption.semibold" foregroundStyle="secondary">
          demo 原则
        </Text>
        <Text font="caption" foregroundStyle="secondary">
          只用项目 DSL，不写 raw CSS / DOM / 外部 UI 组件。
        </Text>
        <Button title="编辑说明" buttonStyle="plain" onPress={onOpenNotes} />
      </VStack>
    </VStack>
  )
}

const HeroHeader: FC<{
  activePage: string
}> = ({ activePage }) => {
  return (
    <HStack
      padding={18}
      frame={{ maxWidth: 'infinity' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
      spacing={14}
    >
      <VStack spacing={4} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text font="title2">{activePage}</Text>
        <Text foregroundStyle="secondary">
          用一批受限 SwiftUI-shaped JSX 组件，快速看 UI，方便后续 AI 转 SwiftUI。
        </Text>
      </VStack>
      <Button title="Preview Ready" buttonStyle="borderedProminent" />
    </HStack>
  )
}

const renderDemoPage = (pageId: string) => {
  switch (pageId) {
    case 'components':
      return <ComponentsGallery />
    case 'controls':
      return <ControlsGallery />
    case 'text-image':
      return <TextImageGallery />
    case 'split-view':
      return <SplitViewLayouts />
    case 'dashboard':
      return <DashboardLayouts />
    case 'form-sheet':
      return <FormAndSheetLayouts />
    case 'qq':
      return <QQDemo />
    case 'todo':
      return <TodoDemo />
    case 'emoji':
      return <EmojiDemo />
    case 'image-browser':
      return <ImageBrowserDemo />
    case 'file-browser':
      return <FileBrowserDemo />
    default:
      return <ComponentsGallery />
  }
}

const ComponentsGallery: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Typography">
        <VStack spacing={8} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text font="largeTitle">largeTitle</Text>
          <Text font="title">title</Text>
          <Text font="title2">title2</Text>
          <Text font="title3.semibold">title3.semibold</Text>
          <Text font="headline">headline</Text>
          <Text font="body">body</Text>
          <Text font="caption" foregroundStyle="secondary">
            caption secondary
          </Text>
          <Text font="caption2.monospaced" textSelection="enabled">
            caption2.monospaced selectable
          </Text>
        </VStack>
      </FormSection>

      <HStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <FormSection title="Buttons">
          <VStack spacing={10} alignment="leading">
            <Button title="plain button" buttonStyle="plain" />
            <Button title="bordered button" buttonStyle="bordered" />
            <Button title="prominent button" buttonStyle="borderedProminent" />
            <Button title="small button" buttonStyle="bordered" controlSize="small" />
            <Button title="disabled button" buttonStyle="borderedProminent" disabled />
          </VStack>
        </FormSection>

        <FormSection title="Tokens">
          <VStack spacing={10} alignment="leading">
            <Text foregroundStyle="primary">primary</Text>
            <Text foregroundStyle="secondary">secondary</Text>
            <Text foregroundStyle="tertiary">tertiary</Text>
            <Text foregroundStyle="red">red</Text>
            <Text foregroundStyle="green">green</Text>
            <Text foregroundStyle="accentColor">accentColor</Text>
          </VStack>
        </FormSection>
      </HStack>

      <HStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <FormSection title="Shapes">
          <HStack spacing={12}>
            <SwatchCard title="Rounded" tone="blue" />
            <SwatchCard title="Capsule" tone="green" capsule />
            <SwatchCard title="Rect" tone="red" rectangle />
          </HStack>
        </FormSection>

        <FormSection title="List Row">
          <VStack spacing={8}>
            <GalleryRow title="MessageBubble" meta="thinMaterial + padding + caption" />
            <GalleryRow title="SidebarRow" meta="HStack + Spacer + secondary text" />
            <GalleryRow title="InspectorRow" meta="leading align + divider stack" />
          </VStack>
        </FormSection>
      </HStack>
    </VStack>
  )
}

const ControlsGallery: FC = () => {
  const segmented = useBinding<'all' | 'online' | 'offline'>('all')
  const field = useBinding('freewind-mac')
  const editor = useBinding('多行输入，后续映射 TextEditor。')
  const sheetPresented = useBinding(false)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Picker / TextField / TextEditor">
        <VStack spacing={12} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Picker
            selection={segmented}
            pickerStyle="segmented"
            options={[
              { label: '全部', value: 'all' },
              { label: '在线', value: 'online' },
              { label: '离线', value: 'offline' },
            ]}
          />
          <TextFieldRow label="device name" text={field} placeholder="input device name" />
          <TextEditor text={editor} frame={{ height: 140, maxWidth: 'infinity' }} />
          <Button title="打开 Sheet" buttonStyle="borderedProminent" onPress={() => sheetPresented.setValue(true)} />
        </VStack>
      </FormSection>

      <FormSection title="State Preview">
        <VStack spacing={8} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text>segmented: {segmented.value}</Text>
          <Text>field: {field.value}</Text>
          <Text foregroundStyle="secondary">editor len: {String(editor.value.length)}</Text>
        </VStack>
      </FormSection>

      <Sheet isPresented={sheetPresented}>
        <VStack
          spacing={12}
          padding={20}
          frame={{ width: 380, height: 220 }}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 20 } }}
        >
          <Text font="headline">控件组合 Sheet</Text>
          <Text foregroundStyle="secondary">
            这里演示 modal 结构、按钮对齐、文案层级。
          </Text>
          <HStack>
            <Spacer />
            <Button title="关闭" buttonStyle="borderedProminent" onPress={() => sheetPresented.setValue(false)} />
          </HStack>
        </VStack>
      </Sheet>
    </VStack>
  )
}

const TextImageGallery: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="System Image Tokens">
        <HStack spacing={12}>
          <Image systemName="iphone" />
          <Image systemName="laptopcomputer" />
          <Image systemName="pin.fill" />
          <Image systemName="photo" />
          <Image systemName="doc" />
          <Image systemName="xmark" />
        </HStack>
      </FormSection>

      <FormSection title="Mixed Text Blocks">
        <VStack spacing={12} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text font="headline.semibold">消息卡片</Text>
          <Text>
            这套 demo 不是普通 React 页面，而是为 SwiftUI 转换准备的受限 JSX 语义层。
          </Text>
          <Text foregroundStyle="secondary">
            所有组件都尽量贴 SwiftUI 的 view / modifier / state 形状。
          </Text>
          <HStack spacing={10}>
            <Image systemName="photo" />
            <VStack
              spacing={6}
              padding={12}
              background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
              alignment="leading"
            >
              <Text font="headline">图片预览卡</Text>
              <Text font="caption" foregroundStyle="secondary">
                image + caption + meta
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </FormSection>
    </VStack>
  )
}

const SplitViewLayouts: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Classic Split View">
        <HStack spacing={0} frame={{ maxWidth: 'infinity', minHeight: 380 }}>
          <VStack
            spacing={8}
            padding={14}
            frame={{ width: 240, maxHeight: 'infinity', alignment: 'leading' }}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
          >
            <Text font="headline">Sidebar</Text>
            <Button title="Inbox" buttonStyle="borderedProminent" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
            <Button title="Archive" buttonStyle="bordered" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
            <Button title="Drafts" buttonStyle="bordered" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
          </VStack>
          <Divider axis="vertical" />
          <VStack
            spacing={12}
            padding={18}
            frame={{ maxWidth: 'infinity', maxHeight: 'infinity', alignment: 'leading' }}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
          >
            <Text font="title3.semibold">Detail Panel</Text>
            <Text foregroundStyle="secondary">
              常见三段：toolbar / content / footer。适合 mail、chat、file browser。
            </Text>
            <Spacer />
            <HStack>
              <Button title="Cancel" buttonStyle="bordered" />
              <Button title="Save" buttonStyle="borderedProminent" />
            </HStack>
          </VStack>
        </HStack>
      </FormSection>
    </VStack>
  )
}

const DashboardLayouts: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Dashboard Cards">
        <VStack spacing={14} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <HStack spacing={14} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <MetricCard title="Messages" value="1,204" meta="+12 today" tone="blue" />
            <MetricCard title="Devices" value="14" meta="3 online" tone="green" />
            <MetricCard title="Images" value="298" meta="18 new" tone="red" />
          </HStack>
          <HStack spacing={14} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <FormSection title="Activity">
              <VStack spacing={8} alignment="leading">
                <GalleryRow title="sync peers" meta="09:14" />
                <GalleryRow title="save image" meta="09:21" />
                <GalleryRow title="revoke message" meta="09:36" />
              </VStack>
            </FormSection>
            <FormSection title="Quick Actions">
              <VStack spacing={10} alignment="leading">
                <Button title="Scan LAN" buttonStyle="borderedProminent" />
                <Button title="Open Downloads" buttonStyle="bordered" />
                <Button title="Rebuild Cache" buttonStyle="bordered" />
              </VStack>
            </FormSection>
          </HStack>
        </VStack>
      </FormSection>
    </VStack>
  )
}

const FormAndSheetLayouts: FC = () => {
  const profileName = useBinding('freewind')
  const profileBio = useBinding('喜欢先用 React 热更调 SwiftUI UI。')
  const sheetPresented = useBinding(false)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Form Layout">
        <VStack spacing={12} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <TextFieldRow label="username" text={profileName} placeholder="freewind" />
          <VStack spacing={6} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Text font="caption" foregroundStyle="secondary">
              bio
            </Text>
            <TextEditor text={profileBio} frame={{ height: 120, maxWidth: 'infinity' }} />
          </VStack>
          <HStack>
            <Spacer />
            <Button title="Preview Sheet" buttonStyle="borderedProminent" onPress={() => sheetPresented.setValue(true)} />
          </HStack>
        </VStack>
      </FormSection>

      <Sheet isPresented={sheetPresented}>
        <VStack
          spacing={14}
          padding={20}
          frame={{ width: 420, height: 250 }}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 20 } }}
        >
          <Text font="headline">Profile Preview</Text>
          <Text>{profileName.value}</Text>
          <Text foregroundStyle="secondary">{profileBio.value}</Text>
          <HStack>
            <Spacer />
            <Button title="Done" buttonStyle="borderedProminent" onPress={() => sheetPresented.setValue(false)} />
          </HStack>
        </VStack>
      </Sheet>
    </VStack>
  )
}

const QQDemo: FC = () => {
  const selectedTab = useBinding(0)
  const draft = useBinding('这里先做 SwiftUI 风格 JSX。')
  const scanLogsPresented = useBinding(true)

  return (
    <FormSection title="QQ / Chat Layout">
      <HStack frame={{ maxWidth: 'infinity', minHeight: 620 }} spacing={0}>
        <VStack
          spacing={0}
          frame={{ width: 320, maxHeight: 'infinity' }}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
        >
          <VStack spacing={0} frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
            {selectedTab.value === 0 ? <ContactsPaneMini scanLogsPresented={scanLogsPresented} /> : null}
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
        <ChatPanel draft={draft} />
      </HStack>
    </FormSection>
  )
}

const ContactsPaneMini: FC<{
  scanLogsPresented: ReturnType<typeof useBinding<boolean>>
}> = ({ scanLogsPresented }) => {
  return (
    <VStack spacing={0} frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
      <HStack padding={{ horizontal: 10, top: 4, bottom: 8 }}>
        <Text font="title3.semibold">联系人</Text>
        <Spacer />
        <Button title="扫描" buttonStyle="bordered" controlSize="small" />
      </HStack>
      <ScrollView frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
        <VStack spacing={10} padding={10}>
          {qqPeers.map(peer => (
            <PeerRow key={peer.id} peer={peer} />
          ))}
        </VStack>
      </ScrollView>
      <If when={scanLogsPresented.value}>
        <Divider />
        <VStack spacing={6} padding={{ horizontal: 10, vertical: 8 }} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text font="caption.semibold" foregroundStyle="secondary">
            扫描日志
          </Text>
          <Text font="caption2.monospaced">discover peer 192.168.1.20</Text>
          <Text font="caption2.monospaced">rebuild list done</Text>
        </VStack>
      </If>
    </VStack>
  )
}

const PeerRow: FC<{
  peer: {
    id: string
    name: string
    online: boolean
    pinned: boolean
    lastMessage: string
    platform: 'macos' | 'ios'
  }
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
            <Text font="headline.semibold">{peer.name}</Text>
            {peer.pinned ? <Image systemName="pin.fill" /> : null}
          </HStack>
          <Text font="caption" foregroundStyle="secondary">
            {peer.online ? '在线' : '离线'}
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

const MePaneMini: FC = () => {
  const draftDeviceName = useBinding('freewind-mac')

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

const ChatPanel: FC<{
  draft: ReturnType<typeof useBinding<string>>
}> = ({ draft }) => {
  const sheetPresented = useBinding(false)

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

const TodoDemo: FC = () => {
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

const EmojiDemo: FC = () => {
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

const ImageBrowserDemo: FC = () => {
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

const FileBrowserDemo: FC = () => {
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

const SwatchCard: FC<{
  title: string
  tone: 'blue' | 'green' | 'red'
  capsule?: boolean
  rectangle?: boolean
}> = ({ title, tone, capsule, rectangle }) => {
  return (
    <VStack
      spacing={10}
      padding={14}
      frame={{ width: 160, alignment: 'leading' }}
      background={{
        fill: tone,
        in: rectangle ? { kind: 'rectangle' } : capsule ? { kind: 'capsule' } : { kind: 'roundedRectangle', cornerRadius: 18 },
      }}
    >
      <Text foregroundColor="#ffffff" font="headline">
        {title}
      </Text>
      <Text foregroundColor="rgba(255,255,255,0.86)" font="caption">
        shape token
      </Text>
    </VStack>
  )
}

const GalleryRow: FC<{
  title: string
  meta: string
}> = ({ title, meta }) => {
  return (
    <HStack
      spacing={10}
      padding={12}
      frame={{ maxWidth: 'infinity', alignment: 'leading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
    >
      <VStack spacing={2} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text>{title}</Text>
        <Text font="caption" foregroundStyle="secondary">
          {meta}
        </Text>
      </VStack>
      <Label title="ready" systemImage="pin.fill" />
    </HStack>
  )
}

const MetricCard: FC<{
  title: string
  value: string
  meta: string
  tone: 'blue' | 'green' | 'red'
}> = ({ title, value, meta, tone }) => {
  return (
    <VStack
      spacing={6}
      padding={16}
      frame={{ width: 220, alignment: 'leading' }}
      background={{ fill: tone, in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
    >
      <Text foregroundColor="rgba(255,255,255,0.82)" font="caption">
        {title}
      </Text>
      <Text foregroundColor="#ffffff" font="title">
        {value}
      </Text>
      <Text foregroundColor="rgba(255,255,255,0.82)" font="caption">
        {meta}
      </Text>
    </VStack>
  )
}
