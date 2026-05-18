import type { FC } from 'react'
import type { Binding } from '../runtime'
import {Text} from "../Text";
import {Button} from "../Button";
import type { ViewBaseProps } from '../View'

export type DropAreaProps = ViewBaseProps & {
  isTargeted?: Binding<boolean>
  onDrop?: () => void
}


import {View} from "../View";

export const DropArea: FC<DropAreaProps> = ({children, isTargeted, onDrop, ...rest}) => {
  const targeted = Boolean(isTargeted?.value)
  return (
    <View data-type="DropArea"
      {...rest}
      overlay={
        targeted ? (
          <Text
            font="caption.semibold"
            padding={{horizontal: 12, vertical: 8}}
            background={{fill: 'ultraThinMaterial', in: {kind: 'capsule'}}}
          >
            Drop Targeted
          </Text>
        ) : undefined
      }
    >
      <Button
        title="mock drop"
        buttonStyle="plain"
        onPress={() => {
          if (isTargeted) {
            isTargeted.setValue(!isTargeted.value)
          }
          onDrop?.()
        }}
      />
      {children}
    </View>
  )
}