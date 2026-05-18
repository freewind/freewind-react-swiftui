import type { FC } from 'react'
import { ShapeView, type ShapeProps } from '../Rectangle'


export const Capsule: FC<ShapeProps> = ({ fill, stroke, ...rest }) => {
  return <ShapeView dataType="Capsule" {...rest} shape={{ kind: 'capsule' }} fill={fill} stroke={stroke} />
}
