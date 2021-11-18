import React from 'react';
import { ProfileIcon, Button } from '@components/common';
import { ColorCode } from '@utils/constants';
import { useSetRecoilState } from 'recoil';
import { selectedUser } from '@src/stores/team';
import { UserWrapper } from './style';

interface Props {
	user: any;
	mode: string;
	isAdmin: boolean;
	isOnline: (userId: number) => boolean;
	onBtnClick: (mode: string) => void;
}

const User: React.FC<Props> = ({ user, mode, isAdmin, isOnline, onBtnClick }) => {
	const setUser = useSetRecoilState(selectedUser);
	const openKickoutModal = () => {
		setUser({ id: user.id });
		onBtnClick('KICKOUT');
	};
	return (
		<UserWrapper key={user.id}>
			<div>
				<ProfileIcon
					name={user.name}
					color={user.state}
					status={isOnline(user.id) ? 'online' : 'offline'}
					width={2.5}
					isHover={false}
				/>
				<span>{user.name}</span>
			</div>
			<span>{user.role}</span>
			{isAdmin && mode !== 'ADMIN' ? (
				<Button text='강퇴' backgroundColor={ColorCode.RED} fontColor={ColorCode.WHITE} handler={openKickoutModal} />
			) : null}
		</UserWrapper>
	);
};

export default User;
