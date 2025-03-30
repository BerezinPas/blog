import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks';
import { Pagination, PostCard } from './components';
import { Container } from '../../components';
import { PAGINATION_LIMIT } from '../../constants';
import { getLastPageFromLinks } from './utils';

const MainContainer = ({ className }) => {
	const serverRequest = useServerRequest();
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	useEffect(() => {
		serverRequest('fetchPosts', page, PAGINATION_LIMIT).then((loadedPosts) => {
			setPosts(loadedPosts.res.posts);

			setLastPage(getLastPageFromLinks(loadedPosts.res.links));
		});
	}, [serverRequest, page]);
	return (
		<div className={className}>
			<Container>
				<div className="posts">
					{posts.map(({ id, title, imageURL, publishedAt, commentsCount }) => (
						<PostCard
							key={id}
							id={id}
							imageURL={imageURL}
							title={title}
							publishedAt={publishedAt}
							commentsCount={commentsCount}
						/>
					))}
				</div>
				{lastPage > 1 && (
					<Pagination setPage={setPage} lastPage={lastPage} page={page} />
				)}
			</Container>
		</div>
	);
};

export const Main = styled(MainContainer)`
	height: 100%;
	display: flex;
	& .posts {
		display: flex;
		flex-wrap: wrap;
		gap: 25px;
		margin-bottom: auto;
	}
`;
