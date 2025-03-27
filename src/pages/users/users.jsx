import styled from 'styled-components';
import { Container, Content, H2 } from '../../components';
import { TableRow, UserRow } from './components';
import { useServerRequest } from '../../hooks';
import { useEffect, useState } from 'react';
import { ROLE } from '../../constants';

export const UsersContainer = ({ className }) => {
	const serverRequest = useServerRequest();
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	useEffect(() => {
		Promise.all([
			serverRequest('fetchUsers'),
			serverRequest('fetchRoles'),
		]).then(([usersRes, rolesRes]) => {
			if (usersRes.error || rolesRes.error) {
				setErrorMessage(usersRes.error || rolesRes.error);
				return;
			}
			console.log('usersRes', usersRes);
			console.log('rolesRes', rolesRes);

			setUsers(usersRes.res);
			setRoles(rolesRes.res);
		});
	}, [serverRequest, shouldUpdateUserList]);

	const onUserDelete = (userId) => {
		serverRequest('deleteUser', userId).then(() =>
			setShouldUpdateUserList(!shouldUpdateUserList),
		);
	};
	return (
		<div className={className}>
			<Container>
				<Content errorMessage={errorMessage}>
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
			</Container>
		</div>
	);
};

export const Users = styled(UsersContainer)``;
