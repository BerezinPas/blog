export const transformUser = (dbuser) => ({
	id: dbuser.id,
	login: dbuser.login,
	password: dbuser.password,
	registredAt: dbuser.registred_at,
	roleId: dbuser.role_id,
});
