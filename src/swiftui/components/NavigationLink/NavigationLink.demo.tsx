import type { FC } from 'react'
import { NavigationLink, Text, useBinding } from '../runtime'
import { FormSection } from '../../controls'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import {VStack} from "../VStack";

export const NavigationLinkDemo: FC = () => {
  const target = useBinding('General')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础导航行">
        <VStack
          spacing={8}
          padding={12}
          frame={{ maxWidth: 'infinity', alignment: 'leading' }}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
        >
          <NavigationLink title="General" onNavigate={() => target.setValue('General')} />
          <NavigationLink title="Attachments" onNavigate={() => target.setValue('Attachments')} />
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="自定义 label"
        summary="常用于设置列表、详情入口、文件导航。"
        preview={
          <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <NavigationLink
              onNavigate={() => target.setValue('Current Device')}
              padding={12}
              background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
            >
              <VStack spacing={2} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
                <Text>Current Device</Text>
                <Text font="caption" foregroundStyle="secondary">open device detail</Text>
              </VStack>
            </NavigationLink>
            <Text font="caption" foregroundStyle="secondary">last target: {target.value}</Text>
          </VStack>
        }
      />
      <ComponentPropsTable component="NavigationLink" />
    </VStack>
  )
}
