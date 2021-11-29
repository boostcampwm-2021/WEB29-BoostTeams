import React, { useRef, useState, useEffect } from 'react';
import userState from '@stores/user';
import { useRecoilValue } from 'recoil';
import Modal from '@components/common/Modal';
import ColorPicker from '@components/common/ColorPicker';
import { IPostit, ISocketApi } from '@src/types/board';
import { Container, Input, Textarea, TitleContainer } from './style';

export interface Props {
	socketApi: ISocketApi;
	modalType: string;
	clickedPostit: IPostit | undefined;
	handleModalClose: () => void;
}

const CreatePostitModal: React.FC<Props> = ({ socketApi, modalType, clickedPostit, handleModalClose }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const user = useRecoilValue(userState);
	const [color, setColor] = useState<number>(0);

	const makePostitObj = (modalType: string, title: string, content: string) => {
		if (modalType === 'update' && clickedPostit) {
			const updatedPostit = clickedPostit;
			updatedPostit.id = Number(updatedPostit.id);
			updatedPostit.title = title;
			updatedPostit.color = color;
			updatedPostit.content = content;
			updatedPostit.updatedBy = user.id;
			updatedPostit.whoIsUpdating = -1;
			return updatedPostit;
		}
		// if (modalType === 'create')
		return {
			title,
			color,
			content,
			createdBy: user.id,
			updatedBy: user.id,
		};
	};

	const handleSubmit = () => {
		if (inputRef.current && textareaRef.current) {
			const title = inputRef.current.value;
			const content = textareaRef.current.value;
			const postit = makePostitObj(modalType, title, content);
			// 포스트잇 객체, 요청 유저 정보, 팀 아이디
			if (modalType === 'create') socketApi.createNewPostit(postit);
			else if (modalType === 'update') socketApi.updateEndPostit(postit);
			handleModalClose();
		}
	};

	const handleClose = () => {
		if (modalType === 'update' && clickedPostit) socketApi.updateEndPostit({ id: clickedPostit.id });
		handleModalClose();
	};

	useEffect(() => {
		if (modalType === 'update' && clickedPostit) {
			setColor(clickedPostit.color);
		}
	}, []);

	return (
		<Modal
			handleModalClose={handleClose}
			handleSubmit={handleSubmit}
			removeSubmitButton={false}
			submitBtnName={modalType === 'create' ? '생성' : '수정'}
		>
			<Container>
				<TitleContainer>
					<ColorPicker selectedColor={color} setSelectedColor={setColor} />
					<Input
						ref={inputRef}
						defaultValue={modalType === 'update' && clickedPostit ? clickedPostit.title : ''}
						placeholder='제목을 입력하세요'
					/>
				</TitleContainer>
				<Textarea
					ref={textareaRef}
					defaultValue={modalType === 'update' && clickedPostit ? clickedPostit.content : ''}
					placeholder='내용을 입력하세요'
				/>
			</Container>
		</Modal>
	);
};

export default CreatePostitModal;
