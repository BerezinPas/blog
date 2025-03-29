import styled from 'styled-components';
import { Icon } from '../../../../components';
import { ROLE } from '../../../../constants';

export const SpecialPanelContainer = ({
	className,
	publishedAt,
	roleId,
	editButton,
}) => {
	return (
		<div className={className}>
			<div className="published-at">
				<Icon id=" fa-calendar-o" margin="0 7px 0 0 " size="20px" />

				{publishedAt}
			</div>
			<div className="btns">
				{roleId === ROLE.ADMIN && (
					<>
						{editButton}
						<Icon id=" fa-trash-o" margin="0 0px 0 0 " size="28px" />
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
