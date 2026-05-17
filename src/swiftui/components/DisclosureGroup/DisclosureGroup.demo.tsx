import type { FC } from 'react'
import { DisclosureGroup, Text, useBinding } from '../runtime'
import { FormSection } from '../../controls'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import {VStack} from "../VStack";

export const DisclosureGroupDemo: FC = () => {
  const expanded = useBinding(true)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础折叠组">
        <DisclosureGroup title="高级设置" isExpanded={expanded} padding={12} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
          <Text>自动接收图片</Text>
          <Text>启用多设备同步</Text>
        </DisclosureGroup>
      </FormSection>
      <PlaygroundSection
        title="分组信息"
        summary="常见于设置页、诊断信息、可选高级参数。"
        preview={
          <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <DisclosureGroup title="传输详情" padding={12} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
              <Text>peer: freewind-mac</Text>
              <Text>protocol: local lan</Text>
              <Text>attachments: 3</Text>
            </DisclosureGroup>
          </VStack>
        }
      />
      <ComponentPropsTable component="DisclosureGroup" />
    </VStack>
  )
}
