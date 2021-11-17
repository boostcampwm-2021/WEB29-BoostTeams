import React from 'react';
import { Header, Navbar } from '@components/common';
import ChatSidebar from '@components/Chat/ChatSidebar';
import ChatHeader from '@components/Chat/ChatHeader';
import ChatContent from '@components/Chat/ChatContent';
import { UserType, ChatModeType } from '@components/Chat/dataStructure';
import { Layout, MainContainer, ChatContainer } from './style';

interface Props {
	chatMode: ChatModeType;
	teamUsers: UserType[];
	inviteUsers: UserType[];
	setChatModeToNone: () => void;
	setChatModeToCreate: () => void;
	setChatModeToChat: () => void;
	addInviteUser: (newUser: UserType) => void;
	deleteInviteUser: (id: number) => void;
}

const ChatTemplate: React.FC<Props> = ({
	chatMode,
	teamUsers,
	inviteUsers,
	setChatModeToNone,
	setChatModeToCreate,
	setChatModeToChat,
	addInviteUser,
	deleteInviteUser,
}) => {
	return (
		<Layout>
			<Header />
			<MainContainer>
				<Navbar />
				<ChatSidebar
					setChatModeToNone={setChatModeToNone}
					setChatModeToCreate={setChatModeToCreate}
					setChatModeToChat={setChatModeToChat}
				/>
				{chatMode !== 'none' && (
					<ChatContainer>
						<ChatHeader
							chatMode={chatMode}
							teamUsers={teamUsers}
							inviteUsers={inviteUsers}
							addInviteUser={addInviteUser}
							deleteInviteUser={deleteInviteUser}
						/>
						<ChatContent chatMode={chatMode} />
					</ChatContainer>
				)}
			</MainContainer>
		</Layout>
	);
};
export default ChatTemplate;
