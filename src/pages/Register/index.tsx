import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { api } from '../../services/api'

import * as S from './styles'

type ValidationTypes = 'name' | 'email' | 'phone' | 'password' | 'password_confirmation'

type ValidatedField = {
	[field: string]: boolean
}

type ValidationError = {
	[key: string]: string
}

const validationShape = {
	name: Yup.string().required('Nome é obrigatório').min(3, 'Nome muito curto'),
	email: Yup.string().required('Email é obrigatório').email('O email precisa ser válido'),
	phone: Yup.string().required('Número do telefone é obrigatório').min(11, 'Número muito curto'),
	password: Yup.string().required('Senha obrigatória').min(6, 'A senha precisa ter no minímo 6 caracteres'),
	password_confirmation: Yup.string()
		.oneOf([Yup.ref('password'), null], 'As senhas precisam ser iguais')
}

export function Register() {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [password_confirmation, setPasswordConfirmation] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const [validatedFields, setValidatedFields] = useState({} as ValidatedField)
	const [validationErrors, setValidationErrors] = useState({} as ValidationError)

	const navigation = useNavigation()

	async function handleRegister() {
		try {
			setValidationErrors({})
			setIsLoading(true)

			const data = {
				name,
				phone,
				email,
				password,
				password_confirmation
			}

			const schema = Yup.object().shape(validationShape)

			await schema.validate(data)

			await api.post('/users/user', data)

			Toast.show({
				type: 'success',
				position: 'bottom',
				text1: 'Sucesso',
				text2: 'Cadastro realizado'
			})

			navigation.navigate('Login')
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

			let message = 'Não foi possível realizar o cadastro, tente reiniciar o app.'

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

			const data = {
				[name]: value,
				...(name === 'password_confirmation' && {
					password
				})
			}

			await schema.validate(data)

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
		<ScrollView contentContainerStyle={{ flex: 1 }}>
			<S.Container>
				<Input 
					placeholder="Nome do usuário"
					autoCapitalize="words"
					value={name}
					onChangeText={text => setName(text)}
					onInputBlur={(value) => handleValidField('name', value)}
					isValidated={!!validatedFields['name']}
					isErrored={!!validationErrors['name']}
				/>
				<Input 
					placeholder="Telefone"
					keyboardType="phone-pad"
					value={phone}
					onChangeText={text => setPhone(text)}
					onInputBlur={(value) => handleValidField('phone', value)}
					isValidated={!!validatedFields['phone']}
					isErrored={!!validationErrors['phone']}
				/>
				<Input 
					placeholder="E-mail"
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
				<Input 
					placeholder="Confirmar senha"
					secureTextEntry
					autoCompleteType="password"
					value={password_confirmation}
					onChangeText={text => setPasswordConfirmation(text)}
					onInputBlur={(value) => handleValidField('password_confirmation', value)}
					isValidated={!!validatedFields['password_confirmation']}
					isErrored={!!validationErrors['password_confirmation']}
				/>

				<Button
					loading={isLoading}
					onPress={handleRegister}
					style={{
						marginTop: 82
					}}
				>
					Cadastrar
				</Button>

				<S.LoginButton onPress={() => navigation.goBack()}>
					<S.LoginButtonText>
						Já tem conta?{' '}
						<S.LoginButtonBoldText>
							Login
						</S.LoginButtonBoldText>
					</S.LoginButtonText>
				</S.LoginButton>
			</S.Container>
		</ScrollView>
	)
}