import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import { AppStackRoutes } from './app.stack.routes'
import { AuthRoutes } from './auth.routes'

import { useAuth } from '../hooks/useAuth'

import { colors } from '../styles/colors'

export function Routes() {
	// const { user, loading } = useAuth()
	const loading = false
	const user = {}

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color={colors.orange} />
			</View>
		)
	}

	return user ? <AppStackRoutes /> : <AuthRoutes />
}