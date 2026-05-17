import type { FC } from 'react'
import { surfaceColors, viewStyle } from '../runtime'
import type { Binding } from '../runtime'
import type { ViewBaseProps } from '../View'

export type SliderProps = ViewBaseProps & {
  value: Binding<number>
  in?: [number, number]
  step?: number
}


export const Slider: FC<SliderProps> = ({ value, in: range = [0, 1], step = 0.01, ...rest }) => {
  const [min, max] = range

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value.value}
      onChange={event => value.setValue(Number(event.target.value))}
      style={{
        width: '100%',
        accentColor: surfaceColors.accent,
        ...viewStyle(rest),
      }}
    />
  )
}
