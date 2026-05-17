import { createContext, type FC, type ReactNode, useMemo, useState } from 'react'
import { Button } from '../Button'
import { HStack } from '../HStack'
import { Spacer } from '../Spacer'
import { Text } from '../Text'
import { VStack } from '../VStack'
import type { ViewBaseProps } from '../runtime'

export const navigationStackContext = createContext<{
  push: (destination: ReactNode) => void
  pop: () => void
} | null>(null)

export type NavigationStackProps = ViewBaseProps & {
  rootTitle?: string
}

export const NavigationStack: FC<NavigationStackProps> = ({ rootTitle, children, ...rest }) => {
  const [stack, setStack] = useState<ReactNode[]>([])
  const current = stack[stack.length - 1] ?? children
  const canPop = stack.length > 0
  const contextValue = useMemo(
    () => ({
      push: (destination: ReactNode) => setStack(prev => [...prev, destination]),
      pop: () => setStack(prev => prev.slice(0, -1)),
    }),
    [],
  )

  return (
    <navigationStackContext.Provider value={contextValue}>
      <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }} {...rest}>
        <HStack spacing={10} padding={{ horizontal: 4, vertical: 2 }} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {canPop ? <Button title="返回" buttonStyle="borderless" onPress={() => contextValue.pop()} /> : null}
          {rootTitle ? <Text font="headline.semibold">{rootTitle}</Text> : null}
          <Spacer />
        </HStack>
        <VStack
          spacing={12}
          padding={14}
          frame={{ maxWidth: 'infinity', alignment: 'leading' }}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
        >
          {current}
        </VStack>
      </VStack>
    </navigationStackContext.Provider>
  )
}
