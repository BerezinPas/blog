import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../../button/button';
import { ROLE } from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectSession,
	selectUserLogin,
	selectUserRole,
} from '../../../../selectors';
import { Icon } from '../../../icon/icon';
import { logout } from '../../../../actions';

const Buttons = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 16px;
`;

const ControlPanelContainer = ({ className }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectSession);

	return (
		<div className={className}>
			{roleId === ROLE.GUEST ? (
				<Link to="./login">
					<Button>Войти</Button>
				</Link>
			) : (
				<Buttons>
					<span>{login}</span>
					<button
						onClick={() => {
							dispatch(logout(session));
						}}
					>
						<Icon size="28px" id="fa-sign-out" />
					</button>
				</Buttons>
			)}
			<Buttons>
				<button onClick={() => navigate(-1)}>
					<Icon size="25px" id="fa-backward" />
				</button>
				<Link to="./post">
					<Icon size="38px" id="fa-file-text-o" />
				</Link>
				<Link to="./users">
					<Icon size="34px" id="fa-users" />
				</Link>
			</Buttons>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 10px;
`;
