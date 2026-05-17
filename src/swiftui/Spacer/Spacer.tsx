import type { FC } from 'react'
import { useContext } from 'react'
import { parentStackAxisContext, type SpacerProps } from '../runtime'

export const Spacer: FC<SpacerProps> = ({ minLength = 0 }) => {
  const parentStackAxis = useContext(parentStackAxisContext)

  return (
    <div
      style={
        parentStackAxis === 'vertical'
          ? { flex: 1, minHeight: minLength, minWidth: 0, alignSelf: 'stretch' }
          : { flex: 1, minWidth: minLength, minHeight: 0 }
      }
    />
  )
}
