import React from 'react'

import { LoadScreen } from '../components/LoadScreen'

import { AppStackRoutes } from './app.stack.routes'
import { AuthRoutes } from './auth.routes'

import { useAuth } from '../hooks/useAuth'

export function Routes() {
	const { user, loading } = useAuth()

	if (loading) {
		return <LoadScreen />
	}

	return user ? <AppStackRoutes /> : <AuthRoutes />
}