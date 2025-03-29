import { ACTION_TYPE } from '../actions';

const postInitialState = {
	id: null,
	title: '',
	imageURL: '',
	content: '',
	publishedAt: '',
	comments: [],
};

export const postReducer = (state = postInitialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_POST_DATA:
			return {
				...state,
				...payload,
			};

		case ACTION_TYPE.ADD_COMMENT:
			return {
				...state,
				comments: [...state.comments, payload],
			};

		default:
			return state;
	}
};
