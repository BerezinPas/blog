import styled from 'styled-components';
import { Button } from '../button/button';
import { useSelector } from 'react-redux';
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
} from '../../selectors';

const ModalContainer = ({ className }) => {
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);
	const isOpen = useSelector(selectModalIsOpen);
	// const isOpen = true;

	if (!isOpen) {
		return null;
	}
	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="modal-wrapper">
				<h3 className="modal-title">{text}</h3>
				<div className="buttons">
					<Button onClick={onConfirm}>Да</Button>
					<Button onClick={onCancel} isInversed>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	z-index: 100;
	& .overlay {
		width: 100%;
		height: 100%;
		background-color: #00000099;
	}
	& .modal-wrapper {
		position: absolute;
		z-index: 10;
		padding: 20px 30px;
		width: 250px;
		/* height: 200px; */
		top: 50%;
		left: 50%;
		background-color: #fff;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 20px;
	}

	& .modal-title {
		margin-bottom: 20px;
	}
	& .buttons {
		/* align-self: flex-start; */
		display: flex;
		/* width: 100%; */
		gap: 20px;
	}
`;
