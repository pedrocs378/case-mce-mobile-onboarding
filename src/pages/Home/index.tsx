import React from 'react'
import { Feather } from '@expo/vector-icons'

import { colors } from '../../styles/colors'

import * as S from './styles'

export function Home() {

	return (
		<S.Container>
			<S.UserContainer>
				<S.UserAvatar source={{ uri: 'https://avatars.githubusercontent.com/u/53832604?v=4' }} />
			
				<S.UserWelcome>
					<S.WelcomeText>Bem-vindo</S.WelcomeText>
					<S.UserName>Pedro César</S.UserName>
				</S.UserWelcome>
			</S.UserContainer>

			<S.SearchPersonal>
				<Feather name="search" color={colors.gray300} size={14} />
				
				<S.SearchPersonalInput 
					placeholder="Pesquisar..." 
					placeholderTextColor={colors.gray300}
					selectTextOnFocus
				/>
			</S.SearchPersonal>
		</S.Container>
	)
}