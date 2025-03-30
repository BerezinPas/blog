import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	max-width: 1040px;
	padding: 0 20px;
	margin: 0 auto;
	height: ${({ height = 'auto' }) => height};
`;
