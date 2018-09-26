import React from 'react'
import Select from 'react-select'
import { Field } from 'react-form'

import styles from './styles'

const Select_ = props => (
  <Field field={props.field}>
    {fieldApi => {
      const { onChange, onBlur, field, ...rest } = props

      const { value, setValue, setTouched } = fieldApi

      return (
        <Select
          {...rest}
          styles={styles}
          value={value || null}
          isSearchable={typeof props.searchable === 'boolean' ? props.searchable : true}
          onChange={e => {
            setValue(e)
            if (onChange) {
              onChange(e)
            }
          }}
          onBlur={e => {
            setTouched()
            if (onBlur) {
              onBlur(e)
            }
          }}
        />
      )
    }}
  </Field>
)

export default Select_
