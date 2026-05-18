import { useCallback, useMemo, useState } from 'react'

export type ObservableObject<T extends object> = {
  value: T
  setValue: (updater: T | ((prev: T) => T)) => void
}

export const useStateObject = <T extends object>(initialValue: T): ObservableObject<T> => {
  const [value, setValue] = useState(initialValue)
  const setObjectValue = useCallback((updater: T | ((prev: T) => T)) => {
    setValue(prev => (typeof updater === 'function' ? (updater as (prev: T) => T)(prev) : updater))
  }, [])

  return useMemo(
    () => ({
      value,
      setValue: setObjectValue,
    }),
    [value, setObjectValue],
  )
}
