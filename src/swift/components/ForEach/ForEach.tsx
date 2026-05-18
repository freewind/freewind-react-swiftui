import { Fragment, type ReactNode } from 'react'

export type ForEachProps<T> = {
  each: T[]
  keyBy: (item: T, index: number) => string | number
  children: (item: T, index: number) => ReactNode
}

export const ForEach = <T,>({ each, keyBy, children }: ForEachProps<T>) => {
  return <div data-type="ForEach" style={{ display: 'contents' }}>{each.map((item, index) => <Fragment key={keyBy(item, index)}>{children(item, index)}</Fragment>)}</div>
}
