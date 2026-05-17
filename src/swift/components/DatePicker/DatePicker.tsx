import type { FC } from 'react'
import { inputChrome, type Binding, type ViewBaseProps, viewStyle } from '../runtime'

export type DatePickerProps = ViewBaseProps & {
  selection: Binding<string>
  mode?: 'date' | 'time' | 'dateAndTime'
}

export const DatePicker: FC<DatePickerProps> = ({ selection, mode = 'date', ...rest }) => {
  const type = mode === 'dateAndTime' ? 'datetime-local' : mode
  return (
    <input
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
