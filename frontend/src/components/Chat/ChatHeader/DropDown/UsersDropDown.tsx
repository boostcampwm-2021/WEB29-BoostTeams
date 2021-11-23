import React from 'react';
import { useRecoilValue } from 'recoil';

import { teamUsersSelector } from '@stores/team';
import { chatRoomUsersSelector } from '@stores/chat';

import { FaUserPlus } from 'react-icons/fa';
import { ProfileIcon } from '@components/common';
import { UsersDropDownContainer, ProfileContainer, InvititationBtn } from './style';

interface Props {
	teamId: number;
	handleUsersDropDownClose: () => void;
	handleInviteDropDownOpen: () => void;
}

const UserstDropDown: React.FC<Props> = ({ teamId, handleUsersDropDownClose, handleInviteDropDownOpen }) => {
	const teamUsers = useRecoilValue(teamUsersSelector(teamId));
	const chatRoomUserList = useRecoilValue(chatRoomUsersSelector).userList;

	const handleDropDown = () => {
		handleUsersDropDownClose();
		handleInviteDropDownOpen();
	};
	return (
		<UsersDropDownContainer>
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
			<InvititationBtn onClick={handleDropDown}>
				<FaUserPlus />
				<span>유저 추가하기</span>
			</InvititationBtn>
		</UsersDropDownContainer>
	);
};

export default UserstDropDown;
