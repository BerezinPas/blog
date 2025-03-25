import styled from 'styled-components';

const IconContainer = ({ className, id }) => {
	return <i className={`fa ${className} ${id}`} aria-hidden="true"></i>;
};
export const Icon = styled(IconContainer)`
	font-size: ${({ size = 'inherit' }) => size};
	margin: ${({ margin = '0' }) => margin};
`;
