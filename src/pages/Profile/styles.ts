import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RectButton } from "react-native-gesture-handler";

import { colors } from "../../styles/colors";

export const Container = styled(SafeAreaView)`
	flex: 1;
	padding: 35px 30px;

	background: ${colors.white};
`

export const Content = styled.View`
	align-items: center;
`

export const AvatarContainer = styled.View`
	position: relative;
	margin: 40px 0;
`

export const UserAvatar = styled.Image`
	height: 108px;
	width: 108px;
	border-radius: 54px;
`

export const ChangeAvatarWrapper = styled.View`
	height: 34px;
	width: 34px;
	border-radius: 16px;

	position: absolute;
	right: 0;
	bottom: 0;

	border-width: 2px;
	border-color: ${colors.white};
	overflow: hidden;
`

export const ChangeAvatarButton = styled(RectButton)`
	width: 100%;
	height: 100%;
	background: ${colors.orange};

	justify-content: center;
	align-items: center;
`