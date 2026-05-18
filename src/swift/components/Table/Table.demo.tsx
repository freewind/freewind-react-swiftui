import type { FC } from 'react'
import { Table, TableColumn, TableRow, Text, useBinding } from '../runtime'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import { VStack } from '../VStack'
import { FormSection } from '../FormSection'

type PeerRow = {
  id: string
  device: string
  status: 'online' | 'offline'
  files: number
}

const peers: PeerRow[] = [
  { id: 'p1', device: 'freewind-mac', status: 'online', files: 12 },
  { id: 'p2', device: 'freewind-ios', status: 'offline', files: 3 },
  { id: 'p3', device: 'design-mac', status: 'online', files: 28 },
]

export const TableDemo: FC = () => {
  const selection = useBinding<string | null>('p1')
  const sortOrder = useBinding<Array<keyof PeerRow>>(['device'])

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Table(data:selection:sortOrder:)">
        <Table data={peers} id="id" selection={selection} sortOrder={sortOrder} frame={{ maxWidth: 'infinity' }}>
          <TableColumn<PeerRow> title="Device" value="device" />
          <TableColumn<PeerRow> title="Status" value="status" width={120}>
            {(peer: PeerRow) => (
              <Text foregroundStyle={peer.status === 'online' ? 'green' : 'secondary'}>
                {peer.status}
              </Text>
            )}
          </TableColumn>
          <TableColumn<PeerRow> title="Files" value="files" width={80} alignment="trailing">
            {(peer: PeerRow) => <Text>{String(peer.files)}</Text>}
          </TableColumn>
        </Table>
        <Text font="caption" foregroundStyle="secondary">
          selected: {selection.value ?? 'none'}
        </Text>
        <Text font="caption" foregroundStyle="secondary">
          sort: {sortOrder.value[0] ?? 'none'}
        </Text>
      </FormSection>
      <PlaygroundSection
        title="Table(of:columns:rows:)"
        summary="对应 SwiftUI 显式行构造。列走 TableColumn，行走 TableRow。"
        preview={
          <Table of="PeerRow" selection={selection} frame={{ maxWidth: 'infinity' }}>
            <TableColumn<PeerRow> title="Device" width={180}>
              {(peer: PeerRow) => <Text>{peer.device}</Text>}
            </TableColumn>
            <TableColumn<PeerRow> title="Status" width={120}>
              {(peer: PeerRow) => (
                <Text foregroundStyle={peer.status === 'online' ? 'green' : 'secondary'}>
                  {peer.status}
                </Text>
              )}
            </TableColumn>
            <TableColumn<PeerRow> title="Files" alignment="trailing">
              {(peer: PeerRow) => <Text>{String(peer.files)}</Text>}
            </TableColumn>
            {peers.map(peer => (
              <TableRow key={peer.id} value={peer} />
            ))}
          </Table>
        }
      />
      <ComponentPropsTable component="Table" />
    </VStack>
  )
}
