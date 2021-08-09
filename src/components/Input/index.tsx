import React, { useCallback, useRef, useState } from "react"
import { TextInput, TextInputProps } from 'react-native'

import { colors } from "../../styles/colors"

import * as S from './styles'

type InputProps = TextInputProps & {
	isValidated?: boolean
	isErrored?: boolean
	onInputBlur?: (fieldValue: string) => void
}

export function Input({ 
	isValidated = false, 
	isErrored = false,
	value = '',
	onInputBlur,
	...rest 
}: InputProps) {

	const [isFocused, setIsFocused] = useState(false)

	const handleFocus = useCallback(() => {
		setIsFocused(true)
	}, [])

	const handleBlur = useCallback(() => {
		setIsFocused(false)

		onInputBlur && onInputBlur(value)
	}, [onInputBlur])

	return (
		<S.Container
			isFocused={isFocused}
			isFilled={!!value.trim()}
			isValidated={isValidated}
			isErrored={isErrored}
		>
			<S.TextInput
				isValidated={isValidated}
				placeholderTextColor={isValidated ? colors.white : colors.gray300}
				selectTextOnFocus
				onFocus={handleFocus}
				onBlur={handleBlur}
				value={value}
				{...rest} 
			/>
			{isValidated && (
				<S.CheckIcon name="checkcircle" size={18} color={colors.white} />
			)}
		</S.Container>
	)
}