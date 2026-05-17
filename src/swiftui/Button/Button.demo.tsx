import type { FC } from 'react'
import { HStack } from '../runtime'
import { FormSection } from '../controls'
import { PlaygroundSection } from '../demo-playground'
import { ComponentPropsTable } from '../props-table'
import {Button} from "../Button";
import {VStack} from "../VStack";

export const ButtonDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="按钮样式">
        <VStack spacing={10} alignment="leading">
          <Button title="plain button" buttonStyle="plain" />
          <Button title="bordered button" buttonStyle="bordered" />
          <Button title="prominent button" buttonStyle="borderedProminent" />
          <Button title="borderless button" buttonStyle="borderless" />
          <Button title="link style button" buttonStyle="link" />
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="尺寸与状态"
        summary="集中展示 controlSize、disabled、组合按钮排布。"
        preview={
          <VStack spacing={12} alignment="leading">
            <HStack spacing={10}>
              <Button title="mini" buttonStyle="bordered" controlSize="mini" />
              <Button title="small" buttonStyle="bordered" controlSize="small" />
              <Button title="regular" buttonStyle="bordered" controlSize="regular" />
              <Button title="large" buttonStyle="borderedProminent" controlSize="large" />
            </HStack>
            <HStack spacing={10}>
              <Button title="disabled plain" buttonStyle="plain" disabled />
              <Button title="disabled bordered" buttonStyle="bordered" disabled />
              <Button title="disabled prominent" buttonStyle="borderedProminent" disabled />
            </HStack>
          </VStack>
        }
      />
      <ComponentPropsTable component="Button" />
    </VStack>
  )
}
