import React from 'react';
import { useRecoilValue } from 'recoil';

import { teamUsersSelector } from '@stores/team';
import { chatRoomUsersSelector } from '@stores/chat';

import { FaUserPlus } from 'react-icons/fa';
import { ProfileIcon } from '@components/common';
import { UsersDropdownContainer, ProfileContainer, InvititationBtn } from './style';

interface Props {
	teamId: number;
	handleDropdownModeToInvite: () => void;
}

const UsersDropdown: React.FC<Props> = ({ teamId, handleDropdownModeToInvite }) => {
	const teamUsers = useRecoilValue(teamUsersSelector(teamId));
	const chatRoomUserList = useRecoilValue(chatRoomUsersSelector).userList;

	return (
		<UsersDropdownContainer>
			{chatRoomUserList.map((user) => (
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
			<InvititationBtn onClick={handleDropdownModeToInvite}>
				<FaUserPlus />
				<span>유저 추가하기</span>
			</InvititationBtn>
		</UsersDropdownContainer>
	);
};

export default UsersDropdown;
