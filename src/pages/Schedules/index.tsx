import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import Toast from 'react-native-toast-message'
import { addHours, format } from 'date-fns'

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
	avatar_url?: string
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
	const [searchText, setSearchText] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	function formatSchedulesHour(schedules: ScheduleResponse[]) {
		return schedules.map(schedule => {
			const initialHour = new Date(schedule.date).getHours()
			const endHour = addHours(new Date(schedule.date), 1)

			const initialHourFormatted = String(initialHour).padStart(2, '0')
			const endHourFormatted = String(endHour.getHours()).padStart(2, '0')

			return {
				...schedule,
				formattedHour: `${initialHourFormatted} - ${endHourFormatted}h`
			}
		})
	}

	async function fetchSchedules() {
		try {
			const response = await api.get<ScheduleResponse[]>('/appointments/me')
			const formattedSchedules = formatSchedulesHour(response.data)

			setSchedules(formattedSchedules)
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
		setSearchText(text)

		try {
			const response = await api.get<ScheduleResponse[]>(`/appointments/me?name=${text}`)

			if (response.data.length === 0) {
				await fetchSchedules()
			} else {
				const formattedSchedules = formatSchedulesHour(response.data)
				setSchedules(formattedSchedules)
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

		fetchSchedules().finally(() => setIsLoading(false))
	}, [])

	if (isLoading) return <LoadScreen />

	return (
		<S.Container>
			<Header title="Agendamentos" />

			<SearchInput
				value={searchText}
				onChangeText={handleSearch}
			/>

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