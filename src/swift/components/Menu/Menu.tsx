import { cloneElement, type FC, type MouseEvent, type ReactElement, useId, useState } from 'react'
import {VStack} from "../VStack";
import {Button} from "../Button";
import type { ContextMenuItem } from '../ContextMenu'

export type MenuProps = {
  dataType?: string
  items: ContextMenuItem[]
  children: ReactElement
}


export const Menu: FC<MenuProps> = ({dataType = 'Menu', items, children}) => {
  const [open, setOpen] = useState(false)
  const id = useId()
  const menu = open ? (
    <VStack
      spacing={4}
      padding={6}
      background={{fill: 'thinMaterial', in: {kind: 'roundedRectangle', cornerRadius: 12}}}
      frame={{width: 180}}
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
    <div data-type={dataType} style={{position: 'relative'}}>
      {cloneElement(children, {
        onClick: (event: MouseEvent) => {
          event.preventDefault()
          event.stopPropagation()
          setOpen(prev => !prev)
        },
      })}
      {open ? <div style={{position: 'absolute', top: '100%', left: 0, marginTop: 8, zIndex: 20}}>{menu}</div> : null}
    </div>
  )
}
