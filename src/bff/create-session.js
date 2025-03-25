import { ROLE } from '../constants';
import { removeComment } from './session';

export const createSession = (roleId) => {
	const session = {
		logOut() {
			Object.keys;
			session.forEach((key) => {
				delete session[key];
			});
		},
	};

	switch (roleId) {
		case ROLE.ADMIN:
			session.removeComment = removeComment;

			break;

		case ROLE.MODERATOR:
			session.removeComment = removeComment;

			break;

		case ROLE.READER:
			break;

		default:
			break;
	}
	return {};
};
const session = {
	error: null,
	res: {
		logOut() {
			Object.keys;
			session.forEach((key) => {
				delete session[key];
			});
		},
		removeComment() {
			console.log('removeComment');
		},
	},
};
