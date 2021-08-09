import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather, Entypo, EvilIcons, Ionicons } from '@expo/vector-icons'

import { Home } from '../pages/Home'
import { Schedules } from '../pages/Schedules'
import { Profile } from '../pages/Profile'

import { colors } from '../styles/colors'
import { fonts } from '../styles/fonts'

import * as S from './app.tabs.styles'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppTabsRoutes() {

	return (
		<Navigator
			initialRouteName="Home"
			tabBarOptions={{
				activeTintColor: colors.blueDark,
				inactiveTintColor: colors.gray400,
				labelStyle: {
					fontFamily: fonts.DMSans700,
					fontSize: 14
				},
				style: {
					height: 80,
				},
				tabStyle: {
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column-reverse',
					paddingVertical: 20
				},
				keyboardHidesTabBar: true
			}}
		>
			<Screen 
				name="Home" 
				component={Home}
				options={{
					tabBarLabel: ({ focused }) => 
						focused && <S.LabelText>Home</S.LabelText>,
					tabBarIcon: ({ color, focused, size }) => 
						focused 
							? <Entypo name="minus" color={color} size={size} /> 
							: <Feather name="home" color={color} size={size} />
				}}
			/>
			<Screen 
				name="Schedules" 
				component={Schedules} 
				options={{
					tabBarLabel: ({ focused }) => 
						focused && <S.LabelText>Listagem</S.LabelText>,
					tabBarIcon: ({ color, focused, size }) => 
						focused 
							? <Entypo name="minus" color={color} size={size} /> 
							: <Ionicons name="list" color={color} size={size} />
				}}
			/>
			<Screen 
				name="Profile" 
				component={Profile} 
				options={{
					tabBarLabel: ({ focused }) => 
						focused && <S.LabelText>Perfil</S.LabelText>,
					tabBarIcon: ({ color, focused, size }) => 
						focused 
							? <Entypo name="minus" color={color} size={size} /> 
							: <EvilIcons name="user" color={color} size={30} />
				}}
			/>
		</Navigator>
	)
}