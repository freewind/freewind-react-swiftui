import { createContext, type FC, type ReactNode, useMemo, useState } from 'react'
import { Button } from '../Button'
import { HStack } from '../HStack'
import { Spacer } from '../Spacer'
import { Text } from '../Text'
import { VStack } from '../VStack'
import type { ViewBaseProps } from '../View'
import type { Binding, NavigationPath } from '../../types'

type NavigationRoute = {
  id: string
  title?: string
  content: ReactNode
  value?: string
}

export const navigationStackContext = createContext<{
  push: (destination: ReactNode, options?: { title?: string }) => void
  register: (value: string, destination: ReactNode, options?: { title?: string }) => void
  pushValue: (value: string, options?: { title?: string }) => void
  pop: () => void
  popToRoot: () => void
  path: NavigationPath
} | null>(null)

export type NavigationStackProps = ViewBaseProps & {
  rootTitle?: string
  rootSubtitle?: string
  path?: Binding<NavigationPath>
}

export const NavigationStack: FC<NavigationStackProps> = ({ rootTitle, rootSubtitle, path, children, ...rest }) => {
  const [stack, setStack] = useState<NavigationRoute[]>([])
  const [registeredRoutes, setRegisteredRoutes] = useState<Record<string, NavigationRoute>>({})
  const current = stack[stack.length - 1]
  const canPop = stack.length > 0
  const currentTitle = current?.title ?? rootTitle
  const previousTitle = stack[stack.length - 2]?.title ?? rootTitle

  const syncPath = (nextStack: NavigationRoute[]) => {
    if (!path) {
      return
    }
    path.setValue({
      items: nextStack.map(route => ({
        id: route.id,
        title: route.title,
      })),
    })
  }

  const contextValue = useMemo(
    () => ({
      push: (destination: ReactNode, options?: { title?: string }) =>
        setStack(prev => {
          const nextStack = [
            ...prev,
            {
              id: `${String(prev.length + 1)}-${options?.title ?? 'destination'}`,
              title: options?.title,
              content: destination,
            },
          ]
          syncPath(nextStack)
          return nextStack
        }),
      register: (value: string, destination: ReactNode, options?: { title?: string }) =>
        setRegisteredRoutes(prev => ({
          ...prev,
          [value]: {
            id: value,
            value,
            title: options?.title,
            content: destination,
          },
        })),
      pushValue: (value: string, options?: { title?: string }) => {
        const route = registeredRoutes[value]
        if (!route) {
          return
        }
        setStack(prev => {
          const nextStack = [
            ...prev,
            {
              ...route,
              title: options?.title ?? route.title,
            },
          ]
          syncPath(nextStack)
          return nextStack
        })
      },
      pop: () =>
        setStack(prev => {
          const nextStack = prev.slice(0, -1)
          syncPath(nextStack)
          return nextStack
        }),
      popToRoot: () => {
        syncPath([])
        setStack([])
      },
      path: path?.value ?? { items: [] },
    }),
    [path, registeredRoutes],
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
