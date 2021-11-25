import React, { useContext } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { addChatRoomUsers, socketApi } from '@apis/chat';
import { chatRoomUsersTrigger, currentChatRoomState } from '@stores/chat';
import { ColorCode } from '@utils/constants';
import { SocketContext } from '@utils/socketContext';
import { UserIdType } from '@src/types/team';
import { DropdownModeType } from '@src/types/chat';

import { Button } from '@components/common';
import SearchInput from '../SearchInput';
import { InviteDropdownContainer, ButttonContainer, SearchInputWrapper } from './style';

interface Props {
	teamId: number;
	inviteUsers: UserIdType[];
	addInviteUser: (newUser: UserIdType) => void;
	deleteInviteUser: (id: number) => void;
	initInviteUser: () => void;
	handleDropdownMode: (node: DropdownModeType) => void;
}
const InviteDropdown: React.FC<Props> = ({
	teamId,
	inviteUsers,
	addInviteUser,
	deleteInviteUser,
	initInviteUser,
	handleDropdownMode,
}) => {
	const socketRef = useContext(SocketContext);
	const currChatRoomId = useRecoilValue(currentChatRoomState);
	const setChatRoomUsersTrigger = useSetRecoilState(chatRoomUsersTrigger);

	const handleInviteUsers = () => {
		const userList = inviteUsers.map((user) => {
			return { user_id: user.userId };
		});
		const inviteResult = addChatRoomUsers(currChatRoomId, userList);
		if (!inviteResult) return;
		socketApi.inviteUsers(socketRef.current, currChatRoomId, inviteUsers, teamId);
		initInviteUser();
		setChatRoomUsersTrigger((trigger) => trigger + 1);
		handleDropdownMode('none');
	};

	return (
		<InviteDropdownContainer>
			<h3>유저 초대하기</h3>
			<SearchInputWrapper>
				<SearchInput
					teamId={teamId}
					inviteUsers={inviteUsers}
					addInviteUser={addInviteUser}
					deleteInviteUser={deleteInviteUser}
				/>
			</SearchInputWrapper>
			<ButttonContainer>
				<Button
					text='초대'
					backgroundColor={ColorCode.PRIMARY1}
					fontColor={ColorCode.WHITE}
					handler={handleInviteUsers}
				/>
				<Button
					text='닫기'
					backgroundColor={ColorCode.WHITE}
					fontColor={ColorCode.BLACK}
					handler={() => handleDropdownMode('none')}
				/>
			</ButttonContainer>
		</InviteDropdownContainer>
	);
};

export default InviteDropdown;
