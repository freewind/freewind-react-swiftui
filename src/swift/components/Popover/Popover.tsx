import { cloneElement, type FC, type MouseEvent, type ReactElement, type ReactNode } from 'react'
import { Button } from '../Button'
import { Text } from '../Text'
import {VStack} from "../VStack";
import type { Binding } from '../runtime'

export type PopoverProps = {
  isPresented: Binding<boolean>
  title?: string
  content: ReactNode
  arrowEdge?: 'top' | 'bottom' | 'leading' | 'trailing'
  onDismiss?: () => void
  children: ReactElement
}


export const Popover: FC<PopoverProps> = ({
  isPresented,
  title,
  content,
  arrowEdge = 'top',
  onDismiss,
  children,
}) => {
  const close = () => {
    isPresented.setValue(false)
    onDismiss?.()
  }

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
            top: arrowEdge === 'top' ? '100%' : undefined,
            bottom: arrowEdge === 'bottom' ? '100%' : undefined,
            left: arrowEdge === 'trailing' ? undefined : 0,
            right: arrowEdge === 'trailing' ? 0 : undefined,
            marginTop: arrowEdge === 'top' ? 8 : undefined,
            marginBottom: arrowEdge === 'bottom' ? 8 : undefined,
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
            {title ? <Text font="caption.semibold">{title}</Text> : null}
            {content}
            <Button title="dismiss" buttonStyle="plain" controlSize="mini" onPress={close} />
          </VStack>
        </div>
      ) : null}
    </div>
  )
}
