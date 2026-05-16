import type { TranslatorExportPacket } from './exporter'

export const buildSwiftUiDraft = (packet: TranslatorExportPacket | null): string => {
  if (!packet) {
    return '// no packet'
  }

  switch (packet.page.id) {
    case 'todo':
      return todoSwiftUiDraft(packet)
    case 'system-api':
      return systemApiSwiftUiDraft(packet)
    case 'qq':
      return qqSwiftUiDraft(packet)
    default:
      return fallbackSwiftUiDraft(packet)
  }
}

const todoSwiftUiDraft = (packet: TranslatorExportPacket) => {
  return `import SwiftUI

struct TodoDemoView: View {
    @State private var segment = "all"
    @State private var input = ""

    let items: [TodoItem] = [
        .init(title: "收敛 SwiftUI JSX DSL", done: true, tag: "arch"),
        .init(title: "补组件展厅", done: false, tag: "demo"),
        .init(title: "整理 JSX -> SwiftUI prompt", done: false, tag: "ai")
    ]

    var filteredItems: [TodoItem] {
        switch segment {
        case "done":
            return items.filter(\\.done)
        case "open":
            return items.filter { !$0.done }
        default:
            return items
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            Picker("", selection: $segment) {
                Text("全部").tag("all")
                Text("待办").tag("open")
                Text("完成").tag("done")
            }
            .pickerStyle(.segmented)

            HStack(spacing: 10) {
                TextField("new task", text: $input)
                    .textFieldStyle(.roundedBorder)

                Button("添加") {
                }
                .buttonStyle(.borderedProminent)
            }

            VStack(spacing: 8) {
                ForEach(filteredItems) { item in
                    HStack(spacing: 10) {
                        Image(systemName: item.done ? "pin.fill" : "doc")

                        VStack(alignment: .leading, spacing: 2) {
                            Text(item.title)
                            Text(item.tag)
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }

                        Spacer()

                        Text(item.done ? "done" : "open")
                            .font(.caption)
                            .foregroundStyle(item.done ? .green : .secondary)
                    }
                    .padding(12)
                    .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 14))
                }
            }
        }
        .padding(18)
    }
}

struct TodoItem: Identifiable {
    let id = UUID()
    let title: String
    let done: Bool
    let tag: String
}

// source intent: ${packet.page.intent}
`
}

const systemApiSwiftUiDraft = (packet: TranslatorExportPacket) => {
  return `import SwiftUI
import AppKit

struct SystemApiMockView: View {
    @StateObject private var env = MockEnvironmentModel()
    @State private var renameInput = "macos-device"
    @State private var createFileName = "draft.txt"
    @State private var createFolderName = "new-folder"
    @State private var selectedFolder = "/Downloads"

    var body: some View {
        VStack(alignment: .leading, spacing: 18) {
            GroupBox("AppSystemApi") {
                VStack(alignment: .leading, spacing: 12) {
                    Text("deviceId: \\(env.systemApi.loadIdentity().deviceId)")
                    Text("deviceName: \\(env.systemApi.loadIdentity().deviceName)")
                    Text("downloadRoot: \\(env.systemApi.makeDownloadRoot().path)")

                    HStack {
                        TextField("rename device", text: $renameInput)
                            .textFieldStyle(.roundedBorder)
                        Button("renameDevice") {
                            _ = env.systemApi.renameDevice(currentIdentity: env.systemApi.loadIdentity(), to: renameInput)
                        }
                        .buttonStyle(.borderedProminent)
                    }
                }
            }

            GroupBox("Mock File System") {
                VStack(alignment: .leading, spacing: 12) {
                    Picker("", selection: $selectedFolder) {
                        Text("Downloads").tag("/Downloads")
                        Text("Files").tag("/Downloads/peer-mac/files")
                        Text("Images").tag("/Downloads/peer-mac/images")
                    }
                    .pickerStyle(.segmented)

                    HStack {
                        TextField("new folder", text: $createFolderName)
                        Button("mkdir") {
                        }
                    }

                    HStack {
                        TextField("new file", text: $createFileName)
                        Button("touch") {
                        }
                        .buttonStyle(.borderedProminent)
                    }
                }
            }

            GroupBox("AppFileApi") {
                VStack(alignment: .leading, spacing: 12) {
                    Button("openAttachment") {
                    }
                    Button("revealAttachment") {
                    }
                    Button("saveIncomingFile") {
                    }
                    .buttonStyle(.borderedProminent)
                }
            }
        }
        .padding(18)
    }
}

@MainActor
final class MockEnvironmentModel: ObservableObject {
    let systemApi = AppSystemApi()
    let fileApi = AppFileApi(downloadRoot: FileManager.default.urls(for: .downloadsDirectory, in: .userDomainMask).first!)
}

// source intent: ${packet.page.intent}
`
}

const qqSwiftUiDraft = (packet: TranslatorExportPacket) => {
  return `import SwiftUI

struct QQDemoView: View {
    @StateObject private var shell = MockAppShell()
    @State private var selectedTab = 0
    @State private var draft = ""

    var body: some View {
        HStack(spacing: 0) {
            VStack(spacing: 0) {
                if selectedTab == 0 {
                    contactsPane
                } else if selectedTab == 1 {
                    attachmentPane(title: "图片", emptyText: "还没有收到图片")
                } else if selectedTab == 2 {
                    attachmentPane(title: "文件", emptyText: "还没有收到文件")
                } else {
                    mePane
                }

                Divider()

                Picker("", selection: $selectedTab) {
                    Text("联系人").tag(0)
                    Text("图片").tag(1)
                    Text("文件").tag(2)
                    Text("我").tag(3)
                }
                .pickerStyle(.segmented)
                .padding(10)
            }
            .frame(width: 320)

            Divider()

            if let digest = shell.openedDigest {
                chatPane(digest: digest)
            } else {
                VStack {
                    Text("未选中会话")
                    Text("从左侧选择联系人，或重新扫描。")
                        .foregroundStyle(.secondary)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
        }
    }

    var contactsPane: some View {
        VStack(spacing: 0) {
            HStack {
                Text("联系人")
                    .font(.title3.weight(.semibold))
                Spacer()
                Button("扫描") {
                    shell.scanNow()
                }
                .buttonStyle(.bordered)
                .controlSize(.small)
            }
            .padding(.horizontal, 10)
            .padding(.top, 4)
            .padding(.bottom, 8)

            ScrollView {
                VStack(spacing: 10) {
                    ForEach(shell.peerDigests) { digest in
                        Button {
                            shell.openPeer(digest.peer.deviceId)
                        } label: {
                            VStack(alignment: .leading, spacing: 8) {
                                HStack(spacing: 8) {
                                    Image(systemName: digest.peer.platform == .macos ? "laptopcomputer" : "iphone")
                                    VStack(alignment: .leading, spacing: 2) {
                                        HStack(spacing: 4) {
                                            Text(digest.peer.deviceName)
                                                .font(.headline)
                                            if digest.peer.pinnedAt != nil {
                                                Image(systemName: "pin.fill")
                                            }
                                        }
                                        Text(digest.peer.isOnline ? "在线" : "离线")
                                            .font(.caption)
                                            .foregroundStyle(.secondary)
                                    }
                                    Spacer()
                                }

                                Text(digest.lastMessagePreview)
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                            .padding(12)
                            .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 16))
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding(10)
            }
        }
    }

    func attachmentPane(title: String, emptyText: String) -> some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 12) {
                Text(title)
                    .font(.headline)
                Text(emptyText)
                    .foregroundStyle(.secondary)
            }
            .padding(14)
            .frame(maxWidth: .infinity, alignment: .leading)
        }
    }

    var mePane: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 12) {
                Text(shell.deviceName)
                    .font(.headline)
                Text("deviceId: \\(shell.deviceId)  logV: \\(shell.logDogVersion)")
                    .font(.caption2)
                    .foregroundStyle(.secondary)
                Text(shell.localAccessAddress)
                    .font(.caption2.monospaced())
                    .foregroundStyle(.secondary)
            }
            .padding(14)
        }
    }

    func chatPane(digest: PeerDigest) -> some View {
        VStack(spacing: 0) {
            HStack {
                Text(digest.peer.deviceName)
                    .font(.title3.weight(.semibold))
                Spacer()
                Button {
                    shell.closeOpenedPeer()
                } label: {
                    Image(systemName: "xmark")
                }
                .buttonStyle(.borderless)
            }
            .padding(.horizontal, 24)
            .padding(.vertical, 10)

            Divider()

            ScrollView {
                VStack(spacing: 14) {
                    ForEach(Array(shell.messages(for: digest.peer.deviceId).enumerated()), id: \\.element.messageId) { index, message in
                        HStack {
                            if index % 2 == 1 {
                                Spacer(minLength: 90)
                            }
                            VStack(alignment: .leading, spacing: 6) {
                                Text(message.textContent ?? message.fileName ?? "[附件]")
                                Text(message.status.rawValue)
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                            .padding(.horizontal, 14)
                            .padding(.vertical, 10)
                            .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 16))
                            if index % 2 == 0 {
                                Spacer(minLength: 90)
                            }
                        }
                    }
                }
                .padding(.horizontal, 20)
                .padding(.vertical, 18)
            }

            Divider()

            VStack(spacing: 12) {
                TextEditor(text: $draft)
                    .frame(height: 120)
                HStack {
                    Spacer()
                    Button("贴图") {
                        shell.sendClipboardImageFromPasteboard(to: digest.peer)
                    }
                    .buttonStyle(.bordered)
                    Button("选文件") {
                        shell.chooseFilesAndSend(to: digest.peer)
                    }
                    .buttonStyle(.bordered)
                    Button("发送") {
                        shell.sendText(to: digest.peer, text: draft)
                        draft = ""
                    }
                    .buttonStyle(.borderedProminent)
                }
            }
            .padding(20)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

final class MockAppShell: ObservableObject {
    @Published var peerDigests: [PeerDigest] = []
    @Published var openedDigest: PeerDigest?
    let deviceId = "mock-device-001"
    let deviceName = "macos-device"
    let logDogVersion = 1
    let localAccessAddress = "192.168.1.8:50321"

    func openPeer(_ peerDeviceId: String) {}
    func closeOpenedPeer() {}
    func scanNow() {}
    func messages(for peerDeviceId: String) -> [ChatMessage] { [] }
    func chooseFilesAndSend(to peer: Peer) {}
    func sendClipboardImageFromPasteboard(to peer: Peer) {}
    func sendText(to peer: Peer, text: String) {}
}

// source intent: ${packet.page.intent}
`
}

const fallbackSwiftUiDraft = (packet: TranslatorExportPacket) => {
  return `// Unsupported packet id: ${packet.page.id}
// intent: ${packet.page.intent}
// components: ${packet.components.join(', ')}
// modifiers: ${packet.modifiers.join(', ')}
`
}
