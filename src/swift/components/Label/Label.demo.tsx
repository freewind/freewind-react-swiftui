import type { FC } from 'react'
import { Label } from '../runtime'
import { FormSection } from '../../controls'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import {VStack} from "../VStack";

export const LabelDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础组合">
        <VStack spacing={10} alignment="leading">
          <Label title="photo file" systemImage="photo" />
          <Label title="document file" systemImage="doc" />
          <Label title="pinned item" systemImage="pin.fill" />
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="状态标签"
        summary="展示 Label 在文件、状态、设备类型下的组合样式。"
        preview={
          <VStack spacing={10} alignment="leading">
            <Label title="Mac Device" systemImage="laptopcomputer" />
            <Label title="iPhone Device" systemImage="iphone" />
            <Label title="Pinned Item" systemImage="pin.fill" />
          </VStack>
        }
      />
      <ComponentPropsTable component="Label" />
    </VStack>
  )
}
