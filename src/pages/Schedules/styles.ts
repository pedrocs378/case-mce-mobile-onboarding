import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../styles/colors";

export const Container = styled(SafeAreaView)`
	flex: 1;
	padding: 35px 30px 0;

	background: ${colors.white};
`