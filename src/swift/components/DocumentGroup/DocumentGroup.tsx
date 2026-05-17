import type { FC } from 'react'
import { Button } from '../Button'
import { HStack } from '../HStack'
import { Picker } from '../Picker'
import { Text } from '../runtime'
import { VStack } from '../VStack'
import type { ViewBaseProps } from '../View'
import type { Binding, FileDocument, ReferenceFileDocument } from '../../types'

export type DocumentGroupProps = ViewBaseProps & {
  documentName?: string
  document?: FileDocument | ReferenceFileDocument
  documents?: Array<FileDocument | ReferenceFileDocument>
  selection?: Binding<string | null>
  onCreateDocument?: () => void
  onOpenDocument?: (document: FileDocument | ReferenceFileDocument) => void
  onSaveDocument?: (document: FileDocument | ReferenceFileDocument) => void
}

export const DocumentGroup: FC<DocumentGroupProps> = ({
  documentName = 'document',
  document,
  documents,
  selection,
  onCreateDocument,
  onOpenDocument,
  onSaveDocument,
  children,
  ...rest
}) => {
  const resolvedDocuments = documents ?? (document ? [document] : [])
  const selectedId = selection?.value ?? document?.id ?? resolvedDocuments[0]?.id ?? null
  const resolvedDocument =
    resolvedDocuments.find(item => item.id === selectedId) ?? document ?? resolvedDocuments[0] ?? null
  const resolvedName = resolvedDocument?.fileName ?? documentName
  const pickerSelection =
    selection && resolvedDocument
      ? {
          value: selectedId ?? resolvedDocument.id,
          setValue: (next: string) => selection.setValue(next),
        }
      : null

  return (
    <VStack
      spacing={10}
      padding={14}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
      onTapGesture={() => {
        if (resolvedDocument) {
          onOpenDocument?.(resolvedDocument)
        }
      }}
      {...rest}
    >
      <HStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <VStack spacing={2} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text font="caption.semibold">DocumentGroup · {resolvedName}</Text>
          {resolvedDocument ? (
            <Text font="caption" foregroundStyle="secondary">
              {resolvedDocument.path}
            </Text>
          ) : null}
        </VStack>
        {resolvedDocument ? <Button title="Open" buttonStyle="bordered" controlSize="small" onPress={() => onOpenDocument?.(resolvedDocument)} /> : null}
        {resolvedDocument ? (
          <Button title="Save" buttonStyle="borderedProminent" controlSize="small" onPress={() => onSaveDocument?.(resolvedDocument)} />
        ) : null}
        {onCreateDocument ? <Button title="New" buttonStyle="plain" controlSize="small" onPress={onCreateDocument} /> : null}
      </HStack>
      {pickerSelection && resolvedDocuments.length > 1 ? (
        <Picker
          selection={pickerSelection}
          options={resolvedDocuments.map(item => ({
            label: item.fileName,
            value: item.id,
          }))}
          label={
            <Text font="caption" foregroundStyle="secondary">
              Opened document
            </Text>
          }
        />
      ) : null}
      {children}
    </VStack>
  )
}
