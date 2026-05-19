## Meta

- last_commit: `ddfb0bd`

## 要求

由于我们这边是用React形式复刻SwiftUI的原生的组件，方便之后转换。所以当我们要修改什么功能的时候，不允许修改组件的名字和接口，比如参数、参数、可选值等等。
- 强约束：`src/swift/*`，尤其 `src/swift/components/*` 下的组件，在“转换到 SwiftUI / 生成 SwiftUI / 做 translator 映射”时，一律视为“SwiftUI 原生组件签名声明”。
- 转换时只看组件签名：
  - 组件名
  - props / 参数名
  - 可选值
  - children / slot 结构
  - `Binding` / state 语义
- 转换时禁止把组件内部浏览器实现细节当作 SwiftUI 语义来源：
  - 禁看内部 `div/input/button/span/img/iframe`
  - 禁看内部 DOM 层级 / CSS / 定位 / portal / runtime hack
  - 禁按内部 mock 实现去推导 SwiftUI 结构
- 这些内部细节只服务浏览器预演；对 SwiftUI 转换来说，它们都是 impl detail，不是协议面。

## 数据结构与分层

### 核心数据总览

- 这个仓库不是普通 React 站点。核心目标是：用受限 JSX 模拟 SwiftUI/macOS UI 与系统边界，再导出给 AI/代码生成器转 SwiftUI。
- 共享核心数据分 4 层：
  - UI DSL 层：`src/swift/*`
  - mock app/system/file 层：`src/mock-system/index.tsx`
  - translator 规约/导出/草稿生成层：`src/translator/*`
  - demo 入口层：`src/demo/DemoHub.tsx`

### 关键对象 shape

- `Binding<T>`
  - 位置：`src/swift/runtime.tsx`
  - 形状：
  ```ts
  { value: T; setValue: (next: T) => void }
  ```
  - 用途：模拟 SwiftUI `@State/@Binding`

- `MockFileNode`
  - 位置：`src/mock-system/index.tsx`
  - 形状：
  ```ts
  {
    path: string
    fileName: string
    kind: 'folder' | 'file' | 'image'
    mimeType: string
    data: string
    children?: MockFileNode[]
  }
  ```
  - 示例：
  ```ts
  {
    path: '/Downloads/peer-mac/files/brief.md',
    fileName: 'brief.md',
    kind: 'file',
    mimeType: 'text/markdown',
    data: '# brief'
  }
  ```

- `ChatMessage`
  - 位置：`src/mock-system/index.tsx`
  - 形状：
  ```ts
  {
    messageId: string
    conversationId: string
    kind: 'text' | 'image' | 'file'
    status: 'pending' | 'sending' | 'sent' | 'failed' | 'saved' | 'receiving' | 'revoked'
    filePath?: string
    fileName?: string
    textContent?: string
  }
  ```

- `Peer` / `PeerDigest`
  - 位置：`src/mock-system/index.tsx`
  - 形状：
  ```ts
  Peer {
    deviceId: string
    deviceName: string
    platform: 'macos' | 'ios'
    isOnline: boolean
    pinnedAt: number | null
  }

  PeerDigest {
    peer: Peer
    lastMessagePreview: string
  }
  ```

- `MockEnvironment`
  - 位置：`src/mock-system/index.tsx`
  - 持有：
    - `identity`
    - `downloadRoot`
    - `files`
    - `recentEvents`
    - `systemApi`
    - `fileApi`
    - `appShell`
  - 还暴露 mock FS 修改入口：
    - `createFile`
    - `renamePath`
    - `removePath`
    - `listFolder`
    - `setClipboardPath`
    - `setPickedFiles`

- `AppShell`
  - 位置：`src/mock-system/index.tsx`
  - 这是 mock 业务 facade。别的 AI 若要做聊天/联系人/附件行为，优先复用它，不要绕过。
  - 核心字段：
  ```ts
  {
    deviceId
    deviceName
    logDogVersion
    peerDigests
    openedDigest
    openedPeerId
    isScanLogsPresented
    scanLogs
    downloadRoot
    localAccessAddress
  }
  ```
  - 核心 op：
    - `openPeer`
    - `closeOpenedPeer`
    - `scanNow`
    - `renameDevice`
    - `togglePinned`
    - `hidePeer`
    - `clearChat`
    - `messages`
    - `sendText`
    - `chooseFilesAndSend`
    - `sendClipboardImageFromPasteboard`
    - `saveMessageAttachment`
    - `revealMessageAttachment`
    - `openMessageAttachment`
    - `openDirectory`

- `TranslatorExportPacket`
  - 位置：`src/translator/exporter.ts`
  - 形状：
  ```ts
  {
    page: { id; title; intent }
    constraints: string[]
    mappings: { jsx; swiftui }[]
    stateModels: string[]
    apiFacades: string[]
    components: string[]
    modifiers: string[]
    fewShot: ...
    prompt: string
    jsxSource: string
  }
  ```
  - 用途：不要把整段源码直接喂 AI，先导出这个包。

### 合法修改入口

- UI/布局/样式语义：改 `src/swift/runtime.tsx`
- 原生组件目录化实现：优先改 `src/swift/components/<Component>/`
- 高阶控件封装：改 `src/swift/controls.tsx`
- mock 业务/系统/file 行为：改 `src/mock-system/index.tsx`
- 翻译规则：改 `src/translator/spec.ts`
- 导出结构：改 `src/translator/exporter.ts`
- SwiftUI 草稿生成：改 `src/translator/codegen.ts`
- demo 页面与展示：改 `src/demo/DemoHub.tsx`

### service 与流程

- `swiftui runtime`
  - 负责把受限 JSX 组件映射到浏览器内部实现
  - 业务层禁止直接写 DOM/CSS

- `mock-system`
  - 负责内存态文件系统、设备身份、剪贴板、pickFiles、下载目录、聊天 facade
  - async/IO 在这里都用 mock/in-memory 表达

- `translator`
  - `spec.ts`：约束、映射、prompt、few-shot
  - `exporter.ts`：按页面导出结构化 AI 输入包
  - `codegen.ts`：从 export packet 先生成一版 SwiftUI draft

- `demo`
  - 负责把真实 Swift 源、mock 预览、translator packet、SwiftUI draft 放在一起对照

### gateway / edge

- 这个仓库当前没有真实 DB / 网络 / 文件 IO。
- “IO” 全在 mock 层，用内存数据模拟。
- 唯一读取真实外部代码的边界：
  - `src/demo/DemoHub.tsx` 用 `?raw` 直接加载 `/Users/peng.li/workspace/freewind-qq/native/macos` 里的 Swift 源文件。

### 约束与禁做项

- 用户层禁原生 DOM 标签、禁 CSS、禁外部 UI 组件。
- 新增 demo 或功能，优先复用 DSL 组件，不要在业务层写 `style/className`。
- `src/swift/components` 下原生组件用目录收敛：
  - `src/swift/components/<Component>/<Component>.tsx`
  - `src/swift/components/<Component>/<Component>.demo.tsx`
  - `src/swift/components/<Component>/index.ts`
- `src/swift/*` 下组件对 translator / codegen 的主要意义是“签名与语义映射”，不是内部 DOM 实现。
- `Custom Components` 只能组合 `src/swift/components/*` 暴露的原生 DSL 组件。
- `Custom Components` 禁直接依赖原生 DOM、禁外部 UI 库、禁绕过 DSL 直接吃 runtime 内部 helper。
- 新增系统能力，优先加 mock facade，再决定 demo 如何消费。
- 做 SwiftUI 转换相关工作，优先改 translator 层，不要把 prompt 散落在 demo 组件里。
- 若真实 Swift 源暴露出 DSL 缺口，优先补 runtime/mock，而不是在 demo 里硬绕。

## 功能

### 目标

- 给 AI 和人一个“SwiftUI 兼容 React 预演场”。
- 先用 React HMR 快速调 UI。
- 再用结构化 translator packet + SwiftUI draft 降低最终转 SwiftUI 的不稳定性。

### 整体布局

- 入口：`src/demo/DemoHub.tsx`
- 左侧固定 sidebar：
  - theme 切换 `Light/Dark`
  - demo 分类切换 `组件/布局/案例`
  - 当前分类下的页面列表
- 右侧主内容区：
  - 顶部 hero
  - 当前 demo 页面内容
- 全局还有 `Demo Notes` sheet

### 主要页面

- `组件总览`
  - 展示文字、按钮、shape、native-ish control
  - 用来校验 token、布局、基础交互

- `控件状态`
  - 展示 `Picker/TextField/TextEditor/Sheet`
  - 用来校验 `useBinding`

- `转换规约`
  - 展示 DSL 约束
  - 展示 JSX -> SwiftUI 映射
  - 展示 prompt 模板与 few-shot
  - 可选页面导出 `TranslatorExportPacket`
  - 可直接看 repo 生成的 `SwiftUI Draft`

- `真实 Swift 代码`
  - 直接显示 `freewind-qq/native/macos` 的真实 Swift 源码
  - 当前接入：
    - `RootView.swift`
    - `ChatScreen.swift`
    - `ComposerTextView.swift`
  - 下方同时展示 mock 预览、export packet、SwiftUI draft

- `QQ 聊天`
  - 这是最重要的案例页
  - 左侧联系人/标签页
  - 右侧聊天区
  - 走 `useMockAppShell`
  - 发文本、贴图、选文件、开附件、存附件、扫描日志都是真 mock 交互

- `系统 API Mock`
  - 展示 `AppSystemApi` / `AppFileApi`
  - 可操作 fake FS：mkdir/touch/delete/reveal
  - 可看 recent mock events

- `Todo / Emoji / 图片浏览器 / 文件浏览器 / 布局页`
  - 用来覆盖常见 UI 结构与转换样例

### 关键交互流程

- JSX -> AI 输入
  1. 选页面
  2. `buildTranslatorExportPacket(pageId)`
  3. 得到结构化 packet
  4. packet + prompt + few-shot 喂 AI

- JSX -> repo 内置 SwiftUI draft
  1. 选页面
  2. `buildTranslatorExportPacket(pageId)`
  3. `buildSwiftUiDraft(packet)`
  4. 得到一版可读草稿，AI 再细修

- QQ demo 交互
  1. `useMockAppShell()` 取 facade
  2. 联系人区调 `openPeer / scanNow / togglePinned`
  3. 聊天区调 `messages / sendText / chooseFilesAndSend / sendClipboardImageFromPasteboard`
  4. 附件区调 `saveMessageAttachment / openMessageAttachment / revealMessageAttachment`

### 用户可见结果

- 能在一个页面里同时看到：
  - 真实 Swift 源
  - 对应 mock 预览
  - AI 输入包
  - SwiftUI 草稿
- 能快速判断：
  - 这块 SwiftUI 实际长什么样
  - 当前 DSL 是否已覆盖
  - 缺什么 runtime/mock/system facade
  - 当前 AI 输入是否足够稳

### 边界与限制

- 当前 `SwiftUI draft codegen` 是模板/草稿级，不是完整编译器。
- 当前 translator packet 仍是手写页面 metadata，不是从源码 AST 自动抽。
- 当前 mock system/file/app shell 只覆盖已知高频能力；不是完整 macOS API。
- 当前真实 Swift 源是只读展示，不会自动反向生成 JSX。
