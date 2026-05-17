import type { FC } from 'react'
import { HStack, Sheet, Spacer, Text, useBinding } from '../runtime'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import {Button} from "../Button";
import {VStack} from "../VStack";
import {FormSection} from "../FormSection";

export const SheetDemo: FC = () => {
  const presented = useBinding(false)
  const compactPresented = useBinding(false)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础弹层">
        <Button title="打开 Sheet" buttonStyle="borderedProminent" onPress={() => presented.setValue(true)} />
      </FormSection>
      <PlaygroundSection
        title="两种内容密度"
        summary="对比标准说明弹层与更紧凑的确认弹层。"
        preview={
          <HStack spacing={10}>
            <Button title="标准 Sheet" buttonStyle="borderedProminent" onPress={() => presented.setValue(true)} />
            <Button title="紧凑确认" buttonStyle="bordered" onPress={() => compactPresented.setValue(true)} />
          </HStack>
        }
      />
      <Sheet isPresented={presented} title="Standard Sheet" detents={['large']} onDismiss={() => presented.setValue(false)}>
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
            <Button title="关闭" buttonStyle="borderedProminent" onPress={() => presented.setValue(false)} />
          </HStack>
        </VStack>
      </Sheet>
      <Sheet isPresented={compactPresented} title="Compact Sheet" detents={['medium']} interactiveDismissDisabled>
        <VStack
          spacing={12}
          padding={20}
          frame={{ width: 320, height: 180 }}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 20 } }}
        >
          <Text font="headline">确认操作？</Text>
          <Text foregroundStyle="secondary">这个例子更像 macOS 小确认弹层。</Text>
          <HStack>
            <Spacer />
            <Button title="取消" buttonStyle="bordered" onPress={() => compactPresented.setValue(false)} />
            <Button title="确认" buttonStyle="borderedProminent" onPress={() => compactPresented.setValue(false)} />
          </HStack>
        </VStack>
      </Sheet>
      <ComponentPropsTable component="Sheet" />
    </VStack>
  )
}
