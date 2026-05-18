import type { FC } from 'react'
import { inputChrome, type Binding, viewStyle } from '../runtime'
import type { ViewBaseProps } from '../View'

export type DatePickerProps = ViewBaseProps & {
  selection: Binding<string>
  mode?: 'date' | 'time' | 'dateAndTime'
}

export const DatePicker: FC<DatePickerProps> = ({ selection, mode = 'date', ...rest }) => {
  const type = mode === 'dateAndTime' ? 'datetime-local' : mode
  return (
    <input data-type="DatePicker"
      type={type}
      value={selection.value}
      onChange={event => selection.setValue(event.target.value)}
      style={{
        ...inputChrome('roundedBorder'),
        ...viewStyle(rest),
      }}
    />
  )
}
