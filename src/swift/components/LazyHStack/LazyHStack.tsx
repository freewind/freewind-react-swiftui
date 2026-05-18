import type { FC } from 'react'
import { HStack } from '../HStack'
import type { StackProps } from '../VStack'


export const LazyHStack: FC<StackProps> = props => {
  return <HStack dataType="LazyHStack" {...props} />
}
