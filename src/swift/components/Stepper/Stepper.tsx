import type { FC, ReactNode } from 'react'
import { Button } from '../Button'
import { HStack } from '../HStack'
import type { Binding } from '../runtime'
import { Text } from '../Text'
import { VStack } from '../VStack'
import type { ViewBaseProps } from '../View'

export type StepperProps = ViewBaseProps & {
  value: Binding<number>
  in?: [number, number]
  step?: number
  title?: string
  label?: ReactNode
  valueLabel?: ReactNode
}


export const Stepper: FC<StepperProps> = ({
  value,
  in: range = [-Infinity, Infinity],
  step = 1,
  title,
  label,
  valueLabel,
  children,
  ...rest
}) => {
  const [min, max] = range
  const decrease = () => value.setValue(Math.max(min, value.value - step))
  const increase = () => value.setValue(Math.min(max, value.value + step))
  const controlSize = rest.controlSize ?? 'small'

  return (
    <HStack data-type="Stepper" spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }} {...rest}>
      <VStack spacing={2} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        {rest.labelsHidden ? null : label ?? <Text>{children ?? title ?? 'Stepper'}</Text>}
        {rest.labelsHidden ? null : valueLabel ?? (
          <Text font="caption" foregroundStyle="secondary">
            {String(value.value)}
          </Text>
        )}
      </VStack>
      <HStack spacing={6}>
        <Button title="−" buttonStyle="bordered" controlSize={controlSize} tint={rest.tint} onPress={decrease} disabled={value.value <= min} />
        <Button title="+" buttonStyle="bordered" controlSize={controlSize} tint={rest.tint} onPress={increase} disabled={value.value >= max} />
      </HStack>
    </HStack>
  )
}
