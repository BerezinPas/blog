import styled from 'styled-components';

export const TableRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	& > div {
		flex: 1 1 100px;
		height: 48px;
		display: flex;
		align-items: center;
	}
`;
