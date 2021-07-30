import React from 'react'
import { Feather } from '@expo/vector-icons'

import { SearchInput } from '../../components/SearchInput'

import { useAuth } from '../../hooks/useAuth'

import * as S from './styles'

export function Home() {

	const { user, signOut } = useAuth()

	return (
		<S.Container>
			<S.UserContainer>
				<S.UserInfo>
					<S.UserAvatar source={{ uri: 'https://avatars.githubusercontent.com/u/53832604?v=4' }} />
					
					<S.UserWelcome>
						<S.WelcomeText>Bem-vindo</S.WelcomeText>
						<S.UserName>{user?.name}</S.UserName>
					</S.UserWelcome>
				</S.UserInfo>

				<S.LogoutButton onPress={signOut}>
					<Feather name="log-out" size={20} />
				</S.LogoutButton>
			</S.UserContainer>

			<SearchInput />
		</S.Container>
	)
}