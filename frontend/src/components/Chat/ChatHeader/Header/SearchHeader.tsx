import React from 'react';

import { UserIdType } from '@src/types/team';
import SearchInput from '@components/Chat/ChatHeader/SearchInput';

interface Props {
	teamId: number;
	inviteUsers: UserIdType[];
	addInviteUser: (newUser: UserIdType) => void;
	deleteInviteUser: (id: number) => void;
}

const SearchHeader: React.FC<Props> = ({ teamId, inviteUsers, addInviteUser, deleteInviteUser }) => {
	return (
		<SearchInput
			teamId={teamId}
			inviteUsers={inviteUsers}
			addInviteUser={addInviteUser}
			deleteInviteUser={deleteInviteUser}
		/>
	);
};

export default SearchHeader;
