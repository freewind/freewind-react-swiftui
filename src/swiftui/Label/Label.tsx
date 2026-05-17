import type { FC } from 'react'
import { HStack } from '../HStack'
import { Image } from '../Image'
import type { LabelProps } from '../runtime'
import { Text } from '../Text'

export const Label: FC<LabelProps> = ({ title, systemImage, ...rest }) => {
  return (
    <HStack spacing={8} {...rest}>
      {systemImage ? <Image systemName={systemImage} /> : null}
      <Text>{title}</Text>
    </HStack>
  )
}
