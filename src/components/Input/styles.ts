import styled, { css } from "styled-components/native";
import { AntDesign } from '@expo/vector-icons'

import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

type ContainerProps = {
	isFocused: boolean
	isFilled: boolean
	isValidated: boolean
	isErrored: boolean
}

export const Container = styled.View<ContainerProps>`
	width: 100%;
	height: 65px;
	position: relative;
	background: ${colors.shape};

	margin-bottom: 24px;
	border-width: 2px;
	border-radius: 12px;
	border-color: ${({ isErrored, isFilled, isFocused }) => {
		if (isFocused || isFilled) return colors.orange
		if (isErrored) return colors.red

		return colors.shape
	}};

	${({ isValidated }) => isValidated && css`
		background: ${colors.purpleDark};
		border-color: ${colors.purpleDark};
	`}
`

type TextInputProps = {
	isValidated: boolean
}

export const TextInput = styled.TextInput<TextInputProps>`
	flex: 1;
	padding: 0 20px;
	border-radius: 12px;

	font-family: ${fonts.DMSans500};
	color: ${colors.gray800};

	${({ isValidated }) => isValidated && css`
		color: ${colors.white};
	`}
`

export const CheckIcon = styled(AntDesign)`
	position: absolute;
	right: 20px;
	top: 22px;
`