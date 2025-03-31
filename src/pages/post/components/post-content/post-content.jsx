import styled from 'styled-components';
import { H2, Icon } from '../../../../components';
import { useServerRequest } from '../../../../hooks';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors';
import { ROLE } from '../../../../constants';
import { SpecialPanel } from '../special-panel/special-panel';
import { useNavigate } from 'react-router-dom';

const PostContentContainer = ({
	className,
	post: { id, title, imageURL, content, publishedAt, comments },
}) => {
	const requestServer = useServerRequest();
	const roleId = useSelector(selectUserRole);
	const navigate = useNavigate();

	return (
		<div className={className}>
			<H2>{title}</H2>
			<img src={imageURL} alt={title} />
			<div></div>

			<SpecialPanel
				publishedAt={publishedAt}
				roleId={roleId}
				editButton={
					<Icon
						id=" fa-pencil-square-o"
						margin="0 0px 0 0 "
						size="28px"
						onClick={() => navigate(`/post/${id}/edit`)}
					/>
				}
			/>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	margin-top: 50px;
	min-height: 150px;
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

	& .post-text {
		white-space: pre-line;
		margin-bottom: 40px;
	}
`;
