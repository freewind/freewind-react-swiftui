import type { CSSProperties, FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '../Button'
import { Text, type Binding } from '../runtime'

export type FullScreenCoverProps = {
  isPresented: Binding<boolean>
  title?: string
  children: ReactNode
}

const resolvePortalRoot = () => {
  if (typeof document === 'undefined') {
    return null
  }

  return document.querySelector('[data-type="WindowGroup"]') ?? document.body
}

export const FullScreenCover: FC<FullScreenCoverProps> = ({ isPresented, title, children }) => {
  if (!isPresented.value) {
    return null
  }
  const style: CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 1000,
    background: 'rgba(15, 23, 42, 0.72)',
    padding: 20,
    overflow: 'auto',
  }

  const coverNode = (
    <div data-type="FullScreenCover" style={style}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        {title ? <Text font="headline.semibold" foregroundColor="#ffffff">{title}</Text> : <span />}
        <Button title="关闭" buttonStyle="bordered" onPress={() => isPresented.setValue(false)} />
      </div>
      {children}
    </div>
  )

  const portalRoot = resolvePortalRoot()

  if (!portalRoot) {
    return coverNode
  }

  return createPortal(coverNode, portalRoot)
}
