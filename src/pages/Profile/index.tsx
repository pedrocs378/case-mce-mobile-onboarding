import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Toast from 'react-native-toast-message'
import { Feather } from '@expo/vector-icons'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'

import { useAuth } from '../../hooks/useAuth'

import { api } from '../../services/api'

import userPlaceholderImg from '../../assets/user-placeholder.png'

import { colors } from '../../styles/colors'

import * as S from './styles'

export function Profile() {
	const { user, updateUserData } = useAuth()

	const [name, setName] = useState(user?.name ?? '')
	const [phone, setPhone] = useState(user?.phone ?? '')
	const [email, setEmail] = useState(user?.email ?? '')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

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

	const handleUpdateAvatar = async () => {
		const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

		if (permissionResult.granted === false) {
			alert('Necessário aceitar permissão para acessar as fotos')
			return
		}

		const result = await ImagePicker.launchImageLibraryAsync({ 
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
		})

		if (!result.cancelled) {
			try {
				const filename = result.uri.substring(result.uri.lastIndexOf('/') + 1)
				const data = new FormData()

				data.append('avatar', {
					type: 'image/jpeg',
					uri: result.uri,
					name: filename
				})

				const response = await api.patch('/users/avatar', data)

				updateUserData(response.data)

				Toast.show({
					type: 'success',
					position: 'top',
					text1: 'Sucesso',
					text2: `Avatar atualizado`
				})
			} catch (err) {
				let message = 'Algo deu errado ao tentar atualizar o avatar.'

				if (err.response.data.message) {
					message = err.response.data.message
				}

				Toast.show({
					type: 'error',
					position: 'top',
					text1: 'Erro',
					text2: message
				})
			}
		}
	}

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<S.Container>
				<Header title="Perfil" />

				<S.Content>
					<S.AvatarContainer>
						<S.UserAvatar 
							source={user?.avatar_url ? { uri: user.avatar_url } : userPlaceholderImg} 
						/>

						<S.ChangeAvatarWrapper>
							<S.ChangeAvatarButton 
								style={{ borderWidth: 2 }}
								onPress={handleUpdateAvatar}
							>
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
						keyboardType="email-address"
						autoCompleteType="email"
						autoCapitalize="none"
						value={email}
						onChangeText={text => setEmail(text)}
					/>
					<Input 
						placeholder="Senha"
						secureTextEntry
						autoCompleteType="password"
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