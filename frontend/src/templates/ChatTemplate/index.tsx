import React from 'react';
import { useRecoilValue } from 'recoil';

import { chatModeState } from '@stores/chat';
import { UserIdType } from '@src/types/team';

import { Header, Navbar } from '@components/common';
import ChatSidebar from '@components/Chat/ChatSidebar';
import ChatHeader from '@components/Chat/ChatHeader';
import ChatContent from '@components/Chat/ChatContent';
import UpdateRoomNameModal from '@components/Chat/UpdateRoomNameModal';
import { Layout, MainContainer, ChatContainer } from './style';

interface Props {
	teamId: number;
	inviteUsers: UserIdType[];
	messagesEndRef: React.RefObject<HTMLDivElement>;
	isModalVisible: boolean;
	addInviteUser: (newUser: UserIdType) => void;
	deleteInviteUser: (id: number) => void;
	initInviteUser: () => void;
	socketInviteUser: (chatRoomId: number, userList: UserIdType[]) => void;
	handleModalOpen: () => void;
	handleModalClose: () => void;
}

const ChatTemplate: React.FC<Props> = ({
	teamId,
	inviteUsers,
	messagesEndRef,
	isModalVisible,
	addInviteUser,
	deleteInviteUser,
	initInviteUser,
	socketInviteUser,
	handleModalOpen,
	handleModalClose,
}) => {
	const { chatMode } = useRecoilValue(chatModeState);

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
							socketInviteUser={socketInviteUser}
							handleModalOpen={handleModalOpen}
						/>
						<ChatContent
							teamId={teamId}
							inviteUsers={inviteUsers}
							initInviteUser={initInviteUser}
							socketInviteUser={socketInviteUser}
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
