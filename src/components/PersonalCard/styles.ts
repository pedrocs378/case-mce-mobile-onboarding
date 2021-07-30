import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const Container = styled(RectButton)`
	width: 100%;
	height: 83px;

	flex-direction: row;
	align-items: center;

	margin-bottom: 25px;
`

export const PersonalAvatar = styled.Image`
	height: 100%;
	width: 76px;
	border-radius: 12px;
`

export const PersonalInfo = styled.View`
	margin-left: 16px;
`

export const PersonalName = styled.Text`
	font-family: ${fonts.DMSans400};
	font-size: 20px;
	color: ${colors.blueDark};
`

export const ScheduleInfo = styled.View`
	flex-direction: row;
	align-items: center;
	margin-top: 6px;
`

export const ScheduleStatus = styled.Text`
	text-transform: uppercase;
	color: ${colors.blue};
	font-size: 12px;
	font-family: ${fonts.DMSans500};
`

export const ScheduleTime = styled.Text`
	font-size: 12px;
	color: ${colors.gray350};
	font-family: ${fonts.DMSans400};

	margin-left: 4px;
`