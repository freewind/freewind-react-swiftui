import { Children, isValidElement, type ReactElement, type ReactNode } from 'react'
import { Divider } from '../Divider'
import { HStack } from '../HStack'
import { RoundedRectangle } from '../RoundedRectangle'
import { Text } from '../Text'
import type { Binding } from '../runtime'
import type { ViewBaseProps } from '../View'
import { VStack } from '../VStack'

export type TableColumnProps<T> = {
  title: string
  value?: keyof T
  width?: number
  alignment?: 'leading' | 'center' | 'trailing'
  children?: (row: T) => ReactNode
}

export type TableRowProps<T> = {
  value: T
  id?: string
}

export type TableProps<T> = ViewBaseProps & {
  children: ReactNode
  data?: T[]
  id?: keyof T | ((row: T, index: number) => string)
  of?: unknown
  emptyText?: string
  selection?: Binding<string | null>
  sortOrder?: Binding<Array<keyof T>>
}

type TableColumnElement<T> = ReactElement<TableColumnProps<T>>
type TableRowElement<T> = ReactElement<TableRowProps<T>>

const matchElementType = (node: ReactNode, expected: unknown, displayName: string) => {
  if (!isValidElement(node)) {
    return false
  }

  if (node.type === expected) {
    return true
  }

  if (typeof node.type === 'function') {
    const componentType = node.type as { displayName?: string; name?: string }
    return componentType.displayName === displayName || componentType.name === displayName
  }

  return false
}

const isTableColumnElement = <T,>(node: ReactNode): node is TableColumnElement<T> => {
  return matchElementType(node, TableColumn, 'TableColumn')
}

const isTableRowElement = <T,>(node: ReactNode): node is TableRowElement<T> => {
  return matchElementType(node, TableRow, 'TableRow')
}

const inferRowId = <T,>(record: T, index: number) => {
  if (typeof record === 'string' || typeof record === 'number') {
    return String(record)
  }

  if (record && typeof record === 'object' && 'id' in record) {
    const value = record.id
    if (typeof value === 'string' || typeof value === 'number') {
      return String(value)
    }
  }

  return String(index)
}

const readComparableValue = <T,>(record: T, key: keyof T) => {
  const value = record[key]
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value
  }
  return String(value ?? '')
}

const renderCell = <T,>(column: TableColumnElement<T>, record: T) => {
  if (column.props.children) {
    return column.props.children(record)
  }

  if (column.props.value) {
    const value = record[column.props.value]
    if (typeof value === 'string' || typeof value === 'number') {
      return <Text>{String(value)}</Text>
    }
    return <Text foregroundStyle="secondary">{String(value ?? '')}</Text>
  }

  return <Text foregroundStyle="secondary" />
}

export const TableColumn = <T,>(_props: TableColumnProps<T>) => {
  return null
}

TableColumn.displayName = 'TableColumn'

export const TableRow = <T,>(_props: TableRowProps<T>) => {
  return null
}

TableRow.displayName = 'TableRow'

export const Table = <T,>({
  children,
  data,
  id,
  emptyText = 'No Data',
  selection,
  sortOrder,
  ...rest
}: TableProps<T>) => {
  const nodes = Children.toArray(children)
  const columns = nodes.filter(isTableColumnElement<T>)
  const staticRows = nodes.filter(isTableRowElement<T>)
  const rows = (data
    ? data.map((record, index) => ({
        record,
        id:
          typeof id === 'function'
            ? id(record, index)
            : typeof id === 'string'
              ? String(record[id] ?? inferRowId(record, index))
              : inferRowId(record, index),
      }))
    : staticRows.map((row, index) => ({
        record: row.props.value,
        id: row.props.id ?? inferRowId(row.props.value, index),
      })))
    .slice()

  const activeSortKey = sortOrder?.value[0]

  if (activeSortKey) {
    rows.sort((left, right) => {
      const leftValue = readComparableValue(left.record, activeSortKey)
      const rightValue = readComparableValue(right.record, activeSortKey)

      if (leftValue < rightValue) {
        return -1
      }
      if (leftValue > rightValue) {
        return 1
      }
      return 0
    })
  }

  return (
    <RoundedRectangle
      data-type="Table"
      cornerRadius={12}
      fill="thinMaterial"
      stroke={{ lineWidth: 1 }}
      frame={{ maxWidth: 'infinity', alignment: 'leading' }}
      {...rest}
    >
      <VStack spacing={0} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <HStack
          spacing={0}
          padding={{ horizontal: 12, vertical: 8 }}
          frame={{ maxWidth: 'infinity', alignment: 'leading' }}
          background={{ fill: 'ultraThinMaterial', in: { kind: 'rectangle' } }}
        >
          {columns.map(column => (
            <VStack
              key={column.props.title}
              spacing={4}
              alignment={column.props.alignment ?? 'leading'}
              frame={{
                width: column.props.width,
                maxWidth: column.props.width ? undefined : 'infinity',
                alignment: column.props.alignment ?? 'leading',
              }}
              padding={{ trailing: 12 }}
              onTapGesture={() => {
                if (column.props.value && sortOrder) {
                  sortOrder.setValue([column.props.value])
                }
              }}
            >
              <Text font="caption.semibold" foregroundStyle="secondary">
                {column.props.title}
              </Text>
              {sortOrder && activeSortKey === column.props.value ? (
                <Text font="caption2.monospaced" foregroundStyle="tertiary">
                  sort
                </Text>
              ) : null}
            </VStack>
          ))}
        </HStack>
        <Divider />
        {rows.length === 0 ? (
          <Text padding={12} foregroundStyle="secondary">
            {emptyText}
          </Text>
        ) : (
          rows.map((row, index) => (
            <VStack key={row.id} spacing={0} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              <HStack
                spacing={0}
                padding={{ horizontal: 12, vertical: 10 }}
                frame={{ maxWidth: 'infinity', alignment: 'leading' }}
                background={selection?.value === row.id ? { fill: 'tertiary', in: { kind: 'rectangle' } } : undefined}
                onTapGesture={() => selection?.setValue(row.id)}
              >
                {columns.map(column => (
                  <VStack
                    key={`${row.id}-${column.props.title}`}
                    alignment={column.props.alignment ?? 'leading'}
                    frame={{
                      width: column.props.width,
                      maxWidth: column.props.width ? undefined : 'infinity',
                      alignment: column.props.alignment ?? 'leading',
                    }}
                    padding={{ trailing: 12 }}
                  >
                    {renderCell(column, row.record)}
                  </VStack>
                ))}
              </HStack>
              {index < rows.length - 1 ? <Divider /> : null}
            </VStack>
          ))
        )}
      </VStack>
    </RoundedRectangle>
  )
}
