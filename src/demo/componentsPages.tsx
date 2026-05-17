import type { FC } from 'react'
import {
  Button,
  ContextMenu,
  Divider,
  DropArea,
  FormSection,
  GeometryReader,
  HStack,
  Image,
  Label,
  LazyHStack,
  Picker,
  ScrollView,
  ScrollViewReader,
  Sheet,
  Spacer,
  Text,
  TextEditor,
  TextFieldRow,
  WindowAccessor,
  useBinding,
  VStack,
} from '../swiftui'
import { Chip, GalleryRow, SwatchCard } from './shared'

export const TextComponentDemo: FC = () => {
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
          <Text foregroundStyle="red">red foreground</Text>
          <Text foregroundStyle="green">green foreground</Text>
          <Text foregroundStyle="accentColor">accentColor foreground</Text>
          <Text multilineTextAlignment="center" frame={{ maxWidth: 'infinity' }}>
            centered multiline text
          </Text>
        </VStack>
      </FormSection>
    </VStack>
  )
}

export const ButtonComponentDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="buttonStyle">
        <VStack spacing={10} alignment="leading">
          <Button title="plain button" buttonStyle="plain" />
          <Button title="bordered button" buttonStyle="bordered" />
          <Button title="prominent button" buttonStyle="borderedProminent" />
          <Button title="borderless button" buttonStyle="borderless" />
          <Button title="link style button" buttonStyle="link" />
        </VStack>
      </FormSection>

      <FormSection title="controlSize / disabled">
        <HStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Button title="mini" buttonStyle="bordered" controlSize="mini" />
          <Button title="small" buttonStyle="bordered" controlSize="small" />
          <Button title="regular" buttonStyle="bordered" controlSize="regular" />
          <Button title="large" buttonStyle="borderedProminent" controlSize="large" />
          <Button title="disabled" buttonStyle="borderedProminent" disabled />
        </HStack>
      </FormSection>
    </VStack>
  )
}

export const ImageLabelComponentDemo: FC = () => {
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

      <FormSection title="Label">
        <VStack spacing={10} alignment="leading">
          <Label title="photo file" systemImage="photo" />
          <Label title="document file" systemImage="doc" />
          <Label title="pinned item" systemImage="pin.fill" />
        </VStack>
      </FormSection>
    </VStack>
  )
}

export const InputComponentDemo: FC = () => {
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

export const LayoutComponentDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="VStack / HStack / Spacer / Divider">
        <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <HStack
            spacing={12}
            padding={12}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
            frame={{ maxWidth: 'infinity' }}
          >
            <Text>A</Text>
            <Spacer />
            <Text>B</Text>
            <Divider axis="vertical" />
            <Text>C</Text>
          </HStack>

          <VStack
            spacing={8}
            padding={12}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
            frame={{ maxWidth: 'infinity', alignment: 'leading' }}
          >
            <Text>row 1</Text>
            <Divider />
            <Text>row 2</Text>
            <Divider />
            <Text>row 3</Text>
          </VStack>
        </VStack>
      </FormSection>

      <FormSection title="LazyHStack">
        <ScrollView axes="horizontal" frame={{ maxWidth: 'infinity' }}>
          <LazyHStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Chip title="LazyHStack" />
            <Chip title="Horizontal" />
            <Chip title="Scrollable" />
            <Chip title="Token Friendly" />
          </LazyHStack>
        </ScrollView>
      </FormSection>
    </VStack>
  )
}

export const ContainerComponentDemo: FC = () => {
  const sheetPresented = useBinding(false)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="ScrollView">
        <ScrollView frame={{ height: 180, maxWidth: 'infinity' }}>
          <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            {Array.from({ length: 10 }).map((_, index) => (
              <GalleryRow key={String(index)} title={`scroll row ${String(index + 1)}`} meta="vertical scroll content" />
            ))}
          </VStack>
        </ScrollView>
      </FormSection>

      <FormSection title="Sheet / ContextMenu">
        <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Button title="打开 Sheet" buttonStyle="borderedProminent" onPress={() => sheetPresented.setValue(true)} />
          <ContextMenu
            items={[
              { title: '置顶' },
              { title: '清空聊天' },
              { title: '删除' },
            ]}
          >
            <Button title="contextMenu trigger" buttonStyle="bordered" />
          </ContextMenu>
        </VStack>
        <Sheet isPresented={sheetPresented}>
          <VStack
            spacing={12}
            padding={20}
            frame={{ width: 360, height: 220 }}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 20 } }}
          >
            <Text font="headline">Sheet 内容</Text>
            <Text foregroundStyle="secondary">这里展示 modal 容器、按钮区、层级关系。</Text>
            <HStack>
              <Spacer />
              <Button title="关闭" buttonStyle="borderedProminent" onPress={() => sheetPresented.setValue(false)} />
            </HStack>
          </VStack>
        </Sheet>
      </FormSection>
    </VStack>
  )
}

export const ShapeTokenComponentDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
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

      <FormSection title="Shapes / Material">
        <HStack spacing={12}>
          <SwatchCard title="Rounded" tone="blue" />
          <SwatchCard title="Capsule" tone="green" capsule />
          <SwatchCard title="Rect" tone="red" rectangle />
        </HStack>
      </FormSection>

      <FormSection title="Row Cards">
        <VStack spacing={8}>
          <GalleryRow title="MessageBubble" meta="thinMaterial + padding + caption" />
          <GalleryRow title="SidebarRow" meta="HStack + Spacer + secondary text" />
          <GalleryRow title="InspectorRow" meta="leading align + divider stack" />
        </VStack>
      </FormSection>
    </VStack>
  )
}

export const NativeMockComponentDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="GeometryReader">
        <GeometryReader
          padding={12}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
          frame={{ maxWidth: 'infinity' }}
        >
          {proxy => (
            <VStack spacing={8} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              <Text font="headline">GeometryReader</Text>
              <Text font="caption2.monospaced">
                width: {String(proxy.size.width)} height: {String(proxy.size.height)}
              </Text>
            </VStack>
          )}
        </GeometryReader>
      </FormSection>

      <FormSection title="ScrollViewReader">
        <ScrollViewReader
          padding={12}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
          frame={{ maxWidth: 'infinity' }}
        >
          {proxy => (
            <HStack>
              <Text>ScrollViewReader mock</Text>
              <Spacer />
              <Button title="scrollTo(bottom)" buttonStyle="bordered" onPress={() => proxy.scrollTo('bottom', { anchor: 'bottom' })} />
            </HStack>
          )}
        </ScrollViewReader>
      </FormSection>

      <FormSection title="DropArea / WindowAccessor">
        <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <DropArea
            padding={12}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
            frame={{ maxWidth: 'infinity' }}
            onDrop={() => {}}
          >
            <Text>DropArea mock，对应 SwiftUI `onDrop` 语义。</Text>
          </DropArea>

          <VStack
            spacing={8}
            padding={12}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
            frame={{ maxWidth: 'infinity', alignment: 'leading' }}
          >
            <Text font="headline">WindowAccessor</Text>
            <Text foregroundStyle="secondary">对应 `NSViewRepresentable` bridge 的最小 mock。</Text>
            <WindowAccessor onResolve={window => void window.title} />
          </VStack>
        </VStack>
      </FormSection>
    </VStack>
  )
}
