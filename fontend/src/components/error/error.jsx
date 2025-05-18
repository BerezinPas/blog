import styled from 'styled-components';
import { H2 } from '../h2/h2';

const Div = styled.div`
	text-align: center;
`;

export const Error = ({ errorMessage }) => {
	return (
		<>
			<H2>Ошибка</H2>
			<Div>{errorMessage}</Div>
		</>
	);
};
