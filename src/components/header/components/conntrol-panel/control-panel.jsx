import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<div>
				<Link to="./login">Войти</Link>
			</div>
			<div>
				<button onClick={() => navigate(-1)}>Назад</button>
				<Link to="./post">post</Link>
				<Link to="./users">users</Link>
			</div>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	align-items: center;
`;
