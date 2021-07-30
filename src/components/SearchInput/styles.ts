import styled from "styled-components/native"

import { colors } from "../../styles/colors"
import { fonts } from "../../styles/fonts"

export const Container = styled.View`
	height: 64px;
	width: 100%;

	margin: 25px 0 30px;
	padding-left: 20px;
	border-radius: 12px;

	flex-direction: row;
	align-items: center;
	background: ${colors.shape};
`

export const Input = styled.TextInput`
	height: 100%;
	width: 100%;

	padding: 0 10px;
	border-radius: 12px;
	background: ${colors.shape};
	color: ${colors.gray900};

	font-family: ${fonts.DMSans400};
	font-size: 15px;
`