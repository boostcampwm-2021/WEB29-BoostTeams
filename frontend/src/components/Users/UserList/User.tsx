import React, { useState } from 'react';
import { ProfileIcon, Button } from '@components/common';
import { ColorCode } from '@utils/constants';
import { useSetRecoilState } from 'recoil';
import { selectedUser, teamUsersTrigger } from '@src/stores/team';
import { TeamUserType } from '@src/types/team';
import DropDown from '@src/components/common/DropDown';
import { patchRole } from '@src/apis/team';
import { UserWrapper } from './style';

interface Props {
	user: TeamUserType;
	mode: string;
	isAdmin: boolean;
	isOnline: (userId: number) => boolean;
	openModal: (mode: string) => void;
	teamId: number;
}

const User: React.FC<Props> = ({ user, mode, isAdmin, isOnline, openModal, teamId }) => {
	const [selectedRepeat, setSelectedRepeat] = useState(user.role === '관리자' ? 0 : 1);
	const repeatOptions = ['관리자', '구성원'];
	const setUser = useSetRecoilState(selectedUser);
	const setTeamUsersTrigger = useSetRecoilState(teamUsersTrigger);
	const openKickoutModal = () => {
		setUser({ id: user.userId });
		openModal('KICKOUT');
	};
	const onSelect = async (value: number) => {
		setSelectedRepeat(value);
		await patchRole(setTeamUsersTrigger, user.userId, teamId, value);
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
			{isAdmin ? (
				<DropDown options={repeatOptions} selectedOption={repeatOptions[selectedRepeat]} setSelectedOption={onSelect} />
			) : (
				<span>{user.role}</span>
			)}
			{isAdmin && mode !== 'ADMIN' ? (
				<Button text='강퇴' backgroundColor={ColorCode.RED} fontColor={ColorCode.WHITE} handler={openKickoutModal} />
			) : null}
		</UserWrapper>
	);
};

export default User;
