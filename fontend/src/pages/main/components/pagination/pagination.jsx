import styled from 'styled-components';
import { Button } from '../../../../components';
import PropTypes from 'prop-types';

const PaginationConatainer = ({ className, setPage, lastPage, page }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button
				disabled={page === 1}
				isInversed={true}
				onClick={() => setPage(page - 1)}
			>
				Предыдущая
			</Button>
			<div className="current-page">{page}</div>
			<Button
				disabled={page === lastPage}
				isInversed={true}
				onClick={() => setPage(page + 1)}
			>
				Следующая
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationConatainer)`
	display: flex;
	align-items: center;
	gap: 10px;
	justify-content: center;
	margin-top: 20px;
`;

Pagination.propTypes = {
	setPage: PropTypes.func,
	lastPage: PropTypes.number,
	page: PropTypes.number,
};
