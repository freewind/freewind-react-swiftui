import type { FC, ReactNode } from 'react'

export const If: FC<{ when: boolean; children: ReactNode }> = ({ when, children }) => {
  return when ? <>{children}</> : null
}
