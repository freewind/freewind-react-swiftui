import { cloneElement, type FC, type MouseEvent, type ReactElement, type ReactNode } from 'react'
import {VStack} from "../VStack";
import type { Binding } from '../runtime'

export type PopoverProps = {
  isPresented: Binding<boolean>
  content: ReactNode
  children: ReactElement
}


export const Popover: FC<PopoverProps> = ({isPresented, content, children}) => {
  return (
    <div style={{position: 'relative', display: 'inline-flex'}}>
      {cloneElement(children, {
        onClick: (event: MouseEvent) => {
          event.preventDefault()
          event.stopPropagation()
          isPresented.setValue(!isPresented.value)
        },
      })}
      {isPresented.value ? (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: 8,
            zIndex: 20,
            minWidth: 220,
          }}
        >
          <VStack
            spacing={10}
            padding={14}
            background={{fill: 'thinMaterial', in: {kind: 'roundedRectangle', cornerRadius: 14}}}
            frame={{maxWidth: 'infinity', alignment: 'leading'}}
          >
            {content}
          </VStack>
        </div>
      ) : null}
    </div>
  )
}