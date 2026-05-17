import { Divider } from '../Divider'
import { HStack } from '../HStack'
import { Text } from '../Text'
import type { Binding } from '../runtime'
import type { ViewBaseProps } from '../View'
import type { ReactNode } from 'react'

import { VStack } from '../VStack'

export type TableColumn<T> = {
  key: string
  title: string
  dataIndex?: keyof T
  width?: number
  render?: (record: T, index: number) => ReactNode
}

export type TableProps<T> = ViewBaseProps & {
  columns: TableColumn<T>[]
  dataSource: T[]
  rowKey: (record: T, index: number) => string
  emptyText?: string
  selection?: Binding<string | null>
  onSelect?: (record: T, index: number) => void
  rowActions?: (record: T, index: number) => ReactNode
}


export const Table = <T,>({
  columns,
  dataSource,
  rowKey,
  emptyText = 'No Data',
  selection,
  onSelect,
  rowActions,
  ...rest
}: TableProps<T>) => {
  return (
    <VStack
      spacing={0}
      frame={{ maxWidth: 'infinity', alignment: 'leading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
      {...rest}
    >
      <HStack
        spacing={12}
        padding={{ horizontal: 12, vertical: 10 }}
        frame={{ maxWidth: 'infinity', alignment: 'leading' }}
        background={{ fill: 'ultraThinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
      >
        {columns.map(column => (
          <Text
            key={column.key}
            font="caption.semibold"
            frame={{
              width: column.width,
              maxWidth: column.width ? undefined : 'infinity',
              alignment: 'leading',
            }}
          >
            {column.title}
          </Text>
        ))}
      </HStack>
      <Divider />
      {dataSource.length === 0 ? (
        <Text padding={12} foregroundStyle="secondary">
          {emptyText}
        </Text>
      ) : (
        dataSource.map((record, index) => (
          <VStack key={rowKey(record, index)} spacing={0} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <HStack
              spacing={12}
              padding={{ horizontal: 12, vertical: 10 }}
              frame={{ maxWidth: 'infinity', alignment: 'leading' }}
              background={
                selection?.value === rowKey(record, index)
                  ? { fill: 'tertiary', in: { kind: 'roundedRectangle', cornerRadius: 10 } }
                  : undefined
              }
              onTapGesture={() => {
                selection?.setValue(rowKey(record, index))
                onSelect?.(record, index)
              }}
            >
              {columns.map(column => {
                const cell = column.render?.(record, index) ?? (column.dataIndex ? String(record[column.dataIndex] ?? '') : '')

                return (
                  <VStack
                    key={`${rowKey(record, index)}-${column.key}`}
                    frame={{
                      width: column.width,
                      maxWidth: column.width ? undefined : 'infinity',
                      alignment: 'leading',
                    }}
                  >
                    {typeof cell === 'string' || typeof cell === 'number' ? <Text>{String(cell)}</Text> : cell}
                  </VStack>
                )
              })}
              {rowActions ? <VStack>{rowActions(record, index)}</VStack> : null}
            </HStack>
            {index < dataSource.length - 1 ? <Divider /> : null}
          </VStack>
        ))
      )}
    </VStack>
  )
}
