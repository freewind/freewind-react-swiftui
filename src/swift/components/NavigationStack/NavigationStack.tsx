import { createContext, type FC, type ReactNode, useMemo, useState } from 'react'
import { Button } from '../Button'
import { HStack } from '../HStack'
import { Spacer } from '../Spacer'
import { Text } from '../Text'
import { VStack } from '../VStack'
import type { ViewBaseProps } from '../runtime'

type NavigationRoute = {
  id: string
  title?: string
  content: ReactNode
}

export const navigationStackContext = createContext<{
  push: (destination: ReactNode, options?: { title?: string }) => void
  pop: () => void
  popToRoot: () => void
} | null>(null)

export type NavigationStackProps = ViewBaseProps & {
  rootTitle?: string
  rootSubtitle?: string
}

export const NavigationStack: FC<NavigationStackProps> = ({ rootTitle, rootSubtitle, children, ...rest }) => {
  const [stack, setStack] = useState<NavigationRoute[]>([])
  const current = stack[stack.length - 1]
  const canPop = stack.length > 0
  const currentTitle = current?.title ?? rootTitle
  const previousTitle = stack[stack.length - 2]?.title ?? rootTitle
  const contextValue = useMemo(
    () => ({
      push: (destination: ReactNode, options?: { title?: string }) =>
        setStack(prev => [
          ...prev,
          {
            id: `${String(prev.length + 1)}-${options?.title ?? 'destination'}`,
            title: options?.title,
            content: destination,
          },
        ]),
      pop: () => setStack(prev => prev.slice(0, -1)),
      popToRoot: () => setStack([]),
    }),
    [],
  )

  return (
    <navigationStackContext.Provider value={contextValue}>
      <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }} background={{ fill: 'ultraThinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 20 } }} padding={12} {...rest}>
        <HStack spacing={10} padding={{ horizontal: 4, vertical: 2 }} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {canPop ? (
            <Button
              title={previousTitle ? `‹ ${previousTitle}` : '‹ Back'}
              buttonStyle="borderless"
              onPress={() => contextValue.pop()}
            />
          ) : null}
          <VStack spacing={0} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            {currentTitle ? <Text font="headline.semibold">{currentTitle}</Text> : null}
            {rootSubtitle && !canPop ? (
              <Text font="caption" foregroundStyle="secondary">
                {rootSubtitle}
              </Text>
            ) : null}
          </VStack>
          <Spacer />
          {canPop ? <Button title="Root" buttonStyle="bordered" controlSize="small" onPress={() => contextValue.popToRoot()} /> : null}
        </HStack>
        <VStack
          spacing={12}
          padding={14}
          frame={{ maxWidth: 'infinity', alignment: 'leading' }}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
          overlay={
            stack.length > 1 ? (
              <Text font="caption2.monospaced" foregroundStyle="tertiary">
                depth {String(stack.length)}
              </Text>
            ) : undefined
          }
        >
          {current?.content ?? children}
        </VStack>
      </VStack>
    </navigationStackContext.Provider>
  )
}
