import React from 'react';
import { useRecoilValue } from 'recoil';

import { ChatRoomsType } from '@src/types/chat';
import { UserIdType } from '@src/types/team';
import { currentChatRoomState, chatRoomsSelector, chatModeState } from '@stores/chat';

import SearchHeader from './Header/SearchHeader';
import RoomHeader from './Header/RoomHeader';
import { Container } from './style';

interface Props {
	teamId: number;
	inviteUsers: UserIdType[];
	addInviteUser: (newUser: UserIdType) => void;
	deleteInviteUser: (id: number) => void;
	initInviteUser: () => void;
}

const ChatHeader: React.FC<Props> = ({ teamId, inviteUsers, addInviteUser, deleteInviteUser, initInviteUser }) => {
	const chatRooms = useRecoilValue<ChatRoomsType>(chatRoomsSelector(teamId));
	const currChatRoomId = useRecoilValue(currentChatRoomState);
	const chatMode = useRecoilValue(chatModeState);

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
				checkRoomAndTeam() && (
					<RoomHeader
						teamId={teamId}
						inviteUsers={inviteUsers}
						addInviteUser={addInviteUser}
						deleteInviteUser={deleteInviteUser}
						initInviteUser={initInviteUser}
					/>
				)
			)}
		</Container>
	);
};

export default ChatHeader;
