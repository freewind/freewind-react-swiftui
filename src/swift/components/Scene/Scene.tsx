import type { FC } from 'react'
import { VStack } from '../VStack'
import { Text } from '../Text'
import type { ViewBaseProps } from '../View'

export type SceneProps = ViewBaseProps & {
  id?: string
  role?: 'windowApplication' | 'document' | 'settings'
  title?: string
}

export const Scene: FC<SceneProps> = ({ id, role = 'windowApplication', title, children, ...rest }) => {
  return (
    <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }} {...rest}>
      {id || title ? (
        <VStack spacing={2} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {title ? <Text font="caption.semibold">{title}</Text> : null}
          <Text font="caption2" foregroundStyle="secondary">
            scene {role}
            {id ? ` · ${id}` : ''}
          </Text>
        </VStack>
      ) : null}
      {children}
    </VStack>
  )
}
