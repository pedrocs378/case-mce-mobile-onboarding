import { isValidPhoneNumber } from 'react-phone-number-input'

export const checkPhoneNumber = (value: string | undefined): boolean => {
  if (!value) return false

  const newValue = value.includes('+') ? value : `+55${value}`

  return isValidPhoneNumber(newValue)
}