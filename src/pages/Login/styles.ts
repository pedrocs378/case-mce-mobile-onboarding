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

export const LogoImage = styled.Image`
	width: 177px;
	height: 114px;
	margin-bottom: 50px;
`

export const ForgotPasswordButton = styled.TouchableOpacity`
	align-self: flex-start;
`
export const ForgotPasswordText = styled.Text`
	color: ${colors.gray320};
	font-family: ${fonts.DMSans400};
	font-size: 14px;
`

export const RegisterButton = styled.TouchableOpacity`
	margin-top: 36px;
`

export const RegisterButtonText = styled.Text`
	color: ${colors.gray800};
	font-family: ${fonts.DMSans500};
	font-size: 16px;
`

export const RegisterButtonBoldText = styled.Text`
	font-family: ${fonts.DMSans700};
`