import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import * as S from './styles'

export function ResetPassword() {

	const navigation = useNavigation()

	return (
		<S.Container>
			<S.Title>Criar nova senha</S.Title>

			<S.Description>
				Sua senha deve ser diferente da {'\n'}
				senha antiga
			</S.Description>
			
			<Input placeholder="Senha" />
			<Input placeholder="Confirmar nova senha" />

			<Button
				onPress={() => navigation.reset({
					index: 0,
					routes: [{ name: 'Login' }]
				})}
				style={{
					marginTop: 158
				}}
			>
				Criar nova senha
			</Button>
		</S.Container>
	)
}