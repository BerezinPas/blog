import { useSelector } from 'react-redux';
import { selectSession } from '../selectors';
import { server } from '../bff';
import { useCallback } from 'react';

export const useServerRequest = () => {
	const session = useSelector(selectSession);

	return useCallback(
		(operation, ...params) => {
			const request = [
				'register',
				'authorize',
				'fetchPost',
				'fetchPosts',
			].includes(operation)
				? params
				: [session, ...params];

			return server[operation](...request);
		},
		[session],
	);
};
