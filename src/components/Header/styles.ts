import styled from "styled-components/native"
import { RectButton } from "react-native-gesture-handler"

import { colors } from "../../styles/colors"
import { fonts } from "../../styles/fonts"

export const Container = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const ButtonBack = styled(RectButton)`
	height: 50px;
	width: 50px;
	border-radius: 25px;
	background: ${colors.shape};

	align-items: center;
	justify-content: center;
`

export const HeaderTitle = styled.Text`
	font-family: ${fonts.WorkSans400};
	font-size: 24px;
	text-align: center;
	color: ${colors.gray900};
`

export const EmptyView = styled.View`
	width: 50px;
`