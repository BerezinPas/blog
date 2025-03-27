import styled from 'styled-components';
import { TableRow } from '../table-row/table-row';
import { Icon } from '../../../../components';
import { useState } from 'react';
import { useServerRequest } from '../../../../hooks';

const UserRowContainer = ({
	className,
	id,
	registredAt,
	roleId: userRoleId,
	login,
	roles,
	onUserDelete,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};
	const serverRequest = useServerRequest();

	const onRoleSave = (userId, newUserRoleId) => {
		serverRequest('updateUserRole', userId, newUserRoleId).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	return (
		<TableRow className={className}>
			<div>{login}</div>
			<div>{registredAt}</div>
			<div>
				<select value={selectedRoleId} onChange={onRoleChange}>
					{roles.map(({ id: roleId, role: roleName }) => (
						<option key={roleId} value={roleId}>
							{roleName}
						</option>
					))}
				</select>
				<div className="save-icon-wrapper">
					{initialRoleId !== selectedRoleId && (
						<Icon
							id="fa-floppy-o"
							size="26px"
							margin="0 0 0 0px"
							onClick={() => onRoleSave(id, selectedRoleId)}
						/>
					)}
				</div>
				<Icon
					id="fa-trash-o"
					size="26px"
					margin="0 0 0 20px"
					onClick={onUserDelete}
				/>
			</div>
		</TableRow>
	);
};

export const UserRow = styled(UserRowContainer)`
	& + & {
		border-top: 2px solid #fff;
	}
	& select {
		width: 100%;
	}
	.save-icon-wrapper {
		width: 23px;
		flex-shrink: 0;
		margin: 0 0 0 15px;
	}
`;
