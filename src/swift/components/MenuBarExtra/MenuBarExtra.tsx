import type { FC, ReactElement } from 'react'
import { Menu } from '../runtime'
import type { MenuProps } from '../Menu'
import type { ViewBaseProps } from '../View'

export type MenuBarExtraProps = ViewBaseProps & {
  label: ReactElement
  items: MenuProps['items']
}

export const MenuBarExtra: FC<MenuBarExtraProps> = ({ label, items }) => {
  return <Menu data-type="MenuBarExtra" items={items}>{label}</Menu>
}
