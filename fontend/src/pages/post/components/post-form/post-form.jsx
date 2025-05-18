import styled from 'styled-components';
import { Icon, Input } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors';
import { SpecialPanel } from '../special-panel/special-panel';
import { useRef } from 'react';
import { sanitazeContent } from './utils';
import { savePostAsync } from '../../../../actions';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PROP_TYPE } from '../../../../constants';

const PostFormContainer = ({
	className,
	post: { id, title, imageURL, content, publishedAt, comments },
}) => {
	const roleId = useSelector(selectUserRole);
	const imageRef = useRef(null);
	const titleRef = useRef(null);
	const contentRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSave = () => {
		const newImage = sanitazeContent(imageRef.current.value);
		const newTitle = sanitazeContent(titleRef.current.value);
		const newContent = sanitazeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(id, {
				imageURL: newImage,
				title: newTitle,
				content: newContent,
			}),
		).then(({ payload }) => {
			navigate(`/post/${payload.id}`);
		});

		// console.log(newImage, newTitle, newContent);
	};

	return (
		<div className={className}>
			<Input ref={titleRef} defaultValue={title} placeholder="title..." />
			<Input ref={imageRef} defaultValue={imageURL} placeholder="image..." />
			<SpecialPanel
				publishedAt={publishedAt}
				roleId={roleId}
				editButton={
					<Icon
						id=" fa-floppy-o"
						margin="0 0px 0 0 "
						size="28px"
						onClick={onSave}
					/>
				}
			/>

			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="post-text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	margin-top: 50px;
	display: flex;
	gap: 20px;
	flex-direction: column;
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
		min-height: 100px;
		background-color: #fff;
		border-radius: 10px;
		padding: 10px;
		box-shadow: 1px 1px 3px #000;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST,
};
