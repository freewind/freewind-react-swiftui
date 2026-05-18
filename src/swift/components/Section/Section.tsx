import type { FC, ReactNode } from 'react'
import type { ViewBaseProps } from '../View'

import { Text } from '../Text'
import { VStack } from '../VStack'

export type SectionProps = ViewBaseProps & {
  title?: string
  header?: ReactNode
  footer?: ReactNode
}


export const Section: FC<SectionProps> = ({ title, header, footer, children, ...rest }) => {
  return (
    <VStack data-type="Section" spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }} {...rest}>
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
