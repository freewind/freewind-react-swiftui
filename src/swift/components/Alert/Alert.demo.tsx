import type { FC } from 'react'
import { Alert } from './Alert'
import { Button } from '../Button'
import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog'
import { FullScreenCover } from '../FullScreenCover/FullScreenCover'
import { FormSection } from '../../controls'
import { PlaygroundSection } from '../../demo-playground'
import { Text, useBinding } from '../runtime'
import { VStack } from '../VStack'

export const AlertDemo: FC = () => {
  const alertPresented = useBinding(false)
  const dialogPresented = useBinding(false)
  const coverPresented = useBinding(false)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Alert / Dialog / Cover">
        <VStack spacing={10} alignment="leading">
          <Button title="show alert" buttonStyle="borderedProminent" onPress={() => alertPresented.setValue(true)} />
          <Button title="show confirmation dialog" buttonStyle="bordered" onPress={() => dialogPresented.setValue(true)} />
          <Button title="show full screen cover" buttonStyle="plain" onPress={() => coverPresented.setValue(true)} />
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="反馈层"
        summary="对应 SwiftUI `.alert` `.confirmationDialog` `.fullScreenCover`。"
        preview={<Text foregroundStyle="secondary">点击上方按钮即可触发。</Text>}
      />
      <Alert isPresented={alertPresented} title="删除会话？" message="此操作无法撤销。" />
      <ConfirmationDialog
        isPresented={dialogPresented}
        title="更多操作"
        actions={[
          { title: '标记未读' },
          { title: '删除', role: 'destructive' },
        ]}
      />
      <FullScreenCover isPresented={coverPresented} title="FullScreenCover">
        <VStack
          spacing={12}
          padding={18}
          frame={{ maxWidth: 'infinity', minHeight: 360, alignment: 'leading' }}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
        >
          <Text font="headline.semibold">全屏模态内容</Text>
          <Text foregroundStyle="secondary">这里可放完整页面。</Text>
        </VStack>
      </FullScreenCover>
    </VStack>
  )
}
