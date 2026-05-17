import type { FC } from 'react'
import { type SliderProps, surfaceColors, viewStyle } from '../runtime'

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
