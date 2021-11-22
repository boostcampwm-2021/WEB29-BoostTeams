import React from 'react';
import { useRecoilValue } from 'recoil';

import { UserIdType, ChatRoomsType } from '@src/types/chat';
import { currentChatRoomState, chatRoomsSelector } from '@stores/chat';

import SearchHeader from './SearchHeader';
import Header from './Header';
import { Container } from './style';

interface Props {
	teamId: number;
	chatMode: string;
	inviteUsers: UserIdType[];
	addInviteUser: (newUser: UserIdType) => void;
	deleteInviteUser: (id: number) => void;
}

const ChatHeader: React.FC<Props> = ({ teamId, chatMode, inviteUsers, addInviteUser, deleteInviteUser }) => {
	const chatRooms = useRecoilValue<ChatRoomsType>(chatRoomsSelector(teamId));
	const { currChatRoomId } = useRecoilValue(currentChatRoomState);

	const checkRoomAndTeam = () => chatRooms[currChatRoomId] !== undefined;

	return (
		<Container>
			{chatMode === 'create' ? (
				<SearchHeader
					teamId={teamId}
					inviteUsers={inviteUsers}
					addInviteUser={addInviteUser}
					deleteInviteUser={deleteInviteUser}
				/>
			) : (
				checkRoomAndTeam() && <Header teamId={teamId} />
			)}
		</Container>
	);
};

export default ChatHeader;
