import type {FC, ReactElement} from 'react'
import {VStack} from "../VStack";
import {Text} from "../Text";
import {HStack} from "../HStack";
import {Spacer} from "../Spacer";
import {Button} from "../Button";
import {Popover} from "../Popover";
import {useBinding} from "../../hooks/useBinding";

export type PopconfirmProps = {
  title: string
  description?: string
  onConfirm?: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  children: ReactElement
}


export const Popconfirm: FC<PopconfirmProps> = ({
                                                  title,
                                                  description,
                                                  onConfirm,
                                                  onCancel,
                                                  confirmText = '确定',
                                                  cancelText = '取消',
                                                  children,
                                                }) => {
  const shown = useBinding(false)
  return (
    <Popover
      isPresented={shown}
      content={
        <VStack spacing={10} alignment="leading" frame={{maxWidth: 'infinity', alignment: 'leading'}}>
          <Text font="headline">{title}</Text>
          {description ? (
            <Text font="caption" foregroundStyle="secondary">
              {description}
            </Text>
          ) : null}
          <HStack spacing={8} frame={{maxWidth: 'infinity', alignment: 'trailing'}}>
            <Spacer/>
            <Button
              title={cancelText}
              buttonStyle="bordered"
              onPress={() => {
                shown.setValue(false)
                onCancel?.()
              }}
            />
            <Button
              title={confirmText}
              buttonStyle="borderedProminent"
              onPress={() => {
                shown.setValue(false)
                onConfirm?.()
              }}
            />
          </HStack>
        </VStack>
      }
    >
      {children}
    </Popover>
  )
}