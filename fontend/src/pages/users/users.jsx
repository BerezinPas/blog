import styled from 'styled-components';
import { Container, Content, H2 } from '../../components';
import { TableRow, UserRow } from './components';
import { useEffect, useState } from 'react';
import { ROLE } from '../../constants';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { checkAccess } from '../../utils/check-access';
import { request } from '../../utils';

export const UsersContainer = ({ className }) => {
	const roleId = useSelector(selectUserRole);
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], roleId)) {
			return;
		}
		Promise.all([request('/api/users'), request('/api/users/roles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}
				console.log('usersRes', usersRes);
				console.log('rolesRes', rolesRes);

				setUsers(usersRes.res);
				setRoles(rolesRes.res);
			},
		);
	}, [shouldUpdateUserList, roleId]);

	const onUserDelete = (userId) => {
		if (!checkAccess([ROLE.ADMIN], roleId)) {
			return;
		}
		request(`api/users/${userId}`, 'DELETE').then(() =>
			setShouldUpdateUserList(!shouldUpdateUserList),
		);
	};

	console.log('roles', roles);

	return (
		<Container>
			<div className={className}>
				<Content errorMessage={errorMessage} access={[ROLE.ADMIN]}>
					<H2>Пользователи</H2>
					<TableRow>
						<div>Логин</div>
						<div>Дата регистрации</div>
						<div>Роль</div>
					</TableRow>
					{users.map(({ id, registredAt, roleId, login }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registredAt={registredAt}
							roleId={roleId}
							roles={roles.filter(({ id }) => id !== ROLE.GUEST)}
							onUserDelete={() => onUserDelete(id)}
						/>
					))}
				</Content>
			</div>
		</Container>
	);
};

export const Users = styled(UsersContainer)``;
