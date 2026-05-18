import { type FC, useEffect, useRef } from 'react'
import { viewStyle } from '../runtime'
import type { ViewBaseProps } from '../View'

export type CanvasProps = ViewBaseProps & {
  draw?: (context: CanvasRenderingContext2D, size: { width: number; height: number }) => void
}

export const Canvas: FC<CanvasProps> = ({ draw, frame, ...rest }) => {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context || !draw) {
      return
    }
    const width = typeof frame?.width === 'number' ? frame.width : 240
    const height = typeof frame?.height === 'number' ? frame.height : 160
    canvas.width = width
    canvas.height = height
    draw(context, { width, height })
  }, [draw, frame?.height, frame?.width])

  return <canvas data-type="Canvas" ref={ref} style={viewStyle({ ...rest, frame })} />
}
