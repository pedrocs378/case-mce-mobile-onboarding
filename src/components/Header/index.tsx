import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'

import * as S from './styles'

type HeaderProps = {
	title: string
	backTo?: string
}

export function Header({ title, backTo = 'Home' }: HeaderProps) {

	const navigation = useNavigation()

	return (
		<S.Container>
			<S.ButtonBack onPress={() => navigation.navigate(backTo)}>
				<Ionicons name="ios-chevron-back" size={18} />
			</S.ButtonBack>

			<S.HeaderTitle>{title}</S.HeaderTitle>

			<S.EmptyView />
		</S.Container>
	)
}