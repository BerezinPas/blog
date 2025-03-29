import { URL } from '../../constants';
import { transformSession } from '../transformers';

export const getSession = async (hash) => {
	return fetch(`${URL}/sessions?hash=${hash}`)
		.then((loadedSession) => loadedSession.json())
		.then(([session]) => session && transformSession(session));
};
