import React from 'react';
import { useRecoilValue } from 'recoil';
import { useHistory } from 'react-router';
import UserState from '../../../../stores/user';
import UserInfo from './UserInfo';
import { Background, Container, Wrapper } from './style';
import { AccountButton, LogoutButton } from './Buttons';

interface ProfileSimpleProps {
	status: string;
	handleCloseModal: () => void;
}

const ProfileSimple: React.FC<ProfileSimpleProps> = ({ status, handleCloseModal }) => {
	const history = useHistory();
	const user = useRecoilValue(UserState);

	return (
		<Container>
			<Wrapper>
				<UserInfo user={user} status={status} />
				<AccountButton
					onClick={() => {
						console.log('click account'); // TODO: 프로필 수정 Modal
					}}
				/>
				<LogoutButton
					onClick={() => {
						console.log('click logout'); // TODO: 로그아웃
					}}
				/>
			</Wrapper>
			<Background onClick={handleCloseModal} />
		</Container>
	);
};

export default ProfileSimple;
