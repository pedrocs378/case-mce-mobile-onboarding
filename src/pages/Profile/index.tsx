import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons, Feather } from '@expo/vector-icons'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { useAuth } from '../../hooks/useAuth'

import { colors } from '../../styles/colors'

import * as S from './styles'
import { ScrollView } from 'react-native'
import { api } from '../../services/api'
import Toast from 'react-native-toast-message'
import { Header } from '../../components/Header'

export function Profile() {
	const { user, updateUserData } = useAuth()

	const [name, setName] = useState(user?.name ?? '')
	const [phone, setPhone] = useState(user?.phone ?? '')
	const [email, setEmail] = useState(user?.email ?? '')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const navigation = useNavigation()

	async function handleUpdateUser() {
		try {
			setIsLoading(true)

			const data = {
				name,
				phone,
				email,
				...(password.trim() ? {
					password
				} : {})
			}

			const response = await api.put('/profile', data)

			updateUserData(response.data)

			Toast.show({
				type: 'success',
				position: 'top',
				text1: 'Sucesso',
				text2: `Seu perfil foi atualizado`
			})
		} catch (err) {
			let message = 'Não foi possível alterar suas informações, tente novamente mais tarde.'

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
		<ScrollView showsVerticalScrollIndicator={false}>
			<S.Container>
				<Header title="Perfil" />

				<S.Content>
					<S.AvatarContainer>
						<S.UserAvatar 
							source={{ uri: 'https://avatars.githubusercontent.com/u/53832604?v=4' }} 
						/>

						<S.ChangeAvatarWrapper>
							<S.ChangeAvatarButton style={{ borderWidth: 2 }}>
								<Feather name="camera" size={16} color={colors.white} />
							</S.ChangeAvatarButton>
						</S.ChangeAvatarWrapper>
					</S.AvatarContainer>

					<Input 
						placeholder="Nome do usuário"
						autoCapitalize="words"
						value={name}
						onChangeText={text => setName(text)}
					/>
					<Input 
						placeholder="Número do telefone"
						value={phone}
						onChangeText={text => setPhone(text)}
					/>
					<Input 
						placeholder="E-mail"
						value={email}
						onChangeText={text => setEmail(text)}
					/>
					<Input 
						placeholder="Senha"
						value={password}
						onChangeText={text => setPassword(text)}
					/>

					<Button 
						onPress={handleUpdateUser} 
						loading={isLoading}
					>
						Salvar alterações
					</Button>
				</S.Content>
			</S.Container>
		</ScrollView>
	)
}