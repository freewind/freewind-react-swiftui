import type { FC, MouseEvent, ReactNode } from 'react'
import type { Binding } from '../runtime'
import { VStack } from '../VStack'
import { Text } from '../Text'

export type SheetProps = {
  dataType?: string
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


export const Sheet: FC<SheetProps> = ({
  dataType = 'Sheet',
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

  return (
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
      <div onClick={stopClick} style={{maxWidth: '100%', maxHeight: '100%', width: '100%'}}>
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
}
