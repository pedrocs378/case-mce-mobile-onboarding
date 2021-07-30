import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import { format, addHours } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { LoadScreen } from '../../components/LoadScreen'
import { Button } from '../../components/Button'

import { api } from '../../services/api'

import { colors } from '../../styles/colors'

import * as S from './styles'

type Schedule = {
	id: string
	date: string
	formattedDate: string
	formattedHour: string
}

type Personal = {
	id: string
	name: string
	phone: string
	avatar?: string
	appointments: Schedule[]
}

type RouteParams = {
	id: string
}

export function PersonalDetails() {
	const [personal, setPersonal] = useState<Personal>({} as Personal)
	const [isLoading, setIsLoading] = useState(false)

	const { params } = useRoute()
	const { id } = params as RouteParams

	useEffect(() => {
		setIsLoading(true)

		api
			.get<Personal>(`/providers/${id}`)
			.then(response => {
				const appointments = response.data.appointments.map(appointment => {
					const initialDateHour = new Date(appointment.date).getHours()
					const endDateHour = addHours(new Date(appointment.date), 1).getHours()

					return {
						...appointment,
						formattedDate: format(new Date(appointment.date), 'dd/MM/yyyy', {
							locale: ptBR
						}),
						formattedHour: `(${initialDateHour} - ${endDateHour}h)`
					}
				})

				setPersonal({
					...response.data,
					appointments
				})
			})
			.catch((err) => {
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
			})
			.finally(() => setIsLoading(false))
	}, [id])

	if (isLoading) return <LoadScreen />

	return (
		<S.Container>
			<S.PersonalPhoto 
				source={{ uri: 'https://avatars.githubusercontent.com/u/53832604?v=4' }}
			/>

			<S.Content>
				<S.PersonalInfos>
					<S.PersonalName>{personal.name}</S.PersonalName>
					<S.PersonalPhone>Telefone: {personal.phone}</S.PersonalPhone>

					<FlatList
						contentContainerStyle={{ paddingBottom: 10 }}
						showsVerticalScrollIndicator={false}
						data={personal.appointments}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => {
							return (
								<S.ScheduleCard>
									<S.ScheduleDate>
										{item.formattedDate}{` `}
										<S.ScheduleTime>
											{item.formattedHour}
										</S.ScheduleTime>
									</S.ScheduleDate>

									<Ionicons name="list" color={colors.gray400} size={20} />
								</S.ScheduleCard>
							)
						}}
					/>
				</S.PersonalInfos>

				<Button>Agendar agora</Button>
			</S.Content>
		</S.Container>
	)
}