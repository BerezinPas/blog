import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks';
import { Pagination, PostCard, Search } from './components';
import { Container } from '../../components';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce, getLastPageFromLinks } from './utils';

const MainContainer = ({ className }) => {
	const serverRequest = useServerRequest();
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchValue, setSearchValue] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	useEffect(() => {
		serverRequest('fetchPosts', searchValue, page, PAGINATION_LIMIT).then(
			(loadedPosts) => {
				console.log(loadedPosts);

				setPosts(loadedPosts.res.posts);

				setLastPage(getLastPageFromLinks(loadedPosts.res.links));
			},
		);
	}, [serverRequest, page, shouldSearch]);

	console.log(lastPage);

	const onSearch = ({ target }) => {
		setSearchValue(target.value);
		startDelayedSearch(!shouldSearch);
	};
	return (
		<Container height="100%">
			<div className={className}>
				<Search value={searchValue} onChange={onSearch} />
				<div className="posts">
					{posts.length ? (
						<>
							{posts.map(
								({ id, title, imageURL, publishedAt, commentsCount }) => (
									<PostCard
										key={id}
										id={id}
										imageURL={imageURL}
										title={title}
										publishedAt={publishedAt}
										commentsCount={commentsCount}
									/>
								),
							)}
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
