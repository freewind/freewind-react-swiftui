import type { FC, PropsWithChildren, ReactNode } from 'react'
import { VStack } from './components/VStack'
import { Text } from './components/Text'

export const PlaygroundSection: FC<
  PropsWithChildren<{
    title: string
    note?: string
    summary?: string
    preview?: ReactNode
  }>
> = ({
  title,
  note,
  summary,
  preview,
  children,
}) => {
  return (
    <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <VStack spacing={4} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text font="headline">{title}</Text>
        {note || summary ? (
          <Text font="caption" foregroundStyle="secondary">
            {note ?? summary}
          </Text>
        ) : null}
      </VStack>
      {preview}
      {children}
    </VStack>
  )
}
