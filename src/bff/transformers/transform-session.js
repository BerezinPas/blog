import { transformUser } from './transform-user';

export const transformSession = (dbSession) => ({
	id: dbSession.id,
	hash: dbSession.hash,
	user: transformUser(dbSession.user),
});
