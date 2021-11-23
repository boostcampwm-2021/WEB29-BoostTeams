import React from 'react';

import { UserIdType } from '@src/types/team';
import { Button } from '@components/common';
import { ColorCode } from '@utils/constants';

import SearchInput from '../SearchInput';
import { InviteDropDownContainer, ButttonContainer } from './style';

interface Props {
	teamId: number;
	inviteUsers: UserIdType[];
	addInviteUser: (newUser: UserIdType) => void;
	deleteInviteUser: (id: number) => void;
	handleInviteDropDownClose: () => void;
}
const InviteDropDown: React.FC<Props> = ({
	teamId,
	inviteUsers,
	addInviteUser,
	deleteInviteUser,
	handleInviteDropDownClose,
}) => {
	return (
		<InviteDropDownContainer>
			<h3>유저 초대하기</h3>
			<SearchInput
				teamId={teamId}
				inviteUsers={inviteUsers}
				addInviteUser={addInviteUser}
				deleteInviteUser={deleteInviteUser}
			/>
			<ButttonContainer>
				<Button
					text='초대'
					backgroundColor={ColorCode.PRIMARY1}
					fontColor={ColorCode.WHITE}
					handler={() => console.log('hi')}
				/>
				<Button
					text='닫기'
					backgroundColor={ColorCode.WHITE}
					fontColor={ColorCode.BLACK}
					handler={handleInviteDropDownClose}
				/>
			</ButttonContainer>
		</InviteDropDownContainer>
	);
};

export default InviteDropDown;
