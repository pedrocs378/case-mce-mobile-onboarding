import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import * as S from './styles'

export function ForgotPassword() {

	const navigation = useNavigation()

	return (
		<S.Container>
			<S.Title>Esqueceu a senha?</S.Title>

			<S.Description>
				Insira o e-mail no qual está registrado em {'\n'}
				sua conta que nós enviaremos um e-mail {'\n'}
				com as orientações para a recuperação.
			</S.Description>
			
			<Input placeholder="E-mail address" />

			<Button
				onPress={() => navigation.navigate('ResetPassword')}
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