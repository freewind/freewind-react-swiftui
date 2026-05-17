import type {FC} from "react";
import {HStack} from "../HStack";
import {Spacer} from "../Spacer";
import {Button} from "../Button";

export const SheetActions: FC<{
  onCancel?: () => void
  onConfirm?: () => void
  cancelTitle?: string
  confirmTitle?: string
}> = ({onCancel, onConfirm, cancelTitle = '取消', confirmTitle = '保存'}) => {
  return (
    <HStack spacing={10}>
      <Spacer/>
      <Button title={cancelTitle} buttonStyle="bordered" onPress={onCancel}/>
      <Button title={confirmTitle} buttonStyle="borderedProminent" onPress={onConfirm}/>
    </HStack>
  )
}