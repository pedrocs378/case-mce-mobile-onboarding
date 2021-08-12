import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { api } from '../../services/api'

import * as S from './styles'

type RouteParams = {
	email: string
}

export function ResetPassword() {
	const [password, setPassword] = useState('')
	const [password_confirmation, setPasswordConfirmation] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const { params } = useRoute()
	const { email } = params as RouteParams

	const navigation = useNavigation()

	const handleResetPassword = async () => {
		setIsLoading(true)

		try {
			await api.post('/password/reset', {
				email,
				password,
				password_confirmation
			})

			navigation.reset({
				index: 0,
				routes: [{ name: 'Login' }]
			})

			Toast.show({
				type: 'success',
				position: 'top',
				text1: 'Sucesso',
				text2: 'Sua senha foi alterada'
			})
		} catch (err) {
			let message = 'Algo deu errado ao tentar criar nova senha.'

			if (err.response.data.message) {
				message = err.response.data.message
			}

			Toast.show({
				type: 'error',
				position: 'top',
				text1: 'Erro',
				text2: message
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<S.Container>
			<S.Title>Criar nova senha</S.Title>

			<S.Description>
				Sua senha deve ser diferente da {'\n'}
				senha antiga
			</S.Description>
			
			<Input 
				placeholder="Senha"
				autoCompleteType="password"
				isPassword
				value={password}
				onChangeText={text => setPassword(text)}
			/>
			<Input 
				placeholder="Confirmar nova senha"
				autoCompleteType="password"
				isPassword
				value={password_confirmation}
				onChangeText={text => setPasswordConfirmation(text)}
			/>

			<Button
				onPress={handleResetPassword}
				loading={isLoading}
				style={{
					marginTop: 158
				}}
			>
				Criar nova senha
			</Button>
		</S.Container>
	)
}