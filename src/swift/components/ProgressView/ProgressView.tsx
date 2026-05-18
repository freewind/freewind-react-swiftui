import type {FC} from "react";
import {VStack} from "../VStack";
import {Text} from "../Text";
import { surfaceColors } from '../runtime'
import type { ViewBaseProps } from '../View'


export type ProgressViewProps = ViewBaseProps & {
  value?: number
  total?: number
  label?: string
  currentValueLabel?: string
}


export const ProgressView: FC<ProgressViewProps> = ({
                                                      value,
                                                      total = 1,
                                                      label,
                                                      currentValueLabel,
                                                      ...rest
                                                    }) => {
  const normalized = value === undefined ? 0.36 : Math.max(0, Math.min(1, total <= 0 ? 0 : value / total))
  return (
    <VStack data-type="ProgressView" spacing={8} alignment="leading" {...rest}>
      {label ? <Text>{label}</Text> : null}
      <div
        style={{
          width: '100%',
          height: 8,
          borderRadius: 9999,
          background: surfaceColors.tertiaryFill,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${String(normalized * 100)}%`,
            height: '100%',
            borderRadius: 9999,
            background: surfaceColors.accent,
            transition: 'width 160ms ease-out',
          }}
        />
      </div>
      {currentValueLabel ? (
        <Text font="caption" foregroundStyle="secondary">
          {currentValueLabel}
        </Text>
      ) : value !== undefined ? (
        <Text font="caption" foregroundStyle="secondary">
          {`${Math.round(normalized * 100)}%`}
        </Text>
      ) : (
        <Text font="caption" foregroundStyle="secondary">
          Loading…
        </Text>
      )}
    </VStack>
  )
}