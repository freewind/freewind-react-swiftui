import type { FC, MouseEvent, ReactNode } from 'react'
import type { Binding } from '../runtime'

export type SheetProps = {
  isPresented: Binding<boolean>
  children: ReactNode
}

const stopClick = (event: MouseEvent<HTMLDivElement>) => {
  event.stopPropagation()
}


export const Sheet: FC<SheetProps> = ({isPresented, children}) => {
  if (!isPresented.value) {
    return null
  }

  return (
    <div
      onClick={() => isPresented.setValue(false)}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        zIndex: 999,
      }}
    >
      <div onClick={stopClick} style={{maxWidth: '100%', maxHeight: '100%'}}>
        {children}
      </div>
    </div>
  )
}