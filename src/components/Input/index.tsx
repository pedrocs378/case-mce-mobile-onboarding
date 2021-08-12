import React, { useCallback, useState } from "react"
import { TextInputProps, TouchableWithoutFeedback } from 'react-native'

import { colors } from "../../styles/colors"

import * as S from './styles'

type InputProps = TextInputProps & {
	isValidated?: boolean
	isErrored?: boolean
	isPassword?: boolean
	onInputBlur?: (fieldValue: string) => void
}

export function Input({ 
	isValidated = false, 
	isErrored = false,
	isPassword = false,
	value = '',
	onInputBlur,
	...rest 
}: InputProps) {
	const [isFocused, setIsFocused] = useState(false)
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

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
				secureTextEntry={isPassword && !isPasswordVisible}
				{...rest} 
			/>
			{isValidated && (
				<S.AntDesignIcon
					name="checkcircle"
					size={18}
					color={colors.white}
					isPassword={isPassword}
				/>
			)}
			{isPassword && (
				<TouchableWithoutFeedback
					onPress={() => setIsPasswordVisible(state => !state)}
				>
					<S.IoniconIcon 
						name={isPasswordVisible ? 'eye-off' : 'eye'}
						size={18}
						color={colors.gray300}
					/>
				</TouchableWithoutFeedback>
			)}
		</S.Container>
	)
}