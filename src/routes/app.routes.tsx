import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

export function AppRoutes() {

	return (
		<Navigator
			screenOptions={{
				headerShown: false
			}}
		>
		</Navigator>
	)
}