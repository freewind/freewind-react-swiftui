import type { FC } from 'react'
import { Tab, TabView, Text, useBinding, VStack } from './runtime'
import { FormSection } from './controls'
import { PlaygroundSection } from './demo-playground'
import { ComponentPropsTable } from './props-table'

export const TabViewDemo: FC = () => {
  const selection = useBinding<'contacts' | 'images' | 'files'>('contacts')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础页签容器">
        <TabView selection={selection}>
          <Tab tag="contacts" title="联系人" systemImage="iphone">
            <Text>联系人列表内容</Text>
          </Tab>
          <Tab tag="images" title="图片" systemImage="photo">
            <Text>图片流内容</Text>
          </Tab>
          <Tab tag="files" title="文件" systemImage="doc">
            <Text>文件流内容</Text>
          </Tab>
        </TabView>
      </FormSection>
      <PlaygroundSection
        title="带图标 tabs"
        summary="对应 SwiftUI `TabView` + `tabItem` + `tag` 的压缩表达。"
        preview={
          <TabView selection={selection}>
            <Tab tag="contacts" title="聊天" systemImage="iphone">
              <VStack spacing={8} alignment="leading">
                <Text>当前 tab: 聊天</Text>
                <Text foregroundStyle="secondary">selection: {selection.value}</Text>
              </VStack>
            </Tab>
            <Tab tag="images" title="媒体" systemImage="photo">
              <Text>媒体 tab</Text>
            </Tab>
            <Tab tag="files" title="文档" systemImage="doc">
              <Text>文档 tab</Text>
            </Tab>
          </TabView>
        }
      />
      <ComponentPropsTable component="TabView" />
    </VStack>
  )
}
