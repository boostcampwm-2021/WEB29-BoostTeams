import React, { useState } from 'react';
import { ProfileIcon } from '@components/common';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedUser, teamUsersTrigger } from '@stores/team';
import { TeamUserType } from '@src/types/team';
import DropDown from '@components/common/DropDown';
import { patchRole } from '@apis/team';
import { RoleArr } from '@utils/constants';
import userState from '@stores/user';
import { UserWrapper } from './style';

interface Props {
	user: TeamUserType;
	isAdmin: boolean;
	isOnline: (userId: number) => boolean;
	openModal: (mode: string) => void;
	teamId: number;
}

const User: React.FC<Props> = ({ user, isAdmin, isOnline, openModal, teamId }) => {
	const [selectedRepeat, setSelectedRepeat] = useState(user.role === '관리자' ? 0 : 1);
	const setUser = useSetRecoilState(selectedUser);
	const setTeamUsersTrigger = useSetRecoilState(teamUsersTrigger);
	const myInfo = useRecoilValue(userState);
	const openKickoutModal = () => {
		setUser({ id: user.userId });
		openModal('KICKOUT');
	};
	const onSelect = async (value: number) => {
		if (RoleArr[value] === user.role) return;
		if (value === 2) openKickoutModal();
		else {
			await patchRole(setTeamUsersTrigger, user.userId, teamId, value);
			setSelectedRepeat(value);
		}
	};
	return (
		<UserWrapper key={user.userId}>
			<div>
				<ProfileIcon
					name={user.name}
					color={user.color}
					status={isOnline(user.userId) ? 'online' : 'offline'}
					width={2.5}
					isHover={false}
				/>
				<span>{user.name}</span>
			</div>
			<div>
				{isAdmin && myInfo.id !== user.userId ? (
					<DropDown
						options={user.role === '관리자' ? RoleArr : [...RoleArr, '강퇴하기']}
						selectedOption={RoleArr[selectedRepeat]}
						setSelectedOption={onSelect}
					/>
				) : (
					<span>{user.role}</span>
				)}
			</div>
		</UserWrapper>
	);
};

export default User;
