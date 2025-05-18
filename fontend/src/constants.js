import PropTypes from 'prop-types';

export const URL = 'http://localhost:3003';

export const ROLE = {
	ADMIN: 0,
	MODERATOR: 1,
	READER: 2,
	GUEST: 3,
};

export const PAGINATION_LIMIT = 9;

export const PROP_TYPE = {
	ROLE: PropTypes.oneOf(Object.values(ROLE)),
	POST: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		imageURL: PropTypes.string,
		content: PropTypes.string,
		publishedAt: PropTypes.string,
	}),
	COMMENT: PropTypes.shape({
		id: PropTypes.number,
		author: PropTypes.string,
		content: PropTypes.string,
		publishedAt: PropTypes.string,
	}),
};
