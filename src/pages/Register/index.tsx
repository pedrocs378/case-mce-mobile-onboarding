import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import * as S from './styles'

export function Register() {

	const navigation = useNavigation()

	return (
		<S.Container>

			<Input placeholder="Nome do usuário" />
			<Input placeholder="Telefone" />
			<Input placeholder="E-mail" />
			<Input placeholder="Senha" />
			<Input placeholder="Confirmar senha" />

			<Button
				style={{
					marginTop: 82
				}}
			>
				Cadastrar
			</Button>

			<S.LoginButton onPress={() => navigation.goBack()}>
				<S.LoginButtonText>
					Já tem conta?{' '}
					<S.LoginButtonBoldText>
						Login
					</S.LoginButtonBoldText>
				</S.LoginButtonText>
			</S.LoginButton>
		</S.Container>
	)
}