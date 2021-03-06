import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import userPlaceholderImg from '../../assets/user-placeholder.png'

import { colors } from '../../styles/colors'

import * as S from './styles'

type User = {
	id: string
	name: string
	phone: string
	avatar_url?: string
}

type PersonalCardProps = {
	personal: User
	scheduled: boolean
	timePeriod: string
}

export function PersonalCard({ personal, scheduled, timePeriod }: PersonalCardProps) {

	const navigation = useNavigation()

	const handleGoToPersonalDetails = useCallback(() => {
		navigation.navigate('PersonalDetails', { id: personal.id })
	}, [personal.id])

	return (
		<S.Container onPress={handleGoToPersonalDetails}>
			<S.PersonalAvatar 
				source={personal.avatar_url ? { uri: personal.avatar_url } : userPlaceholderImg}
			/>

			<S.PersonalInfo>
				<S.PersonalName>{personal.name}</S.PersonalName>

				<S.ScheduleInfo>
					<S.ScheduleStatus>{scheduled ? "Agendado" : "Atendendo"}</S.ScheduleStatus>
				
					<Feather 
						name="clock" 
						color={colors.gray350} 
						size={11}
						style={{
							marginLeft: 10
						}}
					/>

					<S.ScheduleTime>
						{timePeriod}
					</S.ScheduleTime>
				</S.ScheduleInfo>
			</S.PersonalInfo>
		</S.Container>
	)
}