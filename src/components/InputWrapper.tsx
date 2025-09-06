'use client'

import React, {createElement, InputHTMLAttributes, useState} from 'react'

type InputProps = Exclude<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  type: 'checkbox' | 'text' | 'email'
}

function InputWrapper({name, ...props}: InputProps) {
  const [error, setError] = useState<string>()

  const nameToDisplayableName = name?.replace(/[A-Z]/g, _ => ` ${_}`)
  const mapType = props.type === 'email' ? 'text' : props.type

  const extraStyles = {
    text: 'flex-row-reverse min-w-2xs w-5/12 justify-end',
    checkbox: 'accent-green-500 min-w-fit',
  }[mapType]

  const extraInputStyles = {
    text: 'border-1 rounded border-silver-lake-blue-600 outline-0',
    checkbox: 'accent-green-500 size-[1.15rem]',
  }[mapType]

  return (
    <div>
      <div
        className={['flex gap-1 capitalize items-center', extraStyles].join(
          ' ',
        )}
      >
        {createElement('input', {
          ...props,
          name,
          id: props.id ?? name,
          'aria-label': nameToDisplayableName,
          className: extraInputStyles + ' ' + props.className,
          onChange: e => {
            // ? Beside achieving what i wanned.
            // ? The validation logic should be moved to onBlur,
            // ? Error Clean up when input is valid should be done here.
            props?.onChange?.(e)
            if (
              e.currentTarget.pattern &&
              !new RegExp(e.currentTarget.pattern).test(e.currentTarget.value)
            ) {
              setError('Invalid')
            } else {
              setError(undefined)
            }
            if (!e.currentTarget.checkValidity()) {
              if (
                e.currentTarget.validity.tooShort ||
                e.currentTarget.validity.tooLong
              ) {
                e.currentTarget.setCustomValidity(
                  `Name is too ${e.currentTarget.validity.tooLong ? 'long' : 'short'}.`,
                )
              }
            }
          },
        })}
        <p>{nameToDisplayableName}</p>
      </div>
      {error && <pre className="text-xs text-red-400 text-center">{error}</pre>}
    </div>
  )
}

export default InputWrapper
