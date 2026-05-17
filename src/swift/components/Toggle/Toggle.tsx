import type { FC, ReactNode } from 'react'
import { Button } from '../Button'
import { HStack } from '../HStack'
import { Spacer } from '../Spacer'
import { Text } from '../Text'
import type { Binding } from '../runtime'
import { View } from '../View'
import type { ViewBaseProps } from '../View'

export type ToggleProps = ViewBaseProps & {
  isOn: Binding<boolean>
  title?: string
  label?: ReactNode
}


export const Toggle: FC<ToggleProps> = ({ isOn, title, label, children, ...rest }) => {
  const toggleLabel = label ?? <Text>{children ?? title ?? 'Toggle'}</Text>

  return (
    <Button buttonStyle="plain" onPress={() => isOn.setValue(!isOn.value)} {...rest}>
      <HStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <HStack
          spacing={0}
          padding={3}
          frame={{ width: 42, height: 24 }}
          background={{ fill: isOn.value ? 'accentColor' : 'tertiary', in: { kind: 'capsule' } }}
        >
          {isOn.value ? <Spacer minLength={0} /> : null}
          <View
            frame={{ width: 18, height: 18 }}
            background={{ fill: 'primary', in: { kind: 'capsule' } }}
            foregroundColor="#ffffff"
            overlay={
              <Text font="caption2.monospaced" foregroundColor={isOn.value ? '#0a84ff' : '#8e8e93'}>
                {isOn.value ? '1' : '0'}
              </Text>
            }
          />
        </HStack>
        {rest.labelsHidden ? null : toggleLabel}
      </HStack>
    </Button>
  )
}
