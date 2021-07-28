import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import * as S from './styles'

type ButtonProps = RectButtonProps & {
	children: string
}

export function Button({ children, ...rest }: ButtonProps) {

	return (
		<S.Container {...rest}>
			<S.TextButton>{children}</S.TextButton>
		</S.Container>
	)
}