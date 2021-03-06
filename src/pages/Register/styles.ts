import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const Container = styled(SafeAreaView)`
	flex: 1;
	
	display: flex;
	align-items: center;
	justify-content: center;

	padding: 0 30px;
	background: ${colors.white};
`

export const LoginButton = styled.TouchableOpacity`
	margin-top: 36px;
`

export const LoginButtonText = styled.Text`
	color: ${colors.gray800};
	font-family: ${fonts.DMSans500};
	font-size: 16px;
`

export const LoginButtonBoldText = styled.Text`
	font-family: ${fonts.DMSans700};
`