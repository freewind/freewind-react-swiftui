import type { FC } from 'react'
import { Button } from '../Button'
import type { Binding, ViewBaseProps } from '../runtime'

export type EditButtonProps = ViewBaseProps & {
  isEditing: Binding<boolean>
  editTitle?: string
  doneTitle?: string
}

export const EditButton: FC<EditButtonProps> = ({
  isEditing,
  editTitle = '编辑',
  doneTitle = '完成',
  ...rest
}) => {
  return (
    <Button
      title={isEditing.value ? doneTitle : editTitle}
      buttonStyle="borderless"
      onPress={() => isEditing.setValue(!isEditing.value)}
      {...rest}
    />
  )
}
