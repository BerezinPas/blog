import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks';
import { PostCard } from './components';
import { Container } from '../../components';

const MainContainer = ({ className }) => {
	const serverRequest = useServerRequest();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		serverRequest('fetchPosts').then((loadedPosts) => {
			if (posts.error) {
				return;
			}
			setPosts(loadedPosts.res);
		});
	}, []);
	return (
		<Container>
			<div className={className}>
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
		</Container>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-wrap: wrap;
	gap: 25px;
`;
