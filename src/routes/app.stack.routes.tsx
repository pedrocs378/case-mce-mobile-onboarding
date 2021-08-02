import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { PersonalDetails } from '../pages/PersonalDetails'
import { CreateSchedule } from '../pages/CreateSchedule'

import { AppTabsRoutes } from './app.tabs.routes'

const { Navigator, Screen } = createStackNavigator()

export function AppStackRoutes() {

	return (
		<Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Screen name="AppTabs" component={AppTabsRoutes} />
			<Screen name="PersonalDetails" component={PersonalDetails} />
			<Screen name="CreateSchedule" component={CreateSchedule} />
		</Navigator>
	)
}