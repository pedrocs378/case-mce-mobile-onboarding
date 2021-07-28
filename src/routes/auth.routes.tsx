import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { ForgotPassword } from '../pages/ForgotPassword'
import { ResetPassword } from '../pages/ResetPassword'

const { Navigator, Screen } = createStackNavigator()

export function AuthRoutes() {

	return (
		<Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Screen name="Login" component={Login} />
			<Screen name="Register" component={Register} />
			<Screen name="ForgotPassword" component={ForgotPassword} />
			<Screen name="ResetPassword" component={ResetPassword} />
		</Navigator>
	)
}