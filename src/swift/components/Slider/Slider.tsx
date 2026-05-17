import type { FC, ReactNode } from 'react'
import { HStack } from '../HStack'
import { surfaceColors, viewStyle } from '../runtime'
import type { Binding } from '../runtime'
import { Text } from '../Text'
import { VStack } from '../VStack'
import type { ViewBaseProps } from '../View'

export type SliderProps = ViewBaseProps & {
  value: Binding<number>
  in?: [number, number]
  step?: number
  label?: ReactNode
  minimumValueLabel?: ReactNode
  maximumValueLabel?: ReactNode
}


export const Slider: FC<SliderProps> = ({
  value,
  in: range = [0, 1],
  step = 0.01,
  label,
  minimumValueLabel,
  maximumValueLabel,
  ...rest
}) => {
  const [min, max] = range

  return (
    <VStack spacing={6} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      {label ? label : null}
      <HStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'center' }}>
        {minimumValueLabel ? minimumValueLabel : <Text font="caption" foregroundStyle="secondary">{String(min)}</Text>}
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
        {maximumValueLabel ? maximumValueLabel : <Text font="caption" foregroundStyle="secondary">{String(max)}</Text>}
      </HStack>
    </VStack>
  )
}
