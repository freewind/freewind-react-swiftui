import type { FC } from 'react'
import { Button, Popconfirm, Text, useBinding, VStack } from './runtime'
import { FormSection } from './controls'
import { PlaygroundSection } from './demo-playground'
import { ComponentPropsTable } from './props-table'

export const PopconfirmDemo: FC = () => {
  const result = useBinding('waiting')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础确认浮层">
        <VStack spacing={10} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Popconfirm
            title="删除这条消息？"
            description="删除后不可恢复。"
            onConfirm={() => result.setValue('confirmed')}
            onCancel={() => result.setValue('cancelled')}
          >
            <Button title="Delete Message" buttonStyle="bordered" />
          </Popconfirm>
          <Text font="caption" foregroundStyle="secondary">result: {result.value}</Text>
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="危险操作确认"
        summary="适合删除、清空、退出群组这类轻确认，不必拉起完整 modal。"
        preview={
          <Popconfirm
            title="清空当前聊天？"
            description="仅清空本地记录，不影响对端。"
            confirmText="清空"
            cancelText="返回"
          >
            <Button title="Clear Chat" buttonStyle="borderedProminent" />
          </Popconfirm>
        }
      />
      <ComponentPropsTable component="Popconfirm" />
    </VStack>
  )
}
