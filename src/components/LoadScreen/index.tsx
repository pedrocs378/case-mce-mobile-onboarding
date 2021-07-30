import React from 'react'
import { ActivityIndicator, View } from 'react-native'

import { colors } from '../../styles/colors'

type LoadScreenProps = {
	color?: string
	size?: number
}

export function LoadScreen({ color = colors.orange, size = 50 }: LoadScreenProps) {
	return (
		<View style={{
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: colors.white
		}}>
			<ActivityIndicator color={color} size={size} />
		</View>
	)
}