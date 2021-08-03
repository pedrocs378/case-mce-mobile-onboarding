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

export function ValidateToken() {
	const [token, setToken] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const { params } = useRoute()
	const { email } = params as RouteParams

	const navigation = useNavigation()

	const handleSendToken = async () => {
		setIsLoading(true)

		try {
			await api.post('/password/validate_token', {
				email,
				token
			})

			navigation.navigate('ResetPassword', { email })

			Toast.show({
				type: 'success',
				position: 'top',
				text1: 'Sucesso',
				text2: 'Token validado'
			})
		} catch (err) {
			let message = 'Algo deu errado ao tentar validar o token.'

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
			<S.Title>Validar token</S.Title>

			<S.Description>
				Nós enviamos no seu e-mail um token para válidar {'\n'}
				que é mesmo você. {'\n'}
				Por favor, insira ele abaixo para que possamos verificar.
			</S.Description>
			
			<Input 
				placeholder="Token"
				keyboardType="number-pad"
				maxLength={5}
				value={token}
				onChangeText={text => setToken(text)}
			/>

			<Button
				onPress={handleSendToken}
				loading={isLoading}
				style={{
					marginTop: 113
				}}
			>
				Verificar
			</Button>
		</S.Container>
	)
}