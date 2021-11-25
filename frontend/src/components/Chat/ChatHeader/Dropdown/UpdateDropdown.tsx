import React, { useRef, useContext } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { chatRoomsSelector, chatRoomsTrigger, currentChatRoomState } from '@stores/chat';
import { SocketContext } from '@utils/socketContext';
import { socketApi, updateChatRoomName } from '@apis/chat';
import { ColorCode } from '@utils/constants';
import { DropdownModeType } from '@src/types/chat';

import { Button } from '@components/common';
import { ButttonContainer, UpdateDropdownContainer } from './style';

interface Props {
	teamId: number;
	handleDropdownMode: (mode: DropdownModeType) => void;
}

const UpdateDropdown: React.FC<Props> = ({ teamId, handleDropdownMode }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const socketRef = useContext(SocketContext);
	const currChatRoomId = useRecoilValue(currentChatRoomState);
	const chatRooms = useRecoilValue(chatRoomsSelector(teamId));
	const setChatRoomsTrigger = useSetRecoilState(chatRoomsTrigger);

	const handleChatRoomNameUpdate = () => {
		if (!inputRef.current) return;
		if (inputRef.current.value === '') return;
		const updatedResult = updateChatRoomName(currChatRoomId, inputRef.current.value);
		if (!updatedResult) return;
		socketApi.updateChatRoomName(socketRef.current, currChatRoomId);
		setChatRoomsTrigger((trigger) => trigger + 1);
		handleDropdownMode('none');
	};
	return (
		<UpdateDropdownContainer>
			<h3>채팅방 이름 변경</h3>
			<input type='text' defaultValue={chatRooms[currChatRoomId].chatRoomName} ref={inputRef} />
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
