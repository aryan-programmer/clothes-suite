import styled from "styled-components";
import {borderRadiusValues, breakpoints} from "../../utils/css";
import {spacing} from "../../utils/spacing";

const formCardBorderRadius = borderRadiusValues["xl"];

export const FormCard = styled.form.attrs({
	className: "card" as string
})`
	border-radius: ${formCardBorderRadius};
`;

export const FormCardHeader = styled.h2.attrs({
	className: "add-bg-noise"
})`
	border-radius: ${formCardBorderRadius} ${formCardBorderRadius} 0 0;
	padding: ${spacing(3)} ${spacing(4)};
`;

export const FormCardInputs = styled.div`
	padding: ${spacing(2)} ${spacing(4)};
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: ${spacing(2)};
`;

export const FormCardFooter = styled.div.attrs({
	className: "add-bg-noise"
})`
	border-radius: 0 0 ${formCardBorderRadius} ${formCardBorderRadius};
	padding: ${spacing(2)} ${spacing(4)};
`;

export const FormCardFooterButtons = styled(FormCardFooter)`
	display: flex;
	flex-direction: row;
	gap: ${spacing(4)};
	@media (max-width: ${breakpoints["sm"]}) {
		flex-direction: column;
	}
`;
