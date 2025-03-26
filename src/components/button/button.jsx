import styled from 'styled-components';

const ButtonContainer = ({ className, children, ...props }) => (
	<button className={className} {...props}>
		{children}
	</button>
);

export const Button = styled(ButtonContainer)`
	background-color: rgba(221, 120, 63, 1);
	padding: 10px;
	border-radius: 5px;
	color: #fff;
	&:disabled {
		opacity: 0.5;
		cursor: default;
	}
`;
