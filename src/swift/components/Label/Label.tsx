import type { FC } from 'react'
import { HStack } from '../HStack'
import { Image } from '../Image'
import type { ViewBaseProps } from '../View'

import { Text } from '../Text'

export type LabelProps = ViewBaseProps & {
  title: string
  systemImage?: string
}


export const Label: FC<LabelProps> = ({ title, systemImage, ...rest }) => {
  return (
    <HStack data-type="Label" spacing={8} {...rest}>
      {systemImage ? <Image systemName={systemImage} /> : null}
      <Text>{title}</Text>
    </HStack>
  )
}
