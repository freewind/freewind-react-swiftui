import type { FC } from 'react'
import { HStack } from '../HStack'
import type { StackProps } from '../runtime'

export const LazyHStack: FC<StackProps> = props => {
  return <HStack {...props} />
}
