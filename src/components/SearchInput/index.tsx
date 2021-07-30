import React from 'react'
import { TextInputProps } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { colors } from '../../styles/colors'

import * as S from './styles'

type SearchInputProps = TextInputProps

export function SearchInput(props: SearchInputProps) {

	return (
		<S.Container>
			<Feather name="search" color={colors.gray300} size={14} />
			
			<S.Input 
				{...props}
				placeholder="Pesquisar..." 
				placeholderTextColor={colors.gray300}
				selectTextOnFocus
			/>
		</S.Container>
	)
}