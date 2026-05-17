import type { FC } from 'react'
import { HStack, ProgressView, Text } from '../runtime'
import type { ProgressViewProps } from '../ProgressView'

export const Gauge: FC<ProgressViewProps> = ({ value = 0, total = 1, label, currentValueLabel, ...rest }) => {
  const normalized = total <= 0 ? 0 : Math.max(0, Math.min(1, value / total))
  return (
    <HStack spacing={14} {...rest}>
      <ProgressView value={value} total={total} frame={{ width: 120 }} />
      <Text font="title3.semibold">{currentValueLabel ?? `${Math.round(normalized * 100)}%`}</Text>
      {label ? <Text foregroundStyle="secondary">{label}</Text> : null}
    </HStack>
  )
}
