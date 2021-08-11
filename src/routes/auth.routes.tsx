import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { ForgotPassword } from '../pages/ForgotPassword'
import { ResetPassword } from '../pages/ResetPassword'
import { ValidateToken } from '../pages/ValidateToken'

import { useIsComponentMounted } from '../hooks/useIsComponentMounted'

const { Navigator, Screen } = createStackNavigator()

export function AuthRoutes() {
	const { setAuthRoutesMounted } = useIsComponentMounted()

	useEffect(() => {
		return () => setAuthRoutesMounted(false)
	}, [])

	return (
		<Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Screen name="Login" component={Login} />
			<Screen name="Register" component={Register} />
			<Screen name="ForgotPassword" component={ForgotPassword} />
			<Screen name="ValidateToken" component={ValidateToken} />
			<Screen name="ResetPassword" component={ResetPassword} />
		</Navigator>
	)
}