import type { TabProps } from '../runtime'

export const Tab = <T extends string | number>({ children }: TabProps<T>) => {
  return <div data-type="Tab" style={{ display: 'contents' }}>{children}</div>
}
