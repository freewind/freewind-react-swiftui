import type { FC, PropsWithChildren } from 'react'
import { HStack } from './components/HStack'
import { RoundedRectangle } from './components/RoundedRectangle'
import { ScrollView } from './components/ScrollView'
import { VStack } from './components/VStack'
import { Text } from './components/Text'

export const Chip: FC<PropsWithChildren<{ title?: string; meta?: string }>> = ({
  title,
  meta,
  children,
}) => {
  return (
    <RoundedRectangle fill="tertiary" cornerRadius={999} padding={{ horizontal: 10, vertical: 6 }}>
      <VStack spacing={2}>
        {title ? <Text font="caption.semibold">{title}</Text> : null}
        {children ? <Text font="caption">{children}</Text> : null}
        {meta ? (
          <Text font="caption2" foregroundStyle="secondary">
            {meta}
          </Text>
        ) : null}
      </VStack>
    </RoundedRectangle>
  )
}

export const GalleryRow: FC<PropsWithChildren<{ title?: string; meta?: string }>> = ({
  title,
  meta,
  children,
}) => {
  return (
    <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      {title || meta ? (
        <VStack spacing={2} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {title ? <Text font="caption.semibold">{title}</Text> : null}
          {meta ? (
            <Text font="caption2" foregroundStyle="secondary">
              {meta}
            </Text>
          ) : null}
        </VStack>
      ) : null}
      <ScrollView axes="horizontal" frame={{ maxWidth: 'infinity' }}>
        <HStack spacing={12} padding={{ vertical: 4 }}>
          {children}
        </HStack>
      </ScrollView>
    </VStack>
  )
}
