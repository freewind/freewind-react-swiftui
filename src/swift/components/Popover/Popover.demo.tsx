import type { FC } from 'react'
import { Popover, Text, useBinding } from '../runtime'
import { FormSection } from '../../controls'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import {Button} from "../Button";
import {VStack} from "../VStack";

export const PopoverDemo: FC = () => {
  const shown = useBinding(false)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础浮层">
        <Popover
          isPresented={shown}
          content={
            <VStack spacing={6} alignment="leading">
              <Text font="headline">Quick Preview</Text>
              <Text font="caption" foregroundStyle="secondary">popover content</Text>
            </VStack>
          }
        >
          <Button title="Show Popover" buttonStyle="bordered" />
        </Popover>
      </FormSection>
      <PlaygroundSection
        title="信息卡片"
        summary="适合轻量说明、快速操作、非模态补充信息。"
        preview={
          <Popover
            isPresented={shown}
            content={
              <VStack spacing={8} alignment="leading">
                <Text>LAN peer: freewind-mac</Text>
                <Text font="caption" foregroundStyle="secondary">status: online</Text>
                <Button title="Close" buttonStyle="bordered" onPress={() => shown.setValue(false)} />
              </VStack>
            }
          >
            <Button title="Peer Info" buttonStyle="borderedProminent" />
          </Popover>
        }
      />
      <ComponentPropsTable component="Popover" />
    </VStack>
  )
}
