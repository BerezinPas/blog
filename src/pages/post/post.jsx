import styled from 'styled-components';
import { Container } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Comments, PostContent } from './components';
import { useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { loadPostAsync } from '../../actions/load-post-async';
import { selectPost } from '../../selectors';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);

	console.log(post, 'post.jsx');

	useEffect(() => {
		dispatch(loadPostAsync(requestServer, params.id));
	}, [dispatch, params.id, requestServer]);
	return (
		<div className={className}>
			<Container>
				<PostContent post={post} />
				<Comments comments={post.comments} />
			</Container>
		</div>
	);
};

export const Post = styled(PostContainer)``;
