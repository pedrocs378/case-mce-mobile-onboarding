import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import Toast from 'react-native-toast-message'
import { addHours } from 'date-fns'

import { LoadScreen } from '../../components/LoadScreen'
import { Header } from '../../components/Header'
import { SearchInput } from '../../components/SearchInput'
import { PersonalCard } from '../../components/PersonalCard'

import { api } from '../../services/api'

import * as S from './styles'

type User = {
	id: string
	name: string
	phone: string
	avatar?: string
}

type ScheduleResponse = {
	id: string
	provider: User
	user: User
	date: string
}

export type ScheduleItem = ScheduleResponse & {
	formattedHour: string
}

export function Schedules() {
	const [schedules, setSchedules] = useState<ScheduleItem[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)

		api.get<ScheduleResponse[]>('/appointments/me').then(response => {
			const data = response.data.map(schedule => {
				const initialHour = new Date(schedule.date).getHours()
				const endHour = addHours(new Date(schedule.date), 1)

				return {
					...schedule,
					formattedHour: `${initialHour} - ${endHour.getHours()}h`
				}
			})

			setSchedules(data)
		}).catch(err => {
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
		}).finally(() => setIsLoading(false))
	}, [])

	if (isLoading) return <LoadScreen />

	return (
		<S.Container>
			<Header title="Agendamentos" />

			<SearchInput />

			<FlatList
				showsVerticalScrollIndicator={false}
				data={schedules}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => {
					return (
						<PersonalCard
							personal={item.provider} 
							scheduled 
							timePeriod={item.formattedHour} 
						/>
					)
				}}
			/>
		</S.Container>
	)
}