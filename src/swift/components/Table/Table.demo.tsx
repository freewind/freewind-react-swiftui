import type { FC } from 'react'
import { HStack, Table, Text } from '../runtime'
import { FormSection } from '../../controls'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import {Button} from "../Button";
import {VStack} from "../VStack";

const peers = [
  { id: 'p1', device: 'freewind-mac', status: 'online', files: 12 },
  { id: 'p2', device: 'freewind-ios', status: 'offline', files: 3 },
  { id: 'p3', device: 'design-mac', status: 'online', files: 28 },
]

export const TableDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础表格">
        <Table
          columns={[
            { key: 'device', title: 'Device', dataIndex: 'device' },
            { key: 'status', title: 'Status', dataIndex: 'status', width: 120 },
            { key: 'files', title: 'Files', dataIndex: 'files', width: 80 },
          ]}
          dataSource={peers}
          rowKey={record => record.id}
          frame={{ maxWidth: 'infinity' }}
        />
      </FormSection>
      <PlaygroundSection
        title="带操作列"
        summary="适合设备列表、文件列表、附件管理台。"
        preview={
          <Table
            columns={[
              { key: 'device', title: 'Device', dataIndex: 'device' },
              {
                key: 'status',
                title: 'Status',
                width: 120,
                render: record => (
                  <Text foregroundStyle={record.status === 'online' ? 'green' : 'secondary'}>{record.status}</Text>
                ),
              },
              { key: 'files', title: 'Files', width: 80, dataIndex: 'files' },
              {
                key: 'action',
                title: 'Action',
                width: 120,
                render: record => (
                  <HStack spacing={6}>
                    <Button title="Open" buttonStyle="bordered" controlSize="small" />
                  </HStack>
                ),
              },
            ]}
            dataSource={peers}
            rowKey={record => record.id}
            frame={{ maxWidth: 'infinity' }}
          />
        }
      />
      <ComponentPropsTable component="Table" />
    </VStack>
  )
}
