import type { FC } from 'react'
import { Button, ContextMenu, HStack, VStack } from './runtime'
import { FormSection } from './controls'
import { PlaygroundSection } from './demo-playground'

export const ContextMenuDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础右键菜单">
        <ContextMenu items={[{ title: '置顶' }, { title: '清空聊天' }, { title: '删除' }]}>
          <Button title="contextMenu trigger" buttonStyle="bordered" />
        </ContextMenu>
      </FormSection>
      <PlaygroundSection
        title="不同触发器"
        summary="同一组菜单项可挂在普通按钮、强调按钮等不同 trigger 上。"
        preview={
          <HStack spacing={12}>
            <ContextMenu items={[{ title: '复制' }, { title: '转发' }, { title: '删除' }]}>
              <Button title="消息菜单" buttonStyle="bordered" />
            </ContextMenu>
            <ContextMenu items={[{ title: '打开' }, { title: '显示简介' }, { title: '移到废纸篓' }]}>
              <Button title="文件菜单" buttonStyle="borderedProminent" />
            </ContextMenu>
          </HStack>
        }
      />
    </VStack>
  )
}
