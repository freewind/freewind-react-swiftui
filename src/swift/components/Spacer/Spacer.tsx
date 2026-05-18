import type { FC } from 'react'
import { useContext } from 'react'
import { parentStackAxisContext } from '../runtime'

export type SpacerProps = {
  minLength?: number
}


export const Spacer: FC<SpacerProps> = ({ minLength = 0 }) => {
  const parentStackAxis = useContext(parentStackAxisContext)

  return (
    <div data-type="Spacer"
      style={
        parentStackAxis === 'vertical'
          ? { flex: 1, minHeight: minLength, minWidth: 0, alignSelf: 'stretch' }
          : { flex: 1, minWidth: minLength, minHeight: 0 }
      }
    />
  )
}
