import type { FC, ReactElement } from 'react'
import { Menu, type MenuProps, type ViewBaseProps } from '../runtime'

export type MenuBarExtraProps = ViewBaseProps & {
  label: ReactElement
  items: MenuProps['items']
}

export const MenuBarExtra: FC<MenuBarExtraProps> = ({ label, items }) => {
  return <Menu items={items}>{label}</Menu>
}
