import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostCardContainer = ({
	className,
	id,
	imageURL,
	title,
	publishedAt,
	commentsCount,
}) => {
	return (
		<Link to={`/post/${id}`} className={className}>
			<img src={imageURL} alt={title} />
			<div className="title">{title}</div>
			<div className="card-bottom">
				<div className="data">{publishedAt}</div>
				<div className="count">
					<Icon id="fa-comment-o" margin="0 7px 0 0 " />
					{commentsCount}
				</div>
			</div>
		</Link>
	);
};

export const PostCard = styled(PostCardContainer)`
	flex: 0 1 calc(33.3% - 50px / 3);
	display: flex;
	flex-direction: column;
	background-color: #fff;

	& img {
		margin-bottom: 15px;
	}
	& .title {
		margin-bottom: 20px;
		font-size: 20px;
		padding: 0 15px;
	}
	& .card-bottom {
		border-top: 2px solid rgba(239, 239, 239, 1);
		padding: 10px 15px;
		display: flex;
		justify-content: space-between;
		color: rgba(122, 122, 122, 1);
	}
`;

PostCard.propTypes = {
	id: PropTypes.number,
	imageURL: PropTypes.string,
	title: PropTypes.string,
	publishedAt: PropTypes.string,
	commentsCount: PropTypes.number,
};
