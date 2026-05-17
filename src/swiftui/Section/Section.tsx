import type { FC } from 'react'
import { type SectionProps } from '../runtime'
import { Text } from '../Text'
import { VStack } from '../VStack'

export const Section: FC<SectionProps> = ({ title, header, footer, children, ...rest }) => {
  return (
    <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }} {...rest}>
      {header ?? title ? (
        <Text font="caption.semibold" foregroundStyle="secondary">
          {header ?? title}
        </Text>
      ) : null}
      <VStack spacing={0} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        {children}
      </VStack>
      {footer ? (
        typeof footer === 'string' ? (
          <Text font="caption" foregroundStyle="secondary">
            {footer}
          </Text>
        ) : (
          footer
        )
      ) : null}
    </VStack>
  )
}
