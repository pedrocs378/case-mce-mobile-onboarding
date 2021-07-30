import React from 'react'

import * as S from './styles'

type User = {
	id: string
	name: string
	phone: string
	avatar?: string
}

type PersonalCardProps = {
	personal: User
	scheduled: boolean
	timePeriod: string
}

export function PersonalCard({ personal, scheduled, timePeriod }: PersonalCardProps) {

	return (
		<S.Container>
			<S.PersonalAvatar 
				source={{ uri: 'https://avatars.githubusercontent.com/u/53832604?v=4' }}
			/>

			<S.PersonalInfo>
				<S.PersonalName>{personal.name}</S.PersonalName>

				<S.ScheduleInfo>
					<S.ScheduleStatus>{scheduled ? "Agendado" : "Atendendo"}</S.ScheduleStatus>
				
					<S.ScheduleTime>{timePeriod}</S.ScheduleTime>
				</S.ScheduleInfo>
			</S.PersonalInfo>
		</S.Container>
	)
}