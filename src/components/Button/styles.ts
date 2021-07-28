import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const Container = styled(RectButton)`
	width: 100%;
	height: 65px;
	border-radius: 14px;
	background: ${colors.orange};

	align-items: center;
	justify-content: center;
`

export const TextButton = styled.Text`
	font-family: ${fonts.DMSans500};
	color: ${colors.white};
	font-size: 16px;
`