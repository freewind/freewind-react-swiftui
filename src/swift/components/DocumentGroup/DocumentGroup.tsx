import type { FC } from 'react'
import { Text, type ViewBaseProps } from '../runtime'
import { VStack } from '../VStack'

export type DocumentGroupProps = ViewBaseProps & {
  documentName?: string
}

export const DocumentGroup: FC<DocumentGroupProps> = ({ documentName = 'document', children, ...rest }) => {
  return (
    <VStack
      spacing={10}
      padding={14}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
      {...rest}
    >
      <Text font="caption.semibold">DocumentGroup · {documentName}</Text>
      {children}
    </VStack>
  )
}
