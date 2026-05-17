import type { FC } from 'react'
import { ProgressView } from '../runtime'
import { FormSection } from '../controls'
import { PlaygroundSection } from '../demo-playground'
import { ComponentPropsTable } from '../props-table'
import {VStack} from "../VStack";

export const ProgressViewDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础进度">
        <VStack spacing={12} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <ProgressView value={0.32} total={1} label="同步中" currentValueLabel="32%" />
          <ProgressView value={78} total={100} label="上传图片" currentValueLabel="78 / 100" />
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="确定态与不确定态"
        summary="展示 determinate 与 indeterminate 两种常见进度表现。"
        preview={
          <VStack spacing={12} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <ProgressView label="Scanning peers" />
            <ProgressView value={0.86} total={1} label="下载附件" currentValueLabel="86%" />
          </VStack>
        }
      />
      <ComponentPropsTable component="ProgressView" />
    </VStack>
  )
}
