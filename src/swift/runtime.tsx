import { createContext, isValidElement, type CSSProperties, type ReactNode, useContext, useMemo, useState as useReactState } from 'react'
import { useBinding as useBaseBinding, binding as createBinding } from './hooks/useBinding'
import { useStateObject } from './hooks/useStateObject'
import type {
  EnvironmentValues,
  FileDocument,
  FocusedValues,
  NavigationPath,
  OpenURLAction,
  OpenUrlResult,
  ScrollPosition,
  ScrollTarget,
} from './types'
import { isForegroundToken, materialValue } from './components/utils/colorTokens'
import { useMockEnvironment } from '../demo/qq/provider'

export * from './types'
export * from './components'
export { binding, useBinding } from './hooks/useBinding'
export { useStateObject } from './hooks/useStateObject'
export { disabledContext } from './components/utils/disabledContext'
export { inputChrome } from './components/utils/inputChrome'
export { mapStackAlignment } from './components/utils/mapStackAlignment'
export { parentStackAxisContext } from './components/utils/parentStackAxisContext'
export { surfaceColors } from './components/utils/surfaceColors'
export { textColorMap } from './components/utils/textColorMap'
export { viewStyle } from './components/utils/viewStyle'
export { mapFrameAlignment } from './components/ZStack/mapFrameAlignment'
export { isForegroundToken, materialValue } from './components/utils/colorTokens'
export type { GridItemSpec, GridItemSize } from './components/LazyVGrid/LazyVGrid'
export { MockEnvironmentProvider, useMockEnvironment, useMockAppShell } from '../demo/qq/provider'

export const _internal = {
  isValidElement,
}

const environmentContext = createContext<EnvironmentValues>({})
const focusedValuesContext = createContext<FocusedValues>({})
const openUrlContext = createContext<OpenURLAction>({
  callAsFunction: () => 'systemAction',
})

const storageMap = new Map<string, unknown>()

const useStoredState = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useReactState<T>(() => {
    return storageMap.has(key) ? (storageMap.get(key) as T) : initialValue
  })

  return useMemo(
    () =>
      createBinding(value, next => {
        storageMap.set(key, next)
        setValue(next)
      }),
    [key, value],
  )
}

export const useState = useBaseBinding

export const useSceneStorage = <T,>(key: string, initialValue: T) => {
  return useStoredState(`scene:${key}`, initialValue)
}

export const useAppStorage = <T,>(key: string, initialValue: T) => {
  return useStoredState(`app:${key}`, initialValue)
}

export const useEnvironment = <T,>(key: string, fallback: T): T => {
  const values = useContext(environmentContext)
  return (values[key] as T | undefined) ?? fallback
}

export const useFocusedValue = <T,>(key: string): T | undefined => {
  const values = useContext(focusedValuesContext)
  return values[key] as T | undefined
}

export const EnvironmentProvider = ({
  values,
  children,
}: {
  values: EnvironmentValues
  children: ReactNode
}) => {
  const inherited = useContext(environmentContext)
  const merged = useMemo(() => ({ ...inherited, ...values }), [inherited, values])
  return <environmentContext.Provider value={merged}>{children}</environmentContext.Provider>
}

export const FocusedValuesProvider = ({
  values,
  children,
}: {
  values: FocusedValues
  children: ReactNode
}) => {
  const inherited = useContext(focusedValuesContext)
  const merged = useMemo(() => ({ ...inherited, ...values }), [inherited, values])
  return <focusedValuesContext.Provider value={merged}>{children}</focusedValuesContext.Provider>
}

export const useOpenURLAction = (): OpenURLAction => {
  return useContext(openUrlContext)
}

export const useDefaultOpenURLAction = (): OpenURLAction => {
  const env = useMockEnvironment()
  return useMemo(
    () => ({
      callAsFunction: url => {
        env.systemApi.openUrl(url)
        return 'handled'
      },
    }),
    [env],
  )
}

export const useMockFileDocument = (path: string): FileDocument | null => {
  const env = useMockEnvironment()
  const node = env.fileApi.documentByPath(path)
  if (!node) {
    return null
  }
  return fileDocument({
    fileName: node.fileName,
    path: node.path,
    mimeType: node.mimeType,
    data: node.data,
  })
}

export const OpenURLActionProvider = ({
  action,
  children,
}: {
  action: (url: string) => OpenUrlResult | Promise<OpenUrlResult>
  children: ReactNode
}) => {
  const value = useMemo<OpenURLAction>(
    () => ({
      callAsFunction: action,
    }),
    [action],
  )
  return <openUrlContext.Provider value={value}>{children}</openUrlContext.Provider>
}

export const useFocusState = <T extends string | number | boolean | null>(initialValue: T) => {
  return useBaseBinding(initialValue)
}

export const useObservedObject = useStateObject

export const useEnvironmentObject = useStateObject

export const useScenePhase = () => {
  return useEnvironment<'active' | 'inactive' | 'background'>('scenePhase', 'active')
}

export const navigationPath = (...items: unknown[]): NavigationPath => {
  return { items }
}

export const scrollPosition = (input: ScrollPosition = {}): ScrollPosition => {
  return input
}

export const scrollTarget = (id: string, anchor?: ScrollTarget['anchor']): ScrollTarget => {
  return { id, anchor }
}

export const fileDocument = (input: Omit<FileDocument, 'id'> & { id?: string }): FileDocument => {
  return {
    id: input.id ?? input.path,
    fileName: input.fileName,
    path: input.path,
    mimeType: input.mimeType,
    data: input.data,
  }
}

export type { CSSProperties }
