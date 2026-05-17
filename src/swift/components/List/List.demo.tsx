import type { FC } from 'react'
import { List, NavigationLink, Section, Text } from '../runtime'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import {VStack} from "../VStack";
import {FormSection} from "../FormSection";

export const ListDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础列表">
        <List frame={{ maxWidth: 'infinity' }}>
          <Text padding={12}>Freewind Mac</Text>
          <Text padding={12}>Freewind iPhone</Text>
          <Text padding={12}>Downloads</Text>
        </List>
      </FormSection>
      <PlaygroundSection
        title="带 Section 的列表"
        summary="常见于设置页、联系人页、文件分组页。"
        preview={
          <List frame={{ maxWidth: 'infinity' }}>
            <Section title="Devices" padding={12}>
              <NavigationLink title="MacBook Pro" />
              <NavigationLink title="iPhone 16 Pro" />
            </Section>
            <Section title="Folders" padding={12} footer="共 2 项">
              <Text padding={{ vertical: 8 }}>Pictures</Text>
              <Text padding={{ vertical: 8 }}>Documents</Text>
            </Section>
          </List>
        }
      />
      <ComponentPropsTable component="List" />
    </VStack>
  )
}
