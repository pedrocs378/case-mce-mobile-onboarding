import styled, { css } from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RectButton } from "react-native-gesture-handler";

import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const Container = styled(SafeAreaView)`
	flex: 1;
	padding: 40px 30px;
	background: ${colors.white};
`

export const ScheduleContent = styled.View`
	flex: 1;
	margin: 40px 0 60px;
`

type ChangeMonthButtonProps = {
	direction: 'left' | 'right'
}

export const ChangeMonthButton = styled(RectButton)<ChangeMonthButtonProps>`
	width: 22px;
	height: 22px;
	border-radius: 11px;

	background: ${colors.purpleDark};

	align-items: center;
	justify-content: center;
`

type CalendarDayProps = {
	checked?: boolean
}

export const CalendarDay = styled(RectButton)<CalendarDayProps>`
	height: 42px;
	width: 42px;
	border-radius: 10px;
	background: ${({ checked }) => checked ? colors.purpleDark : colors.white};

	align-items: center;
	justify-content: center;
`

type CalendarDayTextProps = {
	disabled?: boolean
	checked?: boolean
}

export const CalendarDayText = styled.Text<CalendarDayTextProps>`
	font-size: 17px;
	font-family: ${fonts.DMSans500};
	color: ${({ disabled, checked }) => {
		if (checked) return colors.white
		if (disabled) return colors.gray350

		return colors.purpleDark
	}};
`

export const AvailableText = styled.Text`
	font-family: ${fonts.WorkSans400};
	color: ${colors.gray900};
	font-size: 20px;

	margin: 10px 15px;
`

export const AvailableButtonsContainer = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
`

type AvailabilityButtonProps = {
	checked: boolean
}

export const AvailabilityButton = styled(RectButton)<AvailabilityButtonProps>`
	width: 70px;
	height: 40px;
	border-radius: 8px;
	margin-top: 10px;

	align-items: center;
	justify-content: center;

	background: ${({ checked }) => checked ? colors.purpleDark : 'transparent'};
`

export const AvailabilityButtonText = styled.Text<AvailabilityButtonProps>`
	color: ${({ checked }) => checked ? colors.white : colors.gray600};
	font-family: ${fonts.DMSans500};
	font-size: 14px;
`