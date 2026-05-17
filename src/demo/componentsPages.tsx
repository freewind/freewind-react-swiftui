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
  RoundedRectangle,
  ScrollView,
  ScrollViewReader,
  Sheet,
  Spacer,
  Text,
  TextEditor,
  TextField,
  WindowAccessor,
  useBinding,
  VStack,
  type ButtonStyleToken,
  type ControlSizeToken,
  type FontToken,
  type ForegroundStyleToken,
  type TextAlign,
} from '../swiftui'
import { BoolField, EnumField, NumberField, PlaygroundSection, StringField, toBoolBinding, toNumber, useBoolBinding } from './playground'
import { Chip, GalleryRow } from './shared'

const fontOptions: Array<{ label: string; value: FontToken }> = [
  { label: 'largeTitle', value: 'largeTitle' },
  { label: 'title', value: 'title' },
  { label: 'title2', value: 'title2' },
  { label: 'headline', value: 'headline' },
  { label: 'body', value: 'body' },
  { label: 'caption', value: 'caption' },
  { label: 'mono', value: 'caption2.monospaced' },
]

const foregroundOptions: Array<{ label: string; value: ForegroundStyleToken }> = [
  { label: 'primary', value: 'primary' },
  { label: 'secondary', value: 'secondary' },
  { label: 'tertiary', value: 'tertiary' },
  { label: 'red', value: 'red' },
  { label: 'green', value: 'green' },
  { label: 'blue', value: 'blue' },
  { label: 'accent', value: 'accentColor' },
]

export const TextComponentDemo: FC = () => {
  const content = useBinding('SwiftUI-shaped JSX text preview')
  const font = useBinding<FontToken>('title2')
  const foreground = useBinding<ForegroundStyleToken>('accentColor')
  const align = useBinding<TextAlign>('leading')
  const italic = useBoolBinding(false)
  const mono = useBoolBinding(false)
  const selectable = useBoolBinding(true)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <VStack spacing={8} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text font="largeTitle">largeTitle</Text>
          <Text font="title">title</Text>
          <Text font="title2">title2</Text>
          <Text font="title3.semibold">title3.semibold</Text>
          <Text font="headline">headline</Text>
          <Text font="body">body</Text>
          <Text font="caption" foregroundStyle="secondary">caption secondary</Text>
          <Text font="caption2.monospaced" textSelection="enabled">caption2.monospaced selectable</Text>
        </VStack>
      </FormSection>

      <PlaygroundSection
        title="Text Playground"
        preview={
          <Text
            font={font.value}
            foregroundStyle={foreground.value}
            italic={toBoolBinding(italic)}
            monospaced={toBoolBinding(mono)}
            textSelection={toBoolBinding(selectable) ? 'enabled' : 'disabled'}
            multilineTextAlignment={align.value}
            frame={{ maxWidth: 'infinity' }}
          >
            {content.value}
          </Text>
        }
        form={
          <>
            <StringField label="children" binding={content} />
            <EnumField label="font" binding={font} options={fontOptions} />
            <EnumField label="foregroundStyle" binding={foreground} options={foregroundOptions} />
            <EnumField
              label="multilineTextAlignment"
              binding={align}
              options={[
                { label: 'leading', value: 'leading' },
                { label: 'center', value: 'center' },
                { label: 'trailing', value: 'trailing' },
              ]}
            />
            <BoolField label="italic" binding={italic} />
            <BoolField label="monospaced" binding={mono} />
            <BoolField label="textSelection" binding={selectable} />
          </>
        }
      />
    </VStack>
  )
}

export const ButtonComponentDemo: FC = () => {
  const title = useBinding('Send')
  const buttonStyle = useBinding<ButtonStyleToken>('borderedProminent')
  const controlSize = useBinding<ControlSizeToken>('regular')
  const disabled = useBoolBinding(false)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <VStack spacing={10} alignment="leading">
          <Button title="plain button" buttonStyle="plain" />
          <Button title="bordered button" buttonStyle="bordered" />
          <Button title="prominent button" buttonStyle="borderedProminent" />
          <Button title="borderless button" buttonStyle="borderless" />
          <Button title="link style button" buttonStyle="link" />
        </VStack>
      </FormSection>

      <PlaygroundSection
        title="Button Playground"
        preview={<Button title={title.value} buttonStyle={buttonStyle.value} controlSize={controlSize.value} disabled={toBoolBinding(disabled)} />}
        form={
          <>
            <StringField label="title" binding={title} />
            <EnumField
              label="buttonStyle"
              binding={buttonStyle}
              options={[
                { label: 'plain', value: 'plain' },
                { label: 'bordered', value: 'bordered' },
                { label: 'prominent', value: 'borderedProminent' },
                { label: 'borderless', value: 'borderless' },
                { label: 'link', value: 'link' },
              ]}
            />
            <EnumField
              label="controlSize"
              binding={controlSize}
              options={[
                { label: 'mini', value: 'mini' },
                { label: 'small', value: 'small' },
                { label: 'regular', value: 'regular' },
                { label: 'large', value: 'large' },
              ]}
            />
            <BoolField label="disabled" binding={disabled} />
          </>
        }
      />
    </VStack>
  )
}

export const ImageComponentDemo: FC = () => {
  const systemName = useBinding('iphone')
  const resizable = useBoolBinding(false)
  const scaledToFit = useBoolBinding(false)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <HStack spacing={12}>
          <Image systemName="iphone" />
          <Image systemName="laptopcomputer" />
          <Image systemName="pin.fill" />
          <Image systemName="photo" />
          <Image systemName="doc" />
        </HStack>
      </FormSection>
      <PlaygroundSection
        title="Image Playground"
        preview={
          <Image
            systemName={systemName.value}
            resizable={toBoolBinding(resizable)}
            scaledToFit={toBoolBinding(scaledToFit)}
            padding={8}
            background={{ fill: 'tertiary', in: { kind: 'roundedRectangle', cornerRadius: 12 } }}
          />
        }
        form={
          <>
            <StringField label="systemName" binding={systemName} />
            <BoolField label="resizable" binding={resizable} />
            <BoolField label="scaledToFit" binding={scaledToFit} />
          </>
        }
      />
    </VStack>
  )
}

export const LabelComponentDemo: FC = () => {
  const title = useBinding('photo file')
  const systemImage = useBinding('photo')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <VStack spacing={10} alignment="leading">
          <Label title="photo file" systemImage="photo" />
          <Label title="document file" systemImage="doc" />
          <Label title="pinned item" systemImage="pin.fill" />
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="Label Playground"
        preview={<Label title={title.value} systemImage={systemImage.value} />}
        form={
          <>
            <StringField label="title" binding={title} />
            <StringField label="systemImage" binding={systemImage} />
          </>
        }
      />
    </VStack>
  )
}

export const PickerComponentDemo: FC = () => {
  const selection = useBinding<'all' | 'online' | 'offline'>('all')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <Picker
          selection={selection}
          pickerStyle="segmented"
          options={[
            { label: '全部', value: 'all' },
            { label: '在线', value: 'online' },
            { label: '离线', value: 'offline' },
          ]}
        />
      </FormSection>
      <PlaygroundSection
        title="Picker Playground"
        preview={
          <VStack spacing={8} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Picker
              selection={selection}
              pickerStyle="segmented"
              options={[
                { label: '全部', value: 'all' },
                { label: '在线', value: 'online' },
                { label: '离线', value: 'offline' },
              ]}
            />
            <Text foregroundStyle="secondary">selection: {selection.value}</Text>
          </VStack>
        }
        form={
          <EnumField
            label="selection"
            binding={selection}
            options={[
              { label: 'all', value: 'all' },
              { label: 'online', value: 'online' },
              { label: 'offline', value: 'offline' },
            ]}
          />
        }
      />
    </VStack>
  )
}

export const TextFieldComponentDemo: FC = () => {
  const text = useBinding('freewind-mac')
  const placeholder = useBinding('input device name')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <TextField text={text} placeholder="input device name" textFieldStyle="roundedBorder" frame={{ maxWidth: 'infinity' }} />
      </FormSection>
      <PlaygroundSection
        title="TextField Playground"
        preview={<TextField text={text} placeholder={placeholder.value} textFieldStyle="roundedBorder" frame={{ maxWidth: 'infinity' }} />}
        form={
          <>
            <StringField label="text" binding={text} />
            <StringField label="placeholder" binding={placeholder} />
          </>
        }
      />
    </VStack>
  )
}

export const TextEditorComponentDemo: FC = () => {
  const text = useBinding('多行输入，后续映射 TextEditor。')
  const height = useBinding('140')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <TextEditor text={text} frame={{ height: 140, maxWidth: 'infinity' }} />
      </FormSection>
      <PlaygroundSection
        title="TextEditor Playground"
        preview={<TextEditor text={text} frame={{ height: toNumber(height.value, 140), maxWidth: 'infinity' }} />}
        form={
          <>
            <StringField label="text" binding={text} />
            <NumberField label="frame.height" binding={height} />
          </>
        }
      />
    </VStack>
  )
}

export const VStackComponentDemo: FC = () => {
  const spacing = useBinding('8')
  const alignment = useBinding<'leading' | 'center' | 'trailing'>('leading')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <VStack spacing={8} alignment="leading" padding={12} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
          <Text>row 1</Text>
          <Text>row 2</Text>
          <Text>row 3</Text>
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="VStack Playground"
        preview={
          <VStack
            spacing={toNumber(spacing.value, 8)}
            alignment={alignment.value}
            padding={12}
            frame={{ maxWidth: 'infinity', alignment: 'leading' }}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
          >
            <Text>row 1</Text>
            <Text>row 2</Text>
            <Text>row 3</Text>
          </VStack>
        }
        form={
          <>
            <NumberField label="spacing" binding={spacing} />
            <EnumField
              label="alignment"
              binding={alignment}
              options={[
                { label: 'leading', value: 'leading' },
                { label: 'center', value: 'center' },
                { label: 'trailing', value: 'trailing' },
              ]}
            />
          </>
        }
      />
    </VStack>
  )
}

export const HStackComponentDemo: FC = () => {
  const spacing = useBinding('12')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <HStack spacing={12} padding={12} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
          <Text>A</Text>
          <Text>B</Text>
          <Text>C</Text>
        </HStack>
      </FormSection>
      <PlaygroundSection
        title="HStack Playground"
        preview={
          <HStack
            spacing={toNumber(spacing.value, 12)}
            padding={12}
            frame={{ maxWidth: 'infinity' }}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
          >
            <Text>A</Text>
            <Text>B</Text>
            <Text>C</Text>
          </HStack>
        }
        form={<NumberField label="spacing" binding={spacing} />}
      />
    </VStack>
  )
}

export const SpacerComponentDemo: FC = () => {
  const minLength = useBinding('60')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <HStack padding={12} frame={{ maxWidth: 'infinity' }} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
          <Text>Leading</Text>
          <Spacer />
          <Text>Trailing</Text>
        </HStack>
      </FormSection>
      <PlaygroundSection
        title="Spacer Playground"
        preview={
          <HStack padding={12} frame={{ maxWidth: 'infinity' }} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
            <Text>Leading</Text>
            <Spacer minLength={toNumber(minLength.value, 60)} />
            <Text>Trailing</Text>
          </HStack>
        }
        form={<NumberField label="minLength" binding={minLength} />}
      />
    </VStack>
  )
}

export const DividerComponentDemo: FC = () => {
  const axis = useBinding<'horizontal' | 'vertical'>('horizontal')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text>row 1</Text>
          <Divider />
          <Text>row 2</Text>
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="Divider Playground"
        preview={
          axis.value === 'horizontal' ? (
            <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              <Text>row 1</Text>
              <Divider />
              <Text>row 2</Text>
            </VStack>
          ) : (
            <HStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              <Text>A</Text>
              <Divider axis="vertical" />
              <Text>B</Text>
            </HStack>
          )
        }
        form={
          <EnumField
            label="axis"
            binding={axis}
            options={[
              { label: 'horizontal', value: 'horizontal' },
              { label: 'vertical', value: 'vertical' },
            ]}
          />
        }
      />
    </VStack>
  )
}

export const ScrollViewComponentDemo: FC = () => {
  const rowCount = useBinding('8')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <ScrollView frame={{ height: 180, maxWidth: 'infinity' }}>
          <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <GalleryRow key={String(index)} title={`scroll row ${String(index + 1)}`} meta="vertical scroll content" />
            ))}
          </VStack>
        </ScrollView>
      </FormSection>
      <PlaygroundSection
        title="ScrollView Playground"
        preview={
          <ScrollView frame={{ height: 180, maxWidth: 'infinity' }}>
            <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              {Array.from({ length: Math.max(1, toNumber(rowCount.value, 8)) }).map((_, index) => (
                <GalleryRow key={String(index)} title={`scroll row ${String(index + 1)}`} meta="vertical scroll content" />
              ))}
            </VStack>
          </ScrollView>
        }
        form={<NumberField label="row count" binding={rowCount} />}
      />
    </VStack>
  )
}

export const LazyHStackComponentDemo: FC = () => {
  const spacing = useBinding('10')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <ScrollView axes="horizontal" frame={{ maxWidth: 'infinity' }}>
          <LazyHStack spacing={10}>
            <Chip title="LazyHStack" />
            <Chip title="Horizontal" />
            <Chip title="Scrollable" />
          </LazyHStack>
        </ScrollView>
      </FormSection>
      <PlaygroundSection
        title="LazyHStack Playground"
        preview={
          <ScrollView axes="horizontal" frame={{ maxWidth: 'infinity' }}>
            <LazyHStack spacing={toNumber(spacing.value, 10)}>
              <Chip title="LazyHStack" />
              <Chip title="Horizontal" />
              <Chip title="Scrollable" />
              <Chip title="Token Friendly" />
            </LazyHStack>
          </ScrollView>
        }
        form={<NumberField label="spacing" binding={spacing} />}
      />
    </VStack>
  )
}

export const SheetComponentDemo: FC = () => {
  const title = useBinding('Sheet 内容')
  const presented = useBinding(false)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <Button title="打开 Sheet" buttonStyle="borderedProminent" onPress={() => presented.setValue(true)} />
      </FormSection>
      <PlaygroundSection
        title="Sheet Playground"
        preview={<Button title="打开 Sheet" buttonStyle="borderedProminent" onPress={() => presented.setValue(true)} />}
        form={<StringField label="sheet title" binding={title} />}
      />
      <Sheet isPresented={presented}>
        <VStack
          spacing={12}
          padding={20}
          frame={{ width: 360, height: 220 }}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 20 } }}
        >
          <Text font="headline">{title.value}</Text>
          <Text foregroundStyle="secondary">这里展示 modal 容器、按钮区、层级关系。</Text>
          <HStack>
            <Spacer />
            <Button title="关闭" buttonStyle="borderedProminent" onPress={() => presented.setValue(false)} />
          </HStack>
        </VStack>
      </Sheet>
    </VStack>
  )
}

export const ContextMenuComponentDemo: FC = () => {
  const altTitle = useBoolBinding(false)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <ContextMenu items={[{ title: '置顶' }, { title: '清空聊天' }, { title: '删除' }]}>
          <Button title="contextMenu trigger" buttonStyle="bordered" />
        </ContextMenu>
      </FormSection>
      <PlaygroundSection
        title="ContextMenu Playground"
        preview={
          <ContextMenu items={[{ title: '置顶' }, { title: '清空聊天' }, { title: '删除' }]}>
            <Button title={toBoolBinding(altTitle) ? '右键我' : 'contextMenu trigger'} buttonStyle="bordered" />
          </ContextMenu>
        }
        form={<BoolField label="alt title" binding={altTitle} />}
      />
    </VStack>
  )
}

export const RoundedRectangleComponentDemo: FC = () => {
  const fill = useBinding<ForegroundStyleToken>('accentColor')
  const cornerRadius = useBinding('18')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <RoundedRectangle fill="blue" cornerRadius={18} padding={18} frame={{ width: 220 }}>
          <Text foregroundColor="#ffffff">RoundedRectangle</Text>
        </RoundedRectangle>
      </FormSection>
      <PlaygroundSection
        title="RoundedRectangle Playground"
        preview={
          <RoundedRectangle fill={fill.value} cornerRadius={toNumber(cornerRadius.value, 18)} padding={18} frame={{ width: 220 }}>
            <Text foregroundColor="#ffffff">RoundedRectangle</Text>
          </RoundedRectangle>
        }
        form={
          <>
            <EnumField label="fill" binding={fill} options={foregroundOptions} />
            <NumberField label="cornerRadius" binding={cornerRadius} />
          </>
        }
      />
    </VStack>
  )
}

export const TokenColorComponentDemo: FC = () => {
  const foreground = useBinding<ForegroundStyleToken>('accentColor')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <VStack spacing={8} alignment="leading">
          {foregroundOptions.map(option => (
            <Text key={option.value} foregroundStyle={option.value}>
              {option.label}
            </Text>
          ))}
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="Token Color Playground"
        preview={
          <VStack spacing={12} alignment="leading">
            <Text foregroundStyle={foreground.value}>foregroundStyle preview</Text>
            <HStack padding={18} background={{ fill: foreground.value, in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
              <Text foregroundColor="#ffffff">background token preview</Text>
            </HStack>
          </VStack>
        }
        form={<EnumField label="foregroundStyle" binding={foreground} options={foregroundOptions} />}
      />
    </VStack>
  )
}

export const GeometryReaderComponentDemo: FC = () => {
  const fill = useBinding<ForegroundStyleToken>('secondary')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <GeometryReader
          padding={12}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
          frame={{ maxWidth: 'infinity' }}
        >
          {proxy => <Text font="caption2.monospaced">width: {String(proxy.size.width)} height: {String(proxy.size.height)}</Text>}
        </GeometryReader>
      </FormSection>
      <PlaygroundSection
        title="GeometryReader Playground"
        preview={
          <GeometryReader
            padding={12}
            background={{ fill: fill.value, in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
            frame={{ maxWidth: 'infinity' }}
          >
            {proxy => <Text font="caption2.monospaced">width: {String(proxy.size.width)} height: {String(proxy.size.height)}</Text>}
          </GeometryReader>
        }
        form={<EnumField label="background.fill" binding={fill} options={foregroundOptions} />}
      />
    </VStack>
  )
}

export const ScrollViewReaderComponentDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
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
      <PlaygroundSection
        title="ScrollViewReader Playground"
        preview={
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
        }
        form={<Text foregroundStyle="secondary">当前支持面：`scrollTo(id, anchor)` mock</Text>}
      />
    </VStack>
  )
}

export const DropAreaComponentDemo: FC = () => {
  const targeted = useBinding<'true' | 'false'>('false')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <DropArea
          padding={12}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
          frame={{ maxWidth: 'infinity' }}
        >
          <Text>DropArea mock，对应 SwiftUI `onDrop` 语义。</Text>
        </DropArea>
      </FormSection>
      <PlaygroundSection
        title="DropArea Playground"
        preview={
          <DropArea
            isTargeted={{
              value: toBoolBinding(targeted),
              setValue: next => targeted.setValue(next ? 'true' : 'false'),
            }}
            padding={12}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
            frame={{ maxWidth: 'infinity' }}
          >
            <Text>DropArea mock，对应 SwiftUI `onDrop` 语义。</Text>
          </DropArea>
        }
        form={<BoolField label="isTargeted" binding={targeted} />}
      />
    </VStack>
  )
}

export const WindowAccessorComponentDemo: FC = () => {
  const resolved = useBinding('Mock Window')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <VStack spacing={8} padding={12} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text font="headline">WindowAccessor</Text>
          <Text foregroundStyle="secondary">对应 `NSViewRepresentable` bridge 的最小 mock。</Text>
          <WindowAccessor onResolve={window => resolved.setValue(window.title)} />
          <Text font="caption2.monospaced">{resolved.value}</Text>
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="WindowAccessor Playground"
        preview={
          <VStack spacing={8} padding={12} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Text font="headline">WindowAccessor</Text>
            <WindowAccessor onResolve={window => resolved.setValue(window.title)} />
            <Text font="caption2.monospaced">{resolved.value}</Text>
          </VStack>
        }
        form={<Text foregroundStyle="secondary">当前支持面：`onResolve(window)` mock</Text>}
      />
    </VStack>
  )
}
