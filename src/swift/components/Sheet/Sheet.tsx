import { useEffect, type FC, type MouseEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import type { Binding } from '../runtime'
import { VStack } from '../VStack'
import { Text } from '../Text'

export type SheetProps = {
  'data-type'?: string
  isPresented: Binding<boolean>
  title?: string
  detents?: Array<'medium' | 'large'>
  interactiveDismissDisabled?: boolean
  onDismiss?: () => void
  children: ReactNode
}

const stopClick = (event: MouseEvent<HTMLDivElement>) => {
  event.stopPropagation()
}

const resolvePortalRoot = () => {
  if (typeof document === 'undefined') {
    return null
  }

  return document.querySelector('[data-type="WindowGroup"]') ?? document.body
}

export const Sheet: FC<SheetProps> = ({
  ['data-type']: dataType = 'Sheet',
  isPresented,
  title,
  detents = ['large'],
  interactiveDismissDisabled = false,
  onDismiss,
  children,
}) => {
  if (!isPresented.value) {
    return null
  }

  const dismiss = () => {
    if (interactiveDismissDisabled) {
      return
    }
    isPresented.setValue(false)
    onDismiss?.()
  }

  const maxWidth = detents.includes('medium') && !detents.includes('large') ? 520 : 720

  useEffect(() => {
    if (!isPresented.value || interactiveDismissDisabled || typeof window === 'undefined') {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return
      }

      event.preventDefault()
      dismiss()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [interactiveDismissDisabled, isPresented.value])

  const sheetNode = (
    <div
      data-type={dataType}
      onClick={dismiss}
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
      <div
        onClick={stopClick}
        style={{
          width: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <VStack frame={{ width: maxWidth, maxWidth: 'infinity', alignment: 'leading' }}>
          {title ? (
            <Text font="headline.semibold" padding={{ bottom: 8 }}>
              {title}
            </Text>
          ) : null}
          {children}
        </VStack>
      </div>
    </div>
  )

  const portalRoot = resolvePortalRoot()

  if (!portalRoot) {
    return sheetNode
  }

  return createPortal(sheetNode, portalRoot)
}
