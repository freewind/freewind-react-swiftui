import type {FC} from "react";
import {VStack} from "../VStack";
import type { StackProps } from '../VStack'


export const LazyVStack: FC<StackProps> = props => {
  return <VStack {...props} />
}