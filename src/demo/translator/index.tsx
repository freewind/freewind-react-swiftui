import type { FC } from 'react'
import { Button, ForEach, FormSection, HStack, Picker, ScrollView, Text, VStack, useBinding } from '../../swift'
import { GroupBox } from '../../swift/components/GroupBox'
import { buildSwiftUiDraft, buildTranslatorExportPacket, translatorPageRegistry } from '../../translator'

type CapabilitySection = {
  title: string
  rows: Array<{
    name: string
    status: 'aligned' | 'stub' | 'gap'
    note: string
  }>
}

const sections: CapabilitySection[] = [
  {
    title: 'DynamicProperty / Environment',
    rows: [
      { name: 'State / Binding / StateObject', status: 'aligned', note: '本地状态、引用对象、binding 基本走通。' },
      { name: 'ObservedObject', status: 'stub', note: '当前用本地对象模拟观察，未接真实发布链。' },
      { name: 'EnvironmentObject / FocusedValues / OpenURLAction', status: 'aligned', note: '已支持 provider 注入、focus 值、openURL mock。' },
      { name: 'SceneStorage / AppStorage', status: 'stub', note: '基于内存 map 持久化，不接真实 scene/app 生命周期。' },
    ],
  },
  {
    title: 'Scene / Document',
    rows: [
      { name: 'WindowGroup / Scene / Commands', status: 'aligned', note: 'id/title/default size 等高价值参数已补。' },
      { name: 'DocumentGroup / FileDocument', status: 'aligned', note: '支持 open/save/new/selection，多文档仍是 mock shell。' },
      { name: 'NavigationPath / ScrollPosition', status: 'stub', note: '有参数与绑定面，行为仍偏轻量。' },
      { name: '真实文件 / OS API', status: 'gap', note: '仍坚持内存态 mock，不做真实 IO。' },
    ],
  },
  {
    title: 'Control / Container',
    rows: [
      { name: 'TextField / SecureField / TextEditor', status: 'aligned', note: '已补 focus/onSubmit/submitLabel 等常用接口。' },
      { name: 'Toggle / Slider / Stepper / Picker', status: 'aligned', note: 'label/valueLabel/control 语义更接近 SwiftUI。' },
      { name: 'List / Table / Grid / OutlineGroup / TabView', status: 'stub', note: '组件已存在，需继续补更细参数与默认行为。' },
      { name: 'Alert / Sheet / Popover / ConfirmationDialog', status: 'stub', note: '展示和交互可跑，未完全对齐平台边缘细节。' },
    ],
  },
]

const statusText: Record<CapabilitySection['rows'][number]['status'], string> = {
  aligned: '已对齐',
  stub: 'stub',
  gap: '缺口',
}

const statusStyle: Record<CapabilitySection['rows'][number]['status'], 'green' | 'blue' | 'red'> = {
  aligned: 'green',
  stub: 'blue',
  gap: 'red',
}

const categoryOptions = [
  { label: '规约', value: 'translator' },
  { label: '案例', value: 'app' },
  { label: '组件', value: 'component' },
] as const

export const TranslatorSpecDemo: FC = () => {
  const categorySelection = useBinding<(typeof categoryOptions)[number]['value']>('translator')
  const pageSelection = useBinding('translator')
  const pageOptions = translatorPageRegistry.filter(item => item.page.category === categorySelection.value)
  const selectedPage = pageOptions.find(item => item.page.id === pageSelection.value) ?? pageOptions[0] ?? translatorPageRegistry[0]
  const packet = buildTranslatorExportPacket(selectedPage.page.id)
  const swiftUiDraft = buildSwiftUiDraft(packet)
  const coverageRows = [
    { title: 'Aligned', items: selectedPage.coverage?.aligned ?? [], tone: 'green' as const },
    { title: 'Stub', items: selectedPage.coverage?.stub ?? [], tone: 'blue' as const },
    { title: 'Gap', items: selectedPage.coverage?.gap ?? [], tone: 'red' as const },
  ]

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="转换规约">
        <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text>目标：先把 JSX DSL/runtime/mock 语义压到足够像 SwiftUI/OpenSwiftUI，再喂 AI 转 SwiftUI。</Text>
          <Text font="caption" foregroundStyle="secondary">
            当前 translator 真导出层仍缺；这里先给 AE/AI 一份能力差异面板，判断哪些页面可直接转，哪些仍需补 runtime/mock。
          </Text>
          <Picker
            selection={categorySelection}
            pickerStyle="segmented"
            options={categoryOptions.map(item => ({
              label: item.label,
              value: item.value,
            }))}
          />
          <ScrollView axes={['horizontal']} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <HStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              {pageOptions.map(item => (
                <Button
                  key={item.page.id}
                  title={item.page.title}
                  buttonStyle={item.page.id === selectedPage.page.id ? 'borderedProminent' : 'bordered'}
                  onPress={() => pageSelection.setValue(item.page.id)}
                />
              ))}
            </HStack>
          </ScrollView>
          <Picker
            selection={pageSelection}
            pickerStyle="segmented"
            options={pageOptions.map(item => ({
              label: item.page.title,
              value: item.page.id,
            }))}
            labelsHidden
          />
        </VStack>
      </FormSection>
      <GroupBox title="Selected Page Meta" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text>{selectedPage.page.intent}</Text>
          <Text font="caption" foregroundStyle="secondary">
            components: {selectedPage.components.join(', ')}
          </Text>
          <Text font="caption" foregroundStyle="secondary">
            modifiers: {selectedPage.modifiers.join(', ')}
          </Text>
          <Text font="caption" foregroundStyle="secondary">
            api facades: {selectedPage.apiFacades.join(', ')}
          </Text>
          <HStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            {coverageRows.map(section => (
              <VStack
                key={section.title}
                spacing={6}
                padding={12}
                frame={{ maxWidth: 'infinity', alignment: 'leading' }}
                background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
              >
                <Text font="caption.semibold" foregroundStyle={section.tone}>
                  {section.title}
                </Text>
                {section.items.length ? (
                  section.items.map(item => (
                    <Text key={item} font="caption" foregroundStyle="secondary">
                      {item}
                    </Text>
                  ))
                ) : (
                  <Text font="caption" foregroundStyle="secondary">
                    none
                  </Text>
                )}
              </VStack>
            ))}
          </HStack>
        </VStack>
      </GroupBox>
      <ForEach
        each={sections}
        keyBy={section => section.title}
      >
        {section => (
          <FormSection title={section.title}>
            <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              <ForEach
                each={section.rows}
                keyBy={row => row.name}
              >
                {row => (
                  <HStack
                    spacing={12}
                    padding={12}
                    frame={{ maxWidth: 'infinity', alignment: 'leading' }}
                    background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
                  >
                    <VStack spacing={4} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
                      <Text font="headline">{row.name}</Text>
                      <Text font="caption" foregroundStyle="secondary">
                        {row.note}
                      </Text>
                    </VStack>
                    <Text font="caption.semibold" foregroundStyle={statusStyle[row.status]}>
                      {statusText[row.status]}
                    </Text>
                  </HStack>
                )}
              </ForEach>
            </VStack>
          </FormSection>
        )}
      </ForEach>
      <HStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <GroupBox title="Export Packet" frame={{ maxWidth: 'infinity', minHeight: 320, alignment: 'leading' }}>
          <ScrollView axes={['horizontal', 'vertical']} frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
            <Text monospaced textSelection="enabled" font="caption2.monospaced">
              {JSON.stringify(packet, null, 2)}
            </Text>
          </ScrollView>
        </GroupBox>
        <GroupBox title="SwiftUI Draft" frame={{ maxWidth: 'infinity', minHeight: 320, alignment: 'leading' }}>
          <ScrollView axes={['horizontal', 'vertical']} frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
            <Text monospaced textSelection="enabled" font="caption2.monospaced">
              {swiftUiDraft}
            </Text>
          </ScrollView>
        </GroupBox>
      </HStack>
    </VStack>
  )
}
