import styled from 'styled-components';
import { Container } from '../../components';
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Comments, PostContent, PostForm } from './components';
import { useMatch, useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { loadPostAsync } from '../../actions/load-post-async';
import { selectPost } from '../../selectors';
import { RESET_POST_DATA } from '../../actions';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);
	const isEditing = useMatch('/post/:id/edit');
	// console.log(post, 'post.jsx');

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch]);

	useEffect(() => {
		dispatch(loadPostAsync(requestServer, params.id));
	}, [dispatch, params.id, requestServer]);

	return (
		<div className={className}>
			<Container>
				{isEditing ? (
					<PostForm post={post} />
				) : (
					<>
						<PostContent post={post} />
						<Comments comments={post.comments} />
					</>
				)}
			</Container>
		</div>
	);
};

export const Post = styled(PostContainer)``;
