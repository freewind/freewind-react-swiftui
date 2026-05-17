import type { FC } from 'react'
import { Text } from '../runtime'
import { VStack } from '../VStack'
import type { ViewBaseProps } from '../View'
import type { FileDocument, ReferenceFileDocument } from '../../types'

export type DocumentGroupProps = ViewBaseProps & {
  documentName?: string
  document?: FileDocument | ReferenceFileDocument
  onOpenDocument?: (document: FileDocument | ReferenceFileDocument) => void
}

export const DocumentGroup: FC<DocumentGroupProps> = ({
  documentName = 'document',
  document,
  onOpenDocument,
  children,
  ...rest
}) => {
  const resolvedName = document?.fileName ?? documentName
  return (
    <VStack
      spacing={10}
      padding={14}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
      onTapGesture={() => {
        if (document) {
          onOpenDocument?.(document)
        }
      }}
      {...rest}
    >
      <Text font="caption.semibold">DocumentGroup · {resolvedName}</Text>
      {document ? (
        <Text font="caption" foregroundStyle="secondary">
          {document.path}
        </Text>
      ) : null}
      {children}
    </VStack>
  )
}
