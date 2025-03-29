import styled from 'styled-components';
import { H2, Icon } from '../../../../components';
import { useServerRequest } from '../../../../hooks';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors';
import { ROLE } from '../../../../constants';

const PostContentContainer = ({
	className,
	post: { id, title, imageURL, content, publishedAt, comments },
}) => {
	const requestServer = useServerRequest();
	const roleId = useSelector(selectUserRole);

	return (
		<div className={className}>
			<H2>{title}</H2>
			<img src={imageURL} alt={title} />
			<div></div>
			<div className="special-panel">
				<div className="published-at">
					<Icon id=" fa-calendar-o" margin="0 7px 0 0 " size="20px" />

					{publishedAt}
				</div>
				<div className="btns">
					{roleId === ROLE.ADMIN && (
						<>
							<Icon id=" fa-trash-o" margin="0 10px 0 0 " size="28px" />
							<Icon id=" fa-pencil-square-o" size="28px" />
						</>
					)}
				</div>
			</div>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	margin-top: 50px;
	& img {
		float: left;
		margin: 0 10px 10px 0;
		max-width: 30%;
	}
	& h2 {
		display: inline-block;
		text-align: left;
		margin: 0 0 20px;
		max-width: 65%;
	}
	& .special-panel {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}
	& .post-text {
	}
`;
