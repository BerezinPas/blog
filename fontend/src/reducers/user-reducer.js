import { ACTION_TYPE } from '../actions';
import { ROLE } from '../constants';

const userInitialState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
};

export const userReducer = (state = userInitialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...payload,
			};

		case ACTION_TYPE.LOGOUT:
			return userInitialState;

		default:
			return state;
	}
};
