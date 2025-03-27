import { URL } from '../../constants';

const fetchURL = `${URL}/roles`;

export const getRoles = () =>
	fetch(fetchURL).then((loadedRoles) => loadedRoles.json());
