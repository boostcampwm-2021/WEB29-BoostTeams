import React, { useRef, useEffect, useContext } from 'react';
import Modal from '@components/common/Modal';
import { Container, Input, Textarea } from './style';

interface Props {
	socket: any;
	modalType: string;
	clickedPostit: any;
	handleModalClose: () => void;
}

const CreatePostItModal: React.FC<Props> = ({ socket, modalType, clickedPostit, handleModalClose }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleSubmit = () => {
		if (inputRef.current && textareaRef.current && socket.current) {
			const title = inputRef.current.value;
			const desc = textareaRef.current.value;
			const teamId = socket.current.nsp.slice(6, socket.current.nsp.length);
			socket.current.emit('create new postit', { title, desc, teamId });
		}
	};

	return (
		<Modal handleModalClose={handleModalClose} handleSubmit={handleSubmit} removeSubmitButton={false}>
			<Container>
				<Input
					ref={inputRef}
					defaultValue={modalType === 'update' ? clickedPostit.title : ''}
					placeholder='제목을 입력하세요'
				/>
				<Textarea
					ref={textareaRef}
					defaultValue={modalType === 'update' ? clickedPostit.desc : ''}
					placeholder='내용을 입력하세요'
				/>
			</Container>
		</Modal>
	);
};

export default CreatePostItModal;
