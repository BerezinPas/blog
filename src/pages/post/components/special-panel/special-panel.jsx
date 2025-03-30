import styled from 'styled-components';
import { Icon } from '../../../../components';
import { ROLE } from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostId } from '../../../../selectors';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks/use-server-request';
import { useNavigate } from 'react-router-dom';

export const SpecialPanelContainer = ({
	className,
	publishedAt,
	roleId,
	editButton,
}) => {
	const postId = useSelector(selectPostId);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить Статью?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, id)).then(() =>
						navigate('/'),
					);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && (
					<>
						<Icon id=" fa-calendar-o" margin="0 7px 0 0 " size="20px" />
						{publishedAt}
					</>
				)}
			</div>
			<div className="btns">
				{roleId === ROLE.ADMIN && (
					<>
						{editButton}
						{publishedAt && (
							<Icon
								id=" fa-trash-o"
								margin="0 0px 0 10px "
								size="28px"
								onClick={() => {
									onPostRemove(postId);
								}}
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: ${({ margin = '0 0 20px 0' }) => margin};
`;
