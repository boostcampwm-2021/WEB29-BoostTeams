import React, { useContext } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { addChatRoomUsers, socketApi } from '@apis/chat';
import { chatRoomUsersTrigger, currentChatRoomState } from '@stores/chat';
import { UserIdType } from '@src/types/team';
import { ColorCode } from '@utils/constants';
import { SocketContext } from '@utils/socketContext';

import { Button } from '@components/common';
import SearchInput from '../SearchInput';
import { InviteDropDownContainer, ButttonContainer, SearchInputWrapper } from './style';

interface Props {
	teamId: number;
	inviteUsers: UserIdType[];
	addInviteUser: (newUser: UserIdType) => void;
	deleteInviteUser: (id: number) => void;
	initInviteUser: () => void;
	handleInviteDropDownClose: () => void;
}
const InviteDropDown: React.FC<Props> = ({
	teamId,
	inviteUsers,
	addInviteUser,
	deleteInviteUser,
	initInviteUser,
	handleInviteDropDownClose,
}) => {
	const socketRef = useContext(SocketContext);
	const { currChatRoomId } = useRecoilValue(currentChatRoomState);
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
		handleInviteDropDownClose();
	};

	return (
		<InviteDropDownContainer>
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
					handler={handleInviteDropDownClose}
				/>
			</ButttonContainer>
		</InviteDropDownContainer>
	);
};

export default InviteDropDown;
