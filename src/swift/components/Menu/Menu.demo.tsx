import type { FC } from 'react'
import { HStack, Menu } from '../runtime'
import { FormSection } from '../../controls'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import {Button} from "../Button";
import {VStack} from "../VStack";

export const MenuDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础下拉菜单">
        <Menu items={[{ title: '新建会话' }, { title: '导入文件' }, { title: '偏好设置' }]}>
          <Button title="Actions" buttonStyle="bordered" />
        </Menu>
      </FormSection>
      <PlaygroundSection
        title="不同 label"
        summary="Menu 是左键展开，不同于 ContextMenu 的右键触发。"
        preview={
          <HStack spacing={12}>
            <Menu items={[{ title: '复制' }, { title: '转发' }, { title: '删除', disabled: true }]}>
              <Button title="消息操作" buttonStyle="borderedProminent" />
            </Menu>
            <Menu items={[{ title: '打开目录' }, { title: '显示简介' }]}>
              <Button title="文件操作" buttonStyle="bordered" />
            </Menu>
          </HStack>
        }
      />
      <ComponentPropsTable component="Menu" />
    </VStack>
  )
}
