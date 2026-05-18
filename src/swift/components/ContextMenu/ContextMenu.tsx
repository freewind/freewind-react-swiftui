import { cloneElement, type FC, type MouseEvent, type ReactElement, useId, useState } from 'react'
import {VStack} from "../VStack";
import {Button} from "../Button";

export type ContextMenuItem = {
  title: string
  onPress?: () => void
  disabled?: boolean
}

export type ContextMenuProps = {
  items: ContextMenuItem[]
  children: ReactElement
}


export const ContextMenu: FC<ContextMenuProps> = ({items, children}) => {
  const [open, setOpen] = useState(false)
  const id = useId()
  const menu = open ? (
    <VStack
      spacing={4}
      padding={6}
      background={{fill: 'thinMaterial', in: {kind: 'roundedRectangle', cornerRadius: 12}}}
      frame={{width: 180}}
      overlay={null}
    >
      {items.map(item => (
        <Button
          key={`${id}-${item.title}`}
          title={item.title}
          onPress={() => {
            setOpen(false)
            item.onPress?.()
          }}
          disabled={item.disabled}
          buttonStyle="plain"
          padding={{horizontal: 8, vertical: 6}}
          frame={{maxWidth: 'infinity', alignment: 'leading'}}
        />
      ))}
    </VStack>
  ) : null

  return (
    <div data-type="ContextMenu" style={{position: 'relative'}}>
      {cloneElement(children, {
        onContextMenu: (event: MouseEvent) => {
          event.preventDefault()
          setOpen(prev => !prev)
        },
      })}
      {open ? <div style={{position: 'absolute', top: '100%', right: 0, marginTop: 8}}>{menu}</div> : null}
    </div>
  )
}