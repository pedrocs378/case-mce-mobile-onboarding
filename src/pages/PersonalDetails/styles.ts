import styled from "styled-components/native";

import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const Container = styled.View`
	flex: 1;
	background: ${colors.white};
`

export const PersonalPhoto = styled.Image`
	width: 100%;
	height: 350px;
`

export const Content = styled.View`
	flex: 1;
	padding: 30px;
`

export const PersonalInfos = styled.View`
	flex: 1;
`

export const PersonalName = styled.Text`
	font-family: ${fonts.DMSans500};
	font-size: 22px;
	color: ${colors.black};
`

export const PersonalPhone = styled.Text`
	font-family: ${fonts.DMSans400};
	color: ${colors.gray600};
	font-size: 12px;

	margin-top: 6px;
	margin-bottom: 20px;
`

export const ScheduleCard = styled.View`
	width: 100%;
	height: 64px;
	background: ${colors.shape};
	border-radius: 12px;
	padding: 0 20px;
	margin-bottom: 5px;

	flex-direction: row;
	align-items: center;
	justify-content: space-between;

`

export const ScheduleDate = styled.Text`
	font-family: ${fonts.DMSans400};
	font-size: 15px;
	color: ${colors.gray750};
`

export const ScheduleTime = styled.Text`
	font-family: ${fonts.DMSans700};
`