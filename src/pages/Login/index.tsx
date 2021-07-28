import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import logoImg from '../../assets/logo.png'

import * as S from './styles'

export function Login() {

	const navigation = useNavigation()

	return (
		<S.Container>
			<S.LogoImage source={logoImg} />

			<Input placeholder="Login" />
			<Input placeholder="Senha" />

			<S.ForgotPasswordButton>
				<S.ForgotPasswordText>
					Esqueci minha senha
				</S.ForgotPasswordText>
			</S.ForgotPasswordButton>

			<Button
				style={{
					marginTop: 94
				}}
			>
				Login
			</Button>

			<S.RegisterButton onPress={() => navigation.navigate('Register')}>
				<S.RegisterButtonText>
					Não tem conta?{' '}
					<S.RegisterButtonBoldText>
						Registrar
					</S.RegisterButtonBoldText>
				</S.RegisterButtonText>
			</S.RegisterButton>
		</S.Container>
	)
}