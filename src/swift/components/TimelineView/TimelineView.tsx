import { type FC, type ReactNode, useEffect, useState } from 'react'
import type { ViewBaseProps } from '../runtime'

export type TimelineViewProps = Omit<ViewBaseProps, 'children'> & {
  intervalMs?: number
  children: ((context: { date: Date }) => ReactNode) | ReactNode
}

export const TimelineView: FC<TimelineViewProps> = ({ intervalMs = 1000, children }) => {
  const [date, setDate] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setDate(new Date()), intervalMs)
    return () => window.clearInterval(timer)
  }, [intervalMs])

  return <>{typeof children === 'function' ? children({ date }) : children}</>
}
