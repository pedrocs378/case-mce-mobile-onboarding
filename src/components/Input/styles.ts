import styled from "styled-components/native";

import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const Container = styled.View`
	width: 100%;
	height: 65px;

	margin-bottom: 24px;
`

export const TextInput = styled.TextInput`
	flex: 1;
	padding: 0 20px;
	border-radius: 12px;

	font-family: ${fonts.DMSans500};
	color: ${colors.gray800};
	background: ${colors.shape};
`