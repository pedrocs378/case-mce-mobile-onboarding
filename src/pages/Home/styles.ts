import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(SafeAreaView)`
	flex: 1;
	padding: 35px 30px;

	background: ${colors.white};
`

export const UserContainer = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const UserInfo = styled.View`
	flex-direction: row;
	align-items: center;
`

export const UserAvatar = styled.Image`
	height: 50px;
	width: 50px;
	border-radius: 25px;
`

export const UserWelcome = styled.View`
	margin-left: 16px;
`

export const WelcomeText = styled.Text`
	font-size: 12px;
	font-family: ${fonts.DMSans400};
	color: ${colors.gray380};
`

export const UserName = styled.Text`
	font-size: 16px;
	font-family: ${fonts.DMSans400};
	color: ${colors.gray900};
	line-height: 21px;
`

export const LogoutButton = styled(RectButton)`
	padding: 10px;
	border-radius: 20px;
`

export const SearchPersonal = styled.View`
	height: 64px;
	width: 100%;

	margin: 25px 0 40px;
	padding-left: 20px;
	border-radius: 12px;

	flex-direction: row;
	align-items: center;
	background: ${colors.shape};
`

export const SearchPersonalInput = styled.TextInput`
	height: 100%;
	width: 100%;

	padding: 0 10px;
	border-radius: 12px;
	background: ${colors.shape};
	color: ${colors.gray900};

	font-family: ${fonts.DMSans400};
	font-size: 15px;
`

export const ProvidersText = styled.Text`
	font-family: ${fonts.WorkSans400};
	font-size: 20px;
	color: ${colors.gray900};

	margin-bottom: 25px;
`