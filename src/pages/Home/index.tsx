import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'

import { LoadScreen } from '../../components/LoadScreen'
import { SearchInput } from '../../components/SearchInput'
import { PersonalCard } from '../../components/PersonalCard'

import { useAuth } from '../../hooks/useAuth'

import { api } from '../../services/api'

import userPlaceholderImg from '../../assets/user-placeholder.png'

import * as S from './styles'

type Provider = {
	id: string
	name: string
	phone: string
	avatar_url?: string
}

export function Home() {
	const [providers, setProviders] = useState<Provider[]>([])
	const [textSearch, setTextSearch] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const { user, signOut } = useAuth()

	async function fetchProviders() {
		try {
			const response = await api.get<Provider[]>(`/providers`)

			setProviders(response.data)
		} catch (err) {
			let message = 'Algo deu errado ao tentar carregar as informações.'

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

	async function handleSearch(text: string) {
		setTextSearch(text)

		try {
			const response = await api.get<Provider[]>(`/providers?name=${text}`)

			if (response.data.length === 0) {
				await fetchProviders()
			} else {
				setProviders(response.data)
			}
		} catch (err) {
			let message = 'Algo deu errado ao tentar carregar as informações.'

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

	useEffect(() => {
		setIsLoading(true)

		fetchProviders().finally(() => setIsLoading(false))
	}, [])

	if (isLoading) return <LoadScreen />

	return (
		<S.Container>
			<S.UserContainer>
				<S.UserInfo>
					<S.UserAvatar source={user?.avatar_url ? { uri: user.avatar_url } : userPlaceholderImg} />
					
					<S.UserWelcome>
						<S.WelcomeText>Bem-vindo</S.WelcomeText>
						<S.UserName>{user?.name}</S.UserName>
					</S.UserWelcome>
				</S.UserInfo>

				<S.LogoutButton onPress={signOut}>
					<Feather name="log-out" size={20} />
				</S.LogoutButton>
			</S.UserContainer>

			<SearchInput 
				value={textSearch} 
				onChangeText={handleSearch} 
			/>

			<S.ProvidersText>Profissionais</S.ProvidersText>

			<FlatList
				showsVerticalScrollIndicator={false}
				data={providers}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => {
					return (
						<PersonalCard
							personal={item} 
							scheduled={false}
							timePeriod={'08 - 20h'} 
						/>
					)
				}}
			/>
		</S.Container>
	)
}