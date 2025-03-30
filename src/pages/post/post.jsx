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
import { postInitialState } from '../../reducers/post-reducer';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);
	const isEditing = useMatch('/post/:id/edit');
	const isCreating = useMatch('/post');

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			return;
		}
		dispatch(loadPostAsync(requestServer, params.id));
	}, [dispatch, params.id, requestServer, isCreating]);

	return (
		<div className={className}>
			<Container>
				{isCreating || isEditing ? (
					<PostForm post={isCreating ? postInitialState : post} />
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
