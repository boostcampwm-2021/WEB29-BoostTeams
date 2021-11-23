import React, { useRef, useContext } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { chatRoomsSelector, chatRoomsTrigger, currentChatRoomState } from '@stores/chat';
import { SocketContext } from '@utils/socketContext';
import { updateChatRoomName } from '@apis/chat';

import Modal from '@components/common/Modal';
import { Title, Input } from './style';

interface Props {
	teamId: number;
	handleModalClose: () => void;
}

const UpdateRoomNameModal: React.FC<Props> = ({ teamId, handleModalClose }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const socketRef = useContext(SocketContext);
	const currentChatRoomId = useRecoilValue(currentChatRoomState).currChatRoomId;
	const chatRooms = useRecoilValue(chatRoomsSelector(teamId));
	const setChatRoomsTrigger = useSetRecoilState(chatRoomsTrigger);

	const handleChatRoomNameUpdate = () => {
		if (!inputRef.current) return;
		if (inputRef.current.value === '') return;
		const updatedResult = updateChatRoomName(currentChatRoomId, inputRef.current.value);
		if (!updatedResult) return;
		socketRef.current.emit('update chat room name', { chatRoomId: currentChatRoomId });
		setChatRoomsTrigger((trigger) => trigger + 1);
		handleModalClose();
	};

	return (
		<Modal handleModalClose={handleModalClose} handleSubmit={handleChatRoomNameUpdate} removeSubmitButton={false}>
			<Title>채팅방 이름 변경</Title>
			<Input type='text' defaultValue={chatRooms[currentChatRoomId].chatRoomName} ref={inputRef} />
		</Modal>
	);
};

export default UpdateRoomNameModal;
