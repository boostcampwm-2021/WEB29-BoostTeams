import React, { useRef, useContext } from 'react';
import { useRecoilValue } from 'recoil';

import { chatRoomsState, currChatRoomIdState } from '@stores/chat';
import { SocketContext } from '@utils/socketContext';
import { socketApi } from '@apis/chat';
import { ColorCode } from '@utils/constants';
import { DropdownModeType } from '@src/types/chat';

import { Button } from '@components/common';
import { ButttonContainer, UpdateDropdownContainer } from './style';

interface Props {
	handleDropdownMode: (mode: DropdownModeType) => void;
}

const UpdateDropdown: React.FC<Props> = ({ handleDropdownMode }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const socketRef = useContext(SocketContext);
	const currChatRoomId = useRecoilValue(currChatRoomIdState);
	const chatRooms = useRecoilValue(chatRoomsState);

	const handleChatRoomNameUpdate = () => {
		if (!inputRef.current) return;
		if (inputRef.current.value === '') return;
		socketApi.updateChatRoomName(socketRef.current, currChatRoomId, inputRef.current.value);
		handleDropdownMode('none');
	};
	const getChatRoomName = (chatRoomId: number) =>
		chatRooms.find((chatRoom) => chatRoom.chatRoomId === chatRoomId)?.chatRoomName;

	return (
		<UpdateDropdownContainer>
			<h3>채팅방 이름 변경</h3>
			<input type='text' defaultValue={getChatRoomName(currChatRoomId)} ref={inputRef} />
			<ButttonContainer>
				<Button
					text='변경'
					backgroundColor={ColorCode.PRIMARY1}
					fontColor={ColorCode.WHITE}
					handler={handleChatRoomNameUpdate}
				/>
				<Button
					text='닫기'
					backgroundColor={ColorCode.WHITE}
					fontColor={ColorCode.BLACK}
					handler={() => handleDropdownMode('none')}
				/>
			</ButttonContainer>
		</UpdateDropdownContainer>
	);
};

export default UpdateDropdown;
