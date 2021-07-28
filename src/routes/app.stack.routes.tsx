import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { AppTabsRoutes } from './app.tabs.routes'

import { Home } from '../pages/Home'

const { Navigator, Screen } = createStackNavigator()

export function AppStackRoutes() {

	return (
		<Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Screen name="AppTabs" component={AppTabsRoutes} />
		</Navigator>
	)
}