import styled from 'styled-components';
import { H2, Icon, Input } from '../../../../components';
import { useServerRequest } from '../../../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors';
import { ROLE } from '../../../../constants';
import { SpecialPanel } from '../special-panel/special-panel';
import { useRef } from 'react';
import { sanitazeContent } from './utils';
import { savePostAsync } from '../../../../actions';
import { useNavigate } from 'react-router-dom';

const PostFormContainer = ({
	className,
	post: { id, title, imageURL, content, publishedAt, comments },
}) => {
	const requestServer = useServerRequest();
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
			savePostAsync(requestServer, {
				id,
				imageURL: newImage,
				title: newTitle,
				content: newContent,
			}),
		).then(() => {
			navigate(`/post/${id}`);
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
						margin="0 10px 0 0 "
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
	}
`;
