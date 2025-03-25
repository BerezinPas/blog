import styled from 'styled-components';
import { ControlPanel, Logo } from './components';
import { Container } from '../container/container';

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Container>
			<Logo />
			<ControlPanel />
		</Container>
	</header>
);

export const Header = styled(HeaderContainer)`
	position: fixed;
	top: 0;
	width: 100%;
	display: flex;
	align-items: center;
	height: 120px;
	padding: 10px 0;
	box-shadow: 0 -2px 16px #000;
	border-radius: 0 0 10px 10px;
	background-color: #fff;
`;
