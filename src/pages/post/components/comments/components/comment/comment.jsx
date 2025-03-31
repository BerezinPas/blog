import styled from 'styled-components';
import { Icon } from '../../../../../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId, selectUserRole } from '../../../../../../selectors';
import { ROLE } from '../../../../../../constants';
import { useServerRequest } from '../../../../../../hooks';
import {
	CLOSE_MODAL,
	openModal,
	removeCommentAsync,
} from '../../../../../../actions';
import { checkAccess } from '../../../../../../utils/check-access';
import PropTypes from 'prop-types';

const CommentContainer = ({ className, id, author, content, publishedAt }) => {
	const roleId = useSelector(selectUserRole);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="comment-wrapper">
				<div className="comment-header">
					<div className="author">
						<Icon id="fa-user-circle-o" margin="0 8px 0 0px" size="20px" />
						{author}
					</div>
					<div className="published-at">
						<Icon id="fa-calendar-o" margin="0 8px 0 0px" size="20px" />
						{publishedAt}
					</div>
				</div>
				<div className="text">{content}</div>
			</div>
			<div className="delete-btn-wrapper">
				{checkAccess([ROLE.ADMIN, ROLE.MODERATOR], roleId) && (
					<Icon
						id="fa-trash-o"
						margin="8px 0px 0 7px "
						size="20px"
						onClick={() => onCommentRemove(id)}
					/>
				)}
			</div>
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	& .comment-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;
	}

	& .comment-wrapper {
		padding: 8px;
		border-bottom: 2px solid #fff;
		width: 100%;
	}
	& .delete-btn-wrapper {
		width: 23px;
	}
`;

Comment.propTypes = {
	id: PropTypes.number,
	author: PropTypes.string,
	content: PropTypes.string,
	publishedAt: PropTypes.string,
};
