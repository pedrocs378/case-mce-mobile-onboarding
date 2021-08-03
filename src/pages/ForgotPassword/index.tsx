import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { api } from '../../services/api'

import * as S from './styles'

export function ForgotPassword() {
	const [email, setEmail] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const navigation = useNavigation()

	const handleSendToken = async () => {
		setIsLoading(true)

		try {
			await api.post('/password/forgot', { email })

			navigation.navigate('ValidateToken', { email })

			Toast.show({
				type: 'success',
				position: 'top',
				text1: 'Sucesso',
				text2: 'E-mail enviado'
			})
		} catch (err) {
			let message = 'Algo deu errado ao tentar enviar o código.'

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
			<S.Title>Esqueceu a senha?</S.Title>

			<S.Description>
				Insira o e-mail no qual está registrado em {'\n'}
				sua conta que nós enviaremos um e-mail {'\n'}
				com as orientações para a recuperação.
			</S.Description>
			
			<Input 
				placeholder="E-mail address"
				keyboardType="email-address"
				autoCapitalize="none"
				value={email}
				onChangeText={text => setEmail(text)}
			/>

			<Button
				onPress={handleSendToken}
				loading={isLoading}
				style={{
					marginTop: 113
				}}
			>
				Enviar instruções
			</Button>

			<S.LoginButton onPress={() => navigation.goBack()}>
				<S.LoginButtonText>
					Voltar para{' '}
					<S.LoginButtonBoldText>
						Login
					</S.LoginButtonBoldText>
				</S.LoginButtonText>
			</S.LoginButton>
		</S.Container>
	)
}