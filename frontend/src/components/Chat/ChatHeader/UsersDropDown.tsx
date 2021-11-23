import React from 'react';
import { useRecoilValue } from 'recoil';

import { teamUsersSelector } from '@stores/team';
import { chatRoomUsersSelector } from '@stores/chat';

import { FaUserPlus } from 'react-icons/fa';
import { ProfileIcon } from '@components/common';
import { DropDownContainer, ProfileContainer, InvititationBtn } from './style';

interface Props {
	teamId: number;
	toggleDropDownModal: () => void;
}

const UserListDropDown: React.FC<Props> = ({ teamId, toggleDropDownModal }) => {
	const teamUsers = useRecoilValue(teamUsersSelector(teamId));
	const chatRoomUserList = useRecoilValue(chatRoomUsersSelector).userList;

	return (
		<DropDownContainer>
			{chatRoomUserList.map((user) => (
				<ProfileContainer>
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
			<InvititationBtn>
				<FaUserPlus />
				<span>유저 추가하기</span>
			</InvititationBtn>
		</DropDownContainer>
	);
};

export default UserListDropDown;
