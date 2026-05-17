import { useMemo, useState } from 'react'
import type { Binding } from '../runtime'


export const binding = <T,>(value: T, setValue: (next: T) => void): Binding<T> => ({
  value,
  setValue,
})


export const useBinding = <T,>(initialValue: T): Binding<T> => {
  const [value, setValue] = useState(initialValue)
  return useMemo(() => ({ value, setValue }), [value])
}
