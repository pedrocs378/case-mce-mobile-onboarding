import React from "react"
import { TextInputProps } from 'react-native'
import { colors } from "../../styles/colors"

import * as S from './styles'

type InputProps = TextInputProps

export function Input({ ...rest }: InputProps) {

	return (
		<S.Container>
			<S.TextInput 
				placeholderTextColor={colors.gray300}
				selectTextOnFocus
				{...rest} 
			/>
		</S.Container>
	)
}