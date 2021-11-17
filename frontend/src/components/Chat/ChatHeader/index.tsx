import React from 'react';
import { UserType } from '../dataStructure';
import SearchHeader from './SearchHeader';
import Header from './Header';
import { Container } from './style';

interface Props {
	chatMode: string;
	teamUsers: UserType[];
	inviteUsers: UserType[];
	addInviteUser: (newUser: UserType) => void;
	deleteInviteUser: (email: string) => void;
}

const ChatHeader: React.FC<Props> = ({ chatMode, teamUsers, inviteUsers, addInviteUser, deleteInviteUser }) => {
	return (
		<Container>
			{chatMode === 'create' ? (
				<SearchHeader
					teamUsers={teamUsers}
					inviteUsers={inviteUsers}
					addInviteUser={addInviteUser}
					deleteInviteUser={deleteInviteUser}
				/>
			) : (
				<Header />
			)}
		</Container>
	);
};

export default ChatHeader;
