import React from 'react';
import { useRecoilValue } from 'recoil';

import { UserIdType } from '@src/types/team';
import { chatModeState, currChatRoomIdState } from '@stores/chat';

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
	const currChatRoomId = useRecoilValue(currChatRoomIdState);
	const chatMode = useRecoilValue(chatModeState);

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
				currChatRoomId !== -1 && (
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
