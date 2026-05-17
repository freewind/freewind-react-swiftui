import type { FC } from 'react'
import { Section, Text } from '../runtime'
import { FormSection } from '../../controls'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import {VStack} from "../VStack";

export const SectionDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础分组">
        <Section
          title="General"
          padding={12}
          frame={{ maxWidth: 'infinity', alignment: 'leading' }}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
        >
          <Text>Downloads</Text>
          <Text>Notifications</Text>
        </Section>
      </FormSection>
      <PlaygroundSection
        title="Header 与 Footer"
        summary="展示说明性页脚和自定义头。"
        preview={
          <Section
            header={<Text font="caption.semibold" foregroundStyle="secondary">Advanced</Text>}
            footer="这些选项会影响大文件传输行为。"
            padding={12}
            frame={{ maxWidth: 'infinity', alignment: 'leading' }}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
          >
            <Text>Concurrent Uploads</Text>
            <Text>LAN Discovery</Text>
          </Section>
        }
      />
      <ComponentPropsTable component="Section" />
    </VStack>
  )
}
