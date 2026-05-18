import { type FC, type ReactNode, useEffect, useState } from 'react'
import type { ViewBaseProps } from '../View'


type TimelineSchedule = 'animation' | 'everySecond' | 'everyMinute' | { intervalMs: number; paused?: boolean }

export type TimelineViewProps = Omit<ViewBaseProps, 'children'> & {
  schedule?: TimelineSchedule
  children: ((context: { date: Date; cadence: 'live' | 'seconds' | 'minutes' }) => ReactNode) | ReactNode
}

export const TimelineView: FC<TimelineViewProps> = ({ schedule = 'everySecond', children }) => {
  const [date, setDate] = useState(() => new Date())

  useEffect(() => {
    if (typeof schedule === 'object' && schedule.paused) {
      return
    }

    if (schedule === 'animation') {
      let frame = 0
      const tick = () => {
        setDate(new Date())
        frame = window.requestAnimationFrame(tick)
      }
      frame = window.requestAnimationFrame(tick)
      return () => window.cancelAnimationFrame(frame)
    }

    const intervalMs =
      typeof schedule === 'object' ? schedule.intervalMs : schedule === 'everyMinute' ? 60_000 : 1_000
    const timer = window.setInterval(() => setDate(new Date()), intervalMs)
    return () => window.clearInterval(timer)
  }, [schedule])

  const cadence =
    schedule === 'animation' ? 'live' : schedule === 'everyMinute' ? 'minutes' : 'seconds'

  return <div data-type="TimelineView" style={{ display: 'contents' }}>{typeof children === 'function' ? children({ date, cadence }) : children}</div>
}
