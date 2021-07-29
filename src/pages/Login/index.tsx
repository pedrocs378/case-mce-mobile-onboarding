import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { useAuth } from '../../hooks/useAuth'

import logoImg from '../../assets/logo.png'

import * as S from './styles'
export function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { signIn } = useAuth()

	const navigation = useNavigation()

	async function handleLogin() {
		try {
			await signIn({
				email,
				password
			})
		} catch (err) {
			let message = 'Não foi possível realizar o login, tente reiniciar o app.'

			if (err.response.data.message) {
				message = err.response.data.message
			}

			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'Erro',
				text2: message
			})
		}
	}

	return (
		<S.Container>
			<S.LogoImage source={logoImg} />

			<Input 
				placeholder="Login"
				keyboardType="email-address"
				autoCompleteType="email"
				autoCapitalize="none"
				value={email}
				onChangeText={text => setEmail(text)}
			/>
			<Input
				placeholder="Senha"
				passwordRules="minlength: 5;"
				secureTextEntry
				autoCompleteType="password"
				value={password}
				onChangeText={text => setPassword(text)}
			/>

			<S.ForgotPasswordButton onPress={() => navigation.navigate('ForgotPassword')}>
				<S.ForgotPasswordText>
					Esqueci minha senha
				</S.ForgotPasswordText>
			</S.ForgotPasswordButton>

			<Button
				onPress={handleLogin}
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