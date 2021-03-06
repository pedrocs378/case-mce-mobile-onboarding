import React, { createContext, ReactNode, useState, useEffect, useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'

import { api } from "../services/api";

type AccessLevelTypes = 'user' | 'personal'

interface User {
	id: string
	name: string
	phone: string
	email: string
	accessLevel: AccessLevelTypes[]
	avatar_url?: string
}

interface SignInCredentials {
	email: string
	password: string
}

interface AuthContextData {
	user: User | undefined
	loading: boolean
	isMounted: boolean
	signIn: (credentials: SignInCredentials) => Promise<void>
	signOut: () => Promise<void>
	updateUserData: (data: User) => Promise<void>
}

interface AuthProviderProps {
	children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | undefined>()
	const [loading, setLoading] = useState(true)
	const [isMounted, setIsMounted] = useState(true)

	useEffect(() => {
		async function loadStoragedData(): Promise<void> {
			const [user, token] = await AsyncStorage.multiGet(['@CaseMCE:user', '@CaseMCE:token'])

			if (token[1] && user[1]) {
				api.defaults.headers.authorization = `Bearer ${token[1]}`

				setUser(JSON.parse(user[1]))
			}

			setLoading(false)
		}

		if (isMounted) {
			loadStoragedData()
		}

		return () => setIsMounted(false)
	}, [isMounted])

	const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
		const response = await api.post('/sessions/user', {
			email,
			password
		})

		api.defaults.headers.authorization = `Bearer ${response.data.token}`

		await AsyncStorage.setItem('@CaseMCE:user', JSON.stringify(response.data.user))
		await AsyncStorage.setItem('@CaseMCE:token', response.data.token)

		setUser(response.data.user)
	}, [])

	const signOut = useCallback(async () => {
		await AsyncStorage.removeItem('@CaseMCE:user')
		await AsyncStorage.removeItem('@CaseMCE:token')

		setUser(undefined)
	}, [])

	const updateUserData = useCallback(async (data: User) => {
		setUser(data)
		await AsyncStorage.setItem('@CaseMCE:user', JSON.stringify(data))
	}, [])

	return (
		<AuthContext.Provider value={{ user, loading, isMounted, signIn, signOut, updateUserData }}>
			{children}
		</AuthContext.Provider>
	)
}