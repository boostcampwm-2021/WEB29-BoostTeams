import React, { useRef } from 'react';
import Modal from '@components/common/Modal';
import { PostitType } from '@pages/BoardPage';
import { Container, Input, Textarea } from './style';

interface Props {
	socketApi: any;
	modalType: string;
	clickedPostit: PostitType;
	handleModalClose: () => void;
}

const CreatePostItModal: React.FC<Props> = ({ socketApi, modalType, clickedPostit, handleModalClose }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const makePostitObj = (modalType: string, title: string, content: string) => {
		if (modalType === 'update') {
			const updatedPostit = clickedPostit;
			updatedPostit.title = title;
			updatedPostit.content = content;
			return updatedPostit;
		}
		if (modalType === 'create') {
			return {
				title,
				content,
			};
		}
		return undefined;
	};

	const handleSubmit = () => {
		if (inputRef.current && textareaRef.current) {
			const title = inputRef.current.value;
			const content = textareaRef.current.value;
			const postit = makePostitObj(modalType, title, content);
			if (modalType === 'create') socketApi.createNewPostit(postit);
			else if (modalType === 'update') socketApi.updatePostit(postit);
			handleModalClose();
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
					defaultValue={modalType === 'update' ? clickedPostit.content : ''}
					placeholder='내용을 입력하세요'
				/>
			</Container>
		</Modal>
	);
};

export default CreatePostItModal;
