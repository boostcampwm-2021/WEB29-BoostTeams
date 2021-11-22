import React from 'react';
import { useRecoilValue } from 'recoil';

import { UserIdType } from '@src/types/chat';
import { currentChatRoomState } from '@stores/chat';

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
	const { currChatRoomId } = useRecoilValue(currentChatRoomState);

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
				currChatRoomId !== -1 && <Header teamId={teamId} />
			)}
		</Container>
	);
};

export default ChatHeader;
