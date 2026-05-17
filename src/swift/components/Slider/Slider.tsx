import type { FC, ReactNode } from 'react'
import { HStack } from '../HStack'
import { surfaceColors, textColorMap, viewStyle } from '../runtime'
import type { Binding } from '../runtime'
import type { ForegroundStyleToken } from '../../types'
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

const tintTokens: readonly ForegroundStyleToken[] = ['primary', 'secondary', 'tertiary', 'red', 'blue', 'green', 'accentColor']

const isTintToken = (value: string): value is ForegroundStyleToken => {
  return (tintTokens as readonly string[]).includes(value)
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
  const tintColor =
    typeof rest.tint === 'string' && !isTintToken(rest.tint)
      ? rest.tint
      : rest.tint
        ? textColorMap[rest.tint]
        : surfaceColors.accent

  return (
    <VStack spacing={6} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      {rest.labelsHidden ? null : label ? label : null}
      <HStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'center' }}>
        {rest.labelsHidden ? null : minimumValueLabel ? minimumValueLabel : <Text font="caption" foregroundStyle="secondary">{String(min)}</Text>}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value.value}
          onChange={event => value.setValue(Number(event.target.value))}
          style={{
            width: '100%',
            accentColor: tintColor,
            ...viewStyle(rest),
          }}
        />
        {rest.labelsHidden ? null : maximumValueLabel ? maximumValueLabel : <Text font="caption" foregroundStyle="secondary">{String(max)}</Text>}
      </HStack>
    </VStack>
  )
}
