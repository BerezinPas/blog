import styled from 'styled-components';
import { Container, Content, H2 } from '../../components';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Comments, PostContent, PostForm } from './components';
import { useMatch, useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { loadPostAsync } from '../../actions/load-post-async';
import { selectPost, selectUserRole } from '../../selectors';
import { RESET_POST_DATA } from '../../actions';
import { postInitialState } from '../../reducers/post-reducer';
import { ROLE } from '../../constants';
import { checkAccess } from '../../utils/check-access';

const PostContainer = ({ className }) => {
	const [errorMessage, setErrorMessager] = useState(null);
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);
	const isEditing = useMatch('/post/:id/edit');
	const isCreating = useMatch('/post');
	const [isLoading, setIsloading] = useState(true);
	const roleId = useSelector(selectUserRole);

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsloading(false);
			return;
		}
		dispatch(loadPostAsync(requestServer, params.id)).then((postData) => {
			setErrorMessager(postData.error);
			setIsloading(false);
		});
	}, [dispatch, params.id, requestServer, isCreating, roleId]);

	const LoadedPostContent =
		isCreating || isEditing ? (
			<Content errorMessage={errorMessage} access={[ROLE.ADMIN]}>
				<PostForm post={isCreating ? postInitialState : post} />
			</Content>
		) : (
			<Content errorMessage={errorMessage}>
				<PostContent post={post} />
				<Comments comments={post.comments} />
			</Content>
		);

	let content = isLoading ? <H2>...loading</H2> : LoadedPostContent;

	return (
		<Container>
			<div className={className}>{content}</div>
		</Container>
	);
};

export const Post = styled(PostContainer)``;
