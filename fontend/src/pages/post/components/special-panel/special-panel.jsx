import styled from 'styled-components';
import { Icon } from '../../../../components';
import { ROLE } from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostId } from '../../../../selectors';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions';
import { useNavigate } from 'react-router-dom';
import { checkAccess } from '../../../../utils/check-access';
import PropTypes from 'prop-types';

export const SpecialPanelContainer = ({
	className,
	publishedAt,
	roleId,
	editButton,
}) => {
	const postId = useSelector(selectPostId);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить Статью?',
				onConfirm: () => {
					dispatch(removePostAsync(id)).then(() => navigate('/'));
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
				{isAdmin && (
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

SpecialPanel.propTypes = {
	publishedAt: PropTypes.string,
	roleId: PropTypes.string,
	editButton: PropTypes.node,
};
