import type { FC } from 'react'
import { Button, ContextMenu, VStack } from './runtime'
import { FormSection } from './controls'
import { BoolField, PlaygroundSection, toBoolBinding, useBoolBinding } from './demo-playground'

export const ContextMenuDemo: FC = () => {
  const altTitle = useBoolBinding(false)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <ContextMenu items={[{ title: '置顶' }, { title: '清空聊天' }, { title: '删除' }]}>
          <Button title="contextMenu trigger" buttonStyle="bordered" />
        </ContextMenu>
      </FormSection>
      <PlaygroundSection
        title="ContextMenu Playground"
        preview={
          <ContextMenu items={[{ title: '置顶' }, { title: '清空聊天' }, { title: '删除' }]}>
            <Button title={toBoolBinding(altTitle) ? '右键我' : 'contextMenu trigger'} buttonStyle="bordered" />
          </ContextMenu>
        }
        form={<BoolField label="alt title" binding={altTitle} />}
      />
    </VStack>
  )
}
