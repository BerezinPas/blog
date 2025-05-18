import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonContainer = ({ className, children, isInversed, ...props }) => (
	<button className={className} {...props}>
		{children}
	</button>
);
export const Button = styled(ButtonContainer)`
	background-color: ${({ isInversed = false }) =>
		isInversed ? '#fff' : 'rgba(221, 120, 63, 1)'};
	padding: 10px 15px;
	border-radius: 5px;
	color: ${({ isInversed = false }) =>
		isInversed ? 'rgba(221, 120, 63, 1)' : '#fff'};

	border: ${({ isInversed = false }) =>
		isInversed ? '1px solid rgba(221, 120, 63, 1)' : 'none'};

	&:disabled {
		opacity: 0.5;
		cursor: default;
	}
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
	isInversed: PropTypes.bool,
};
