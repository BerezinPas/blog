import styled from 'styled-components';

const InputContainer = ({ className, width, ...props }) => (
	<input className={className} {...props} />
);

export const Input = styled(InputContainer)`
	padding: 18px 35px;
	background-color: #fff;
	height: 50px;
	font-size: 18px;
	border-radius: 5px;
	width: ${({ width = '100%' }) => width};
	box-shadow: 1px 1px 3px #000;
`;
