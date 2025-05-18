import { ACTION_TYPE } from '../actions';

const appInitialState = {
	wasLogout: true,
	modal: {
		isOpen: false,
		text: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
};

export const appReducer = (state = appInitialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: true,
			};

		case ACTION_TYPE.SET_USER:
			return {
				...state,
				wasLogout: false,
			};

		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...payload,
					isOpen: true,
				},
			};

		case ACTION_TYPE.CLOSE_MODAL:
			return { ...state, modal: { ...appInitialState.modal } };

		default:
			return state;
	}
};
