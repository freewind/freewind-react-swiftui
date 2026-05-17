import type { FC } from 'react'
import { HStack, Text } from '../runtime'
import { FormSection } from '../../controls'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import {VStack} from "../VStack";

export const TextDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="字体等级">
        <VStack spacing={8} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text font="largeTitle">largeTitle</Text>
          <Text font="title">title</Text>
          <Text font="title2">title2</Text>
          <Text font="title3.semibold">title3.semibold</Text>
          <Text font="headline">headline</Text>
          <Text font="body">body</Text>
          <Text font="caption" foregroundStyle="secondary">caption secondary</Text>
          <Text font="caption2.monospaced" textSelection="enabled">caption2.monospaced selectable</Text>
        </VStack>
      </FormSection>

      <PlaygroundSection
        title="文字样式组合"
        summary="集中展示前景色、斜体、等宽、可选中、多行对齐。"
        preview={
          <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Text foregroundStyle="accentColor">accentColor foreground</Text>
            <Text foregroundStyle="red">red foreground</Text>
            <Text foregroundStyle="green">green foreground</Text>
            <Text italic>italic text</Text>
            <Text monospaced>monospaced text</Text>
            <Text textSelection="enabled">selectable text</Text>
            <Text multilineTextAlignment="center" frame={{ maxWidth: 'infinity' }}>
              centered multiline text centered multiline text
            </Text>
            <HStack spacing={12}>
              <Text font="caption" foregroundStyle="secondary">secondary</Text>
              <Text font="caption" foregroundStyle="tertiary">tertiary</Text>
            </HStack>
          </VStack>
        }
      />
      <ComponentPropsTable component="Text" />
    </VStack>
  )
}
