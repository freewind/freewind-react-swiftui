import type { FC } from 'react'
import { Toggle, useBinding } from '../runtime'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import {VStack} from "../VStack";
import {FormSection} from "../FormSection";

export const ToggleDemo: FC = () => {
  const wifi = useBinding(true)
  const notifications = useBinding(false)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础开关">
        <VStack spacing={10} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Toggle isOn={wifi} title="Wi-Fi" />
          <Toggle isOn={notifications} title="通知提醒" />
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="设置项组合"
        summary="展示多条设置项与 binding 联动结果。"
        preview={
          <VStack spacing={10} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Toggle isOn={wifi} title="局域网发现" />
            <Toggle isOn={notifications} title="消息横幅" />
          </VStack>
        }
      />
      <ComponentPropsTable component="Toggle" />
    </VStack>
  )
}
