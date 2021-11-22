import React from 'react';
import { UserIdType } from '@src/types/team';
import { ChatModeType } from '@src/types/chat';

import { Header, Navbar } from '@components/common';
import ChatSidebar from '@components/Chat/ChatSidebar';
import ChatHeader from '@components/Chat/ChatHeader';
import ChatContent from '@components/Chat/ChatContent';
import UpdateRoomNameModal from '@components/Chat/UpdateRoomNameModal';
import { Layout, MainContainer, ChatContainer } from './style';

interface Props {
	teamId: number;
	chatMode: ChatModeType;
	inviteUsers: UserIdType[];
	messagesEndRef: React.RefObject<HTMLDivElement>;
	isModalVisible: boolean;
	setChatModeToNone: () => void;
	setChatModeToCreate: () => void;
	setChatModeToChat: () => void;
	addInviteUser: (newUser: UserIdType) => void;
	deleteInviteUser: (id: number) => void;
	initInviteUser: () => void;
	handleModalOpen: () => void;
	handleModalClose: () => void;
}

const ChatTemplate: React.FC<Props> = ({
	teamId,
	chatMode,
	inviteUsers,
	messagesEndRef,
	isModalVisible,
	setChatModeToNone,
	setChatModeToCreate,
	setChatModeToChat,
	addInviteUser,
	deleteInviteUser,
	initInviteUser,
	handleModalOpen,
	handleModalClose,
}) => {
	return (
		<Layout>
			<Header />
			<MainContainer>
				<Navbar />
				<ChatSidebar
					teamId={teamId}
					setChatModeToNone={setChatModeToNone}
					setChatModeToCreate={setChatModeToCreate}
					setChatModeToChat={setChatModeToChat}
				/>
				{chatMode !== 'none' && (
					<ChatContainer>
						<ChatHeader
							teamId={teamId}
							chatMode={chatMode}
							inviteUsers={inviteUsers}
							addInviteUser={addInviteUser}
							deleteInviteUser={deleteInviteUser}
							handleModalOpen={handleModalOpen}
						/>
						<ChatContent
							teamId={teamId}
							chatMode={chatMode}
							inviteUsers={inviteUsers}
							setChatModeToChat={setChatModeToChat}
							initInviteUser={initInviteUser}
							messagesEndRef={messagesEndRef}
						/>
					</ChatContainer>
				)}
				{isModalVisible && <UpdateRoomNameModal teamId={teamId} handleModalClose={handleModalClose} />}
			</MainContainer>
		</Layout>
	);
};
export default ChatTemplate;
