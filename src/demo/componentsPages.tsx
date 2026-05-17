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
  TextFieldRow,
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
import { Chip, GalleryRow, SwatchCard } from './shared'

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
          <Text font="caption" foregroundStyle="secondary">
            caption secondary
          </Text>
          <Text font="caption2.monospaced" textSelection="enabled">
            caption2.monospaced selectable
          </Text>
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
        preview={
          <HStack frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Button
              title={title.value}
              buttonStyle={buttonStyle.value}
              controlSize={controlSize.value}
              disabled={toBoolBinding(disabled)}
            />
          </HStack>
        }
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

export const ImageLabelComponentDemo: FC = () => {
  const systemName = useBinding('iphone')
  const title = useBinding('preview item')
  const labelSymbol = useBinding('photo')
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
          <Image systemName="xmark" />
        </HStack>
      </FormSection>

      <PlaygroundSection
        title="Image / Label Playground"
        preview={
          <VStack spacing={12} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Image
              systemName={systemName.value}
              resizable={toBoolBinding(resizable)}
              scaledToFit={toBoolBinding(scaledToFit)}
              padding={8}
              background={{ fill: 'tertiary', in: { kind: 'roundedRectangle', cornerRadius: 12 } }}
            />
            <Label title={title.value} systemImage={labelSymbol.value} />
          </VStack>
        }
        form={
          <>
            <StringField label="Image.systemName" binding={systemName} />
            <StringField label="Label.title" binding={title} />
            <StringField label="Label.systemImage" binding={labelSymbol} />
            <BoolField label="Image.resizable" binding={resizable} />
            <BoolField label="Image.scaledToFit" binding={scaledToFit} />
          </>
        }
      />
    </VStack>
  )
}

export const InputComponentDemo: FC = () => {
  const segmented = useBinding<'all' | 'online' | 'offline'>('all')
  const field = useBinding('freewind-mac')
  const editor = useBinding('多行输入，后续映射 TextEditor。')
  const placeholder = useBinding('input device name')
  const editorHeight = useBinding('140')
  const sheetPresented = useBinding(false)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
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
        </VStack>
      </FormSection>

      <PlaygroundSection
        title="Input Playground"
        preview={
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
            <TextFieldRow label="device name" text={field} placeholder={placeholder.value} />
            <TextEditor text={editor} frame={{ height: toNumber(editorHeight.value, 140), maxWidth: 'infinity' }} />
            <Button title="打开 Sheet" buttonStyle="borderedProminent" onPress={() => sheetPresented.setValue(true)} />
          </VStack>
        }
        form={
          <>
            <EnumField
              label="Picker.selection"
              binding={segmented}
              options={[
                { label: 'all', value: 'all' },
                { label: 'online', value: 'online' },
                { label: 'offline', value: 'offline' },
              ]}
            />
            <StringField label="TextField.text" binding={field} />
            <StringField label="TextField.placeholder" binding={placeholder} />
            <StringField label="TextEditor.text" binding={editor} />
            <NumberField label="TextEditor.frame.height" binding={editorHeight} />
          </>
        }
      />

      <Sheet isPresented={sheetPresented}>
        <VStack
          spacing={12}
          padding={20}
          frame={{ width: 380, height: 220 }}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 20 } }}
        >
          <Text font="headline">控件组合 Sheet</Text>
          <Text foregroundStyle="secondary">这里演示 modal 结构、按钮对齐、文案层级。</Text>
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
  const spacing = useBinding('12')
  const showDivider = useBoolBinding(true)
  const stackAlignment = useBinding<'leading' | 'center' | 'trailing'>('leading')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
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
        </VStack>
      </FormSection>

      <PlaygroundSection
        title="Layout Playground"
        preview={
          <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <HStack
              spacing={toNumber(spacing.value, 12)}
              padding={12}
              alignment="center"
              background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
              frame={{ maxWidth: 'infinity' }}
            >
              <Text>A</Text>
              <Spacer />
              <Text>B</Text>
              {toBoolBinding(showDivider) ? <Divider axis="vertical" /> : null}
              <Text>C</Text>
            </HStack>
            <VStack
              spacing={toNumber(spacing.value, 12)}
              alignment={stackAlignment.value}
              padding={12}
              background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
              frame={{ maxWidth: 'infinity', alignment: 'leading' }}
            >
              <Text>row 1</Text>
              <Text>row 2</Text>
              <Text>row 3</Text>
            </VStack>
            <ScrollView axes="horizontal" frame={{ maxWidth: 'infinity' }}>
              <LazyHStack spacing={toNumber(spacing.value, 12)} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
                <Chip title="LazyHStack" />
                <Chip title="Horizontal" />
                <Chip title="Scrollable" />
                <Chip title="Token Friendly" />
              </LazyHStack>
            </ScrollView>
          </VStack>
        }
        form={
          <>
            <NumberField label="spacing" binding={spacing} />
            <EnumField
              label="VStack.alignment"
              binding={stackAlignment}
              options={[
                { label: 'leading', value: 'leading' },
                { label: 'center', value: 'center' },
                { label: 'trailing', value: 'trailing' },
              ]}
            />
            <BoolField label="show Divider" binding={showDivider} />
          </>
        }
      />
    </VStack>
  )
}

export const ContainerComponentDemo: FC = () => {
  const sheetPresented = useBinding(false)
  const itemCount = useBinding('8')
  const openContext = useBoolBinding(false)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <ScrollView frame={{ height: 180, maxWidth: 'infinity' }}>
          <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            {Array.from({ length: 10 }).map((_, index) => (
              <GalleryRow key={String(index)} title={`scroll row ${String(index + 1)}`} meta="vertical scroll content" />
            ))}
          </VStack>
        </ScrollView>
      </FormSection>

      <PlaygroundSection
        title="Container Playground"
        preview={
          <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <ScrollView frame={{ height: 180, maxWidth: 'infinity' }}>
              <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
                {Array.from({ length: Math.max(1, toNumber(itemCount.value, 8)) }).map((_, index) => (
                  <GalleryRow key={String(index)} title={`scroll row ${String(index + 1)}`} meta="vertical scroll content" />
                ))}
              </VStack>
            </ScrollView>
            <HStack spacing={12}>
              <Button title="打开 Sheet" buttonStyle="borderedProminent" onPress={() => sheetPresented.setValue(true)} />
              <ContextMenu
                items={[
                  { title: '置顶' },
                  { title: '清空聊天' },
                  { title: '删除' },
                ]}
              >
                <Button title={toBoolBinding(openContext) ? '右键我' : 'contextMenu trigger'} buttonStyle="bordered" />
              </ContextMenu>
            </HStack>
          </VStack>
        }
        form={
          <>
            <NumberField label="Scroll row count" binding={itemCount} />
            <BoolField label="Context button title alt" binding={openContext} />
          </>
        }
      />

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
    </VStack>
  )
}

export const ShapeTokenComponentDemo: FC = () => {
  const foreground = useBinding<ForegroundStyleToken>('accentColor')
  const cornerRadius = useBinding('18')
  const shapeKind = useBinding<'rounded' | 'capsule' | 'rectangle'>('rounded')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <HStack spacing={12}>
          <SwatchCard title="Rounded" tone="blue" />
          <SwatchCard title="Capsule" tone="green" capsule />
          <SwatchCard title="Rect" tone="red" rectangle />
        </HStack>
      </FormSection>

      <PlaygroundSection
        title="Shape / Token Playground"
        preview={
          <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Text foregroundStyle={foreground.value}>foregroundStyle preview</Text>
            {shapeKind.value === 'rounded' ? (
              <RoundedRectangle fill={foreground.value} cornerRadius={toNumber(cornerRadius.value, 18)} padding={18} frame={{ width: 220 }}>
                <Text foregroundColor="#ffffff">RoundedRectangle</Text>
              </RoundedRectangle>
            ) : null}
            {shapeKind.value === 'capsule' ? (
              <HStack padding={18} background={{ fill: foreground.value, in: { kind: 'capsule' } }}>
                <Text foregroundColor="#ffffff">Capsule token</Text>
              </HStack>
            ) : null}
            {shapeKind.value === 'rectangle' ? (
              <HStack padding={18} background={{ fill: foreground.value, in: { kind: 'rectangle' } }}>
                <Text foregroundColor="#ffffff">Rectangle token</Text>
              </HStack>
            ) : null}
          </VStack>
        }
        form={
          <>
            <EnumField label="foregroundStyle" binding={foreground} options={foregroundOptions} />
            <EnumField
              label="shape kind"
              binding={shapeKind}
              options={[
                { label: 'rounded', value: 'rounded' },
                { label: 'capsule', value: 'capsule' },
                { label: 'rectangle', value: 'rectangle' },
              ]}
            />
            <NumberField label="cornerRadius" binding={cornerRadius} />
          </>
        }
      />
    </VStack>
  )
}

export const NativeMockComponentDemo: FC = () => {
  const targetedField = useBinding<'true' | 'false'>('false')
  const geometryFill = useBinding<ForegroundStyleToken>('secondary')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <GeometryReader
            padding={12}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
            frame={{ maxWidth: 'infinity' }}
          >
            {proxy => (
              <Text font="caption2.monospaced">
                width: {String(proxy.size.width)} height: {String(proxy.size.height)}
              </Text>
            )}
          </GeometryReader>
        </VStack>
      </FormSection>

      <PlaygroundSection
        title="Native Mock Playground"
        preview={
          <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <GeometryReader
              padding={12}
              background={{ fill: geometryFill.value, in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
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
            <DropArea
              isTargeted={{
                value: toBoolBinding(targetedField),
                setValue: next => targetedField.setValue(next ? 'true' : 'false'),
              }}
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
        }
        form={
          <>
            <EnumField label="GeometryReader.fill" binding={geometryFill} options={foregroundOptions} />
            <BoolField
              label="DropArea.isTargeted"
              binding={targetedField}
            />
          </>
        }
      />
    </VStack>
  )
}
