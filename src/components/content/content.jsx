import { useSelector } from 'react-redux';
import { checkAccess } from '../../utils/check-access';
import { Error } from '../error/error';
import { selectUserRole } from '../../selectors';

export const Content = ({ errorMessage, children, access }) => {
	const userRole = useSelector(selectUserRole);
	let acccessError;
	if (access) {
		acccessError = checkAccess(access, userRole) ? null : 'Доступ запрещен';
	}

	const error = errorMessage || acccessError;
	return error ? <Error errorMessage={error} /> : <> {children}</>;
};
