import type { FC } from 'react'
import { Button, HStack, Sheet, Spacer, Text, useBinding, VStack } from './runtime'
import { FormSection } from './controls'
import { PlaygroundSection, StringField } from './demo-playground'

export const SheetDemo: FC = () => {
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
