import React from 'react';
import { useRecoilValue } from 'recoil';

import { chatModeState } from '@stores/chat';
import { UserIdType } from '@src/types/team';

import { Header, Navbar } from '@components/common';
import ChatSidebar from '@components/Chat/ChatSidebar';
import ChatHeader from '@components/Chat/ChatHeader';
import ChatContent from '@components/Chat/ChatContent';
import { Layout, MainContainer, ChatContainer } from './style';

interface Props {
	teamId: number;
	inviteUsers: UserIdType[];
	messagesEndRef: React.RefObject<HTMLDivElement>;
	addInviteUser: (newUser: UserIdType) => void;
	deleteInviteUser: (id: number) => void;
	initInviteUser: () => void;
}

const ChatTemplate: React.FC<Props> = ({
	teamId,
	inviteUsers,
	messagesEndRef,
	addInviteUser,
	deleteInviteUser,
	initInviteUser,
}) => {
	const chatMode = useRecoilValue(chatModeState);

	return (
		<Layout>
			<Header />
			<MainContainer>
				<Navbar />
				<ChatSidebar teamId={teamId} />
				{chatMode !== 'none' && (
					<ChatContainer>
						<ChatHeader
							teamId={teamId}
							inviteUsers={inviteUsers}
							addInviteUser={addInviteUser}
							deleteInviteUser={deleteInviteUser}
							initInviteUser={initInviteUser}
						/>
						<ChatContent teamId={teamId} inviteUsers={inviteUsers} messagesEndRef={messagesEndRef} />
					</ChatContainer>
				)}
			</MainContainer>
		</Layout>
	);
};
export default ChatTemplate;
