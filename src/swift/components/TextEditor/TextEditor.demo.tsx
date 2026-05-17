import type { FC } from 'react'
import { Button, Text, TextEditor, useBinding, useFocusState } from '../runtime'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import { VStack } from '../VStack'
import { FormSection } from '../FormSection'

export const TextEditorDemo: FC = () => {
  const draft = useBinding('多行输入，后续映射 TextEditor。')
  const shortDraft = useBinding('短内容')
  const longDraft = useBinding('更长的内容\n第二行\n第三行')
  const focus = useFocusState<string | null>('draft')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础多行输入">
        <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <TextEditor text={draft} focused={focus} equals="draft" frame={{ height: 140, maxWidth: 'infinity' }} />
          <Text font="caption" foregroundStyle="secondary">
            focused: {focus.value ?? 'none'}
          </Text>
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="不同高度"
        summary="展示 TextEditor 在不同高度与内容密度下的效果。"
        preview={
          <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <TextEditor text={shortDraft} focused={focus} equals="short" frame={{ height: 100, maxWidth: 'infinity' }} />
            <TextEditor text={longDraft} focused={focus} equals="long" frame={{ height: 180, maxWidth: 'infinity' }} />
            <Button title="Focus long" buttonStyle="bordered" onPress={() => focus.setValue('long')} />
          </VStack>
        }
      />
      <ComponentPropsTable component="TextEditor" />
    </VStack>
  )
}
