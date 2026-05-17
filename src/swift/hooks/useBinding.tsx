import {useMemo, useState} from "react";
import {Binding} from "./runtime";

export const useBinding = <T, >(initialValue: T): Binding<T> => {
  const [value, setValue] = useState(initialValue)
  return useMemo(() => ({value, setValue}), [value])
}