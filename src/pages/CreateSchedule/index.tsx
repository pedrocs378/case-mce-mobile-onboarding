import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { Ionicons } from '@expo/vector-icons'
import { format } from 'date-fns'

import { Header } from '../../components/Header'
import { Button } from '../../components/Button'

import { api } from '../../services/api'

import { colors } from '../../styles/colors'

import * as S from './styles'

LocaleConfig.locales['fr'] = {
	monthNames: [
		'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
		'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
	monthNamesShort: ['Jan.','Fev.','Mar','Abril','Mai','Jun','Jul.','Agos','Set.','Out.','Nov.','Dez.'],
	dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
	dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sáb.'],
	today: 'Hoje'
}
LocaleConfig.defaultLocale = 'fr'

type AvailabilityData = {
	available: boolean
	hour: number
	formatedHour: string
}

type RouteParams = {
	id: string
}

export function CreateSchedule() {
	const [availableHours, setAvailableHours] = useState<AvailabilityData[]>([])
	const [selectedHour, setSelectedHour] = useState(8)
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [dateString, setDateString] = useState(() => {
		return format(new Date(), 'yyyy-MM-dd')
	})

	const { params } = useRoute()
	const { id: provider_id } = params as RouteParams

	const handleChangeDate = (date: string) => {
		setDateString(date)
	}

	const calendarArrow = (direction: 'left' | 'right') => {
		return (
			<S.ChangeMonthButton direction={direction}>
				<Ionicons 
					name={direction === 'left' ? 'chevron-back' : 'chevron-forward'}
					color={colors.white} 
					size={10} 
				/>
			</S.ChangeMonthButton>
		)
	}

	useEffect(() => {
		const currentDate = new Date(dateString)
		currentDate.setHours(selectedDate.getHours())

		setSelectedDate(currentDate)
	}, [dateString])

	useEffect(() => {
		const [year, month, day] = dateString.split('-')

		api
			.get<AvailabilityData[]>(`/providers/${provider_id}/available_day_hours?year=${year}&month=${month}&day=${day}`)
			.then(response => {
				const hours = response.data
					.filter(hour => hour.available)
					.map(hour => {
						const currentHour = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), hour.hour)
						
						return {
							...hour,
							formatedHour: format(currentHour, "HH:mm'h'")
						}
					})

				setAvailableHours(hours)
				setSelectedHour(hours[0].hour)
			})
	}, [dateString, provider_id])

	return (
		<S.Container>
			<Header title="Horários" backTo="PersonalDetails" />

			<ScrollView showsVerticalScrollIndicator={false}>
				<S.ScheduleContent>
					<Calendar
						current={dateString}
						onMonthChange={(date) => handleChangeDate(date.dateString)}
						onDayPress={(date) => handleChangeDate(date.dateString)}
						minDate={new Date()}
						hideDayNames
						enableSwipeMonths
						monthFormat="MMMM"
						renderArrow={calendarArrow}
						hideExtraDays
						markedDates={{
							[dateString]: {				
								selected: true
							}
						}}
						dayComponent={({ date, state }) => {
							return (
								<S.CalendarDay 
									checked={dateString === date.dateString} 
									onPress={() => setDateString(date.dateString)}
								>
									<S.CalendarDayText
										checked={dateString === date.dateString}
										disabled={state === 'disabled'}
									>
										{date.day}
									</S.CalendarDayText>
								</S.CalendarDay>
							)
						}}
					/>

					<S.AvailableText>Disponíveis</S.AvailableText>

					<S.AvailableButtonsContainer>
						{availableHours.map(({ hour, formatedHour }) => {
							return (
								<S.AvailabilityButton 
									key={hour} 
									checked={selectedHour === hour}
									onPress={() => setSelectedHour(hour)}
								>
									<S.AvailabilityButtonText 
										checked={selectedHour === hour}
									>
										{formatedHour}
									</S.AvailabilityButtonText>
								</S.AvailabilityButton>
							)
						})}
					</S.AvailableButtonsContainer>
				</S.ScheduleContent>
			</ScrollView>

			<Button>Confirmar data</Button>
		</S.Container>
	)
}