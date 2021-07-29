import React from 'react'
import { ActivityIndicator } from 'react-native'
import { RectButtonProps } from 'react-native-gesture-handler'

import { colors } from '../../styles/colors'

import * as S from './styles'

type ButtonProps = RectButtonProps & {
	children: string
	loading?: boolean
}

export function Button({ children, loading = false, ...rest }: ButtonProps) {

	return (
		<S.Container {...rest}>
			{loading ? (
				<ActivityIndicator color={colors.white} />
			) : (
				<S.TextButton>{children}</S.TextButton>
			)}
		</S.Container>
	)
}