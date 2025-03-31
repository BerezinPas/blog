import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../../../hooks';
import { sendCommentAsync } from '../../../../actions';
import { useParams } from 'react-router-dom';
import { selectUserId, selectWasLogout } from '../../../../selectors';

const CommentsContainer = ({ className, comments }) => {
	const [newComment, setNewCommet] = useState('');
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const userId = useSelector(selectUserId);
	const params = useParams();
	const isAuthorized = !useSelector(selectWasLogout);
	const onSubmit = (e) => {
		// console.log('e.target.value', newComment);
		e.preventDefault();
		dispatch(
			sendCommentAsync(
				requestServer,
				userId,
				params.id,
				newComment,
				new Date().toISOString().substring(0, 16).replace('T', ' '),
			),
		).then(() => {
			setNewCommet('');
		});
	};

	console.log('comments', comments);

	return (
		<div className={className}>
			{isAuthorized && (
				<form className="new-comment" onSubmit={onSubmit}>
					<textarea
						name="newComment"
						placeholder="Комментрарий"
						value={newComment}
						onChange={({ target }) => setNewCommet(target.value)}
					></textarea>
					<button type="submit">
						<Icon id="fa-paper-plane-o" margin="0 0 0 7px" />
					</button>
				</form>
			)}

			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	font-size: 18px;

	max-width: 800px;
	margin: 0 auto;
	& .comments {
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 100%;
	}

	& .new-comment {
		width: 100%;
		margin-top: 50px;
		display: flex;
		align-items: start;
	}
	& textarea {
		width: 100%;
		resize: none;
		height: 100px;
		padding: 8px 12px;
		border: 1px solid black;
		border-radius: 10px;
	}
`;
