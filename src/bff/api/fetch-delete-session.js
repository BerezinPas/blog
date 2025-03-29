import { URL } from '../../constants';

export const fetchDeleteSession = async (sessionId) => {
	const fetchURL = `${URL}/sessions`;
	console.log(sessionId);

	return fetch(`${fetchURL}/${sessionId}`, {
		method: 'DELETE',
	});
};
