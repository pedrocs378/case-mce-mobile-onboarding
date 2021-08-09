import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { useAuth } from '../../hooks/useAuth'

import logoImg from '../../assets/logo.png'

import * as S from './styles'

type ValidationTypes = 'email' | 'password'

type ValidatedField = {
	[field: string]: boolean
}

type ValidationError = {
	[key: string]: string
}

const validationShape = {
	email: Yup.string().required('Email é obrigatório').email('O email precisa ser válido'),
	password: Yup.string().required('Senha obrigatória')
}

export function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const [validatedFields, setValidatedFields] = useState({} as ValidatedField)
	const [validationErrors, setValidationErrors] = useState({} as ValidationError)

	const { signIn } = useAuth()

	const navigation = useNavigation()

	async function handleLogin() {
		try {
			setValidationErrors({})
			setIsLoading(true)

			const data = {
				email,
				password,
			}

			const schema = Yup.object().shape(validationShape)

			await schema.validate(data)

			await signIn(data)
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				Toast.show({
					type: 'error',
					position: 'bottom',
					text1: 'Erro',
					text2: err.message
				})

				return
			}

			let message = 'Não foi possível realizar o login, tente reiniciar o app.'

			if (err.response.data.message) {
				message = err.response.data.message
			}

			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'Erro',
				text2: message
			})
		} finally {
			setIsLoading(false)
		}
	}

	async function handleValidField(name: ValidationTypes, value: string) {
		if (!value.trim()) {
			setValidatedFields(state => ({
				...state,
				[name]: false
			}))

			return
		}

		try {
			setValidationErrors({})

			const schema = Yup.object().shape({
				[name]: validationShape[name]
			})

			await schema.validate({
				[name]: value
			})

			setValidatedFields(state => ({
				...state,
				[name]: true
			}))
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				setValidatedFields(state => ({
					...state,
					[name]: false
				}))
				setValidationErrors(state => ({
					...state,
					[name]: err.message
				}))

				return
			}
		}
	}

	return (
		<S.Container>
			<S.LogoImage source={logoImg} />

			<Input 
				placeholder="Login"
				keyboardType="email-address"
				autoCompleteType="email"
				autoCapitalize="none"
				value={email}
				onChangeText={text => setEmail(text)}
				onInputBlur={(value) => handleValidField('email', value)}
				isValidated={!!validatedFields['email']}
				isErrored={!!validationErrors['email']}
			/>
			<Input
				placeholder="Senha"
				secureTextEntry
				autoCompleteType="password"
				value={password}
				onChangeText={text => setPassword(text)}
				onInputBlur={(value) => handleValidField('password', value)}
				isValidated={!!validatedFields['password']}
				isErrored={!!validationErrors['password']}
			/>

			<S.ForgotPasswordButton onPress={() => navigation.navigate('ForgotPassword')}>
				<S.ForgotPasswordText>
					Esqueci minha senha
				</S.ForgotPasswordText>
			</S.ForgotPasswordButton>

			<Button
				loading={isLoading}
				onPress={handleLogin}
				style={{
					marginTop: 94
				}}
			>
				Login
			</Button>

			<S.RegisterButton onPress={() => navigation.navigate('Register')}>
				<S.RegisterButtonText>
					Não tem conta?{' '}
					<S.RegisterButtonBoldText>
						Registrar
					</S.RegisterButtonBoldText>
				</S.RegisterButtonText>
			</S.RegisterButton>
		</S.Container>
	)
}