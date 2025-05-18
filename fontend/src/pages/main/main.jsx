import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Pagination, PostCard, Search } from './components';
import { Container } from '../../components';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce } from './utils';
import { request } from '../../utils';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchValue, setSearchValue] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	useEffect(() => {
		request(
			`/api/posts?search=${searchValue}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ res, error }) => {
			setPosts(res.posts);

			setLastPage(res.lastPage);
		});
	}, [page, shouldSearch]);

	console.log(lastPage);

	const onSearch = ({ target }) => {
		setSearchValue(target.value);
		startDelayedSearch(!shouldSearch);
	};
	return (
		<Container>
			<div className={className}>
				<Search value={searchValue} onChange={onSearch} />
				<div className="posts">
					{posts.length ? (
						<>
							{posts.map(({ id, title, imageURL, publishedAt, comments }) => (
								<PostCard
									key={id}
									id={id}
									imageURL={imageURL}
									title={title}
									publishedAt={publishedAt}
									commentsCount={comments.length}
								/>
							))}
						</>
					) : (
						<div>Ничего не найдено</div>
					)}
				</div>
				{lastPage > 1 && posts.length !== 0 && (
					<Pagination setPage={setPage} lastPage={lastPage} page={page} />
				)}
			</div>
		</Container>
	);
};

export const Main = styled(MainContainer)`
	height: 100%;
	display: flex;
	flex-direction: column;
	& .posts {
		display: flex;
		flex-wrap: wrap;
		gap: 25px;
		margin-top: 30px;
		margin-bottom: auto;
	}
`;
