import { Children, isValidElement, useEffect, type FC } from 'react'
import type { StackProps } from '../VStack'
import { Text, useCommandRegistration } from '../runtime'
import { VStack } from '../VStack'

export type CommandsProps = StackProps & {
  id?: string
  title?: string
}

export const Commands: FC<CommandsProps> = ({ spacing = 6, id, title, children, ...rest }) => {
  const commandTitles = Children.toArray(children)
    .filter(isValidElement)
    .map(item => {
      const props = item.props as { title?: string }
      return props.title ?? 'command'
    })
  const register = useCommandRegistration({
    id: id ?? title ?? 'commands',
    title: title ?? 'Commands',
    commandTitles,
  })

  useEffect(() => {
    register()
  }, [register, id, title, commandTitles.join('|')])

  return (
    <VStack data-type="Commands" spacing={spacing} padding={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }} {...rest}>
      {title ? (
        <Text font="caption.semibold" foregroundStyle="secondary">
          {title}
        </Text>
      ) : null}
      {children}
    </VStack>
  )
}
