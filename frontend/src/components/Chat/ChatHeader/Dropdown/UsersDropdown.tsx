import React from 'react';
import { useRecoilValue } from 'recoil';

import { teamUsersSelector } from '@stores/team';
import { chatRoomUsersState } from '@stores/chat';
import { DropdownModeType } from '@src/types/chat';
import { UserIdType } from '@src/types/team';

import { FaUserPlus } from 'react-icons/fa';
import { ProfileIcon } from '@components/common';
import { UsersDropdownContainer, ProfileContainer, InvititationBtn } from './style';

interface Props {
	teamId: number;
	handleDropdownMode: (mode: DropdownModeType) => void;
}

const UsersDropdown: React.FC<Props> = ({ teamId, handleDropdownMode }) => {
	const teamUsers = useRecoilValue(teamUsersSelector(teamId));
	const chatRoomUsers = useRecoilValue(chatRoomUsersState);

	return (
		<UsersDropdownContainer>
			{chatRoomUsers.map((user: UserIdType) => (
				<ProfileContainer key={user.userId}>
					<ProfileIcon
						name={teamUsers[user.userId].name}
						color={teamUsers[user.userId].color}
						status='none'
						width={2.5}
						isHover={false}
					/>
					<span>{teamUsers[user.userId].name}</span>
				</ProfileContainer>
			))}
			<InvititationBtn onClick={() => handleDropdownMode('invite')}>
				<FaUserPlus />
				<span>유저 추가하기</span>
			</InvititationBtn>
		</UsersDropdownContainer>
	);
};

export default UsersDropdown;
