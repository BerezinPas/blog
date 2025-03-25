import styled from 'styled-components';

const ContainerLayout = ({ className, children }) => (
	<div className={className}>{children}</div>
);

export const Container = styled(ContainerLayout)`
	width: 100%;
	max-width: 1040px;
	padding: 0 20px;
	margin: 0 auto;
`;
