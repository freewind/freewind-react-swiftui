import {useMemo, useState} from "react";

export type ObservableObject<T extends object> = {
  value: T
  setValue: (updater: T | ((prev: T) => T)) => void
}

export const useStateObject = <T extends object>(initialValue: T): ObservableObject<T> => {
  const [value, setValue] = useState(initialValue)

  return useMemo(
    () => ({
      value,
      setValue: updater => {
        setValue(prev => (typeof updater === 'function' ? (updater as (prev: T) => T)(prev) : updater))
      },
    }),
    [value],
  )
}