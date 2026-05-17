import {TabProps} from "../runtime";

export const Tab = <T extends string | number>({children}: TabProps<T>) => {
  return <>{children}</>
}