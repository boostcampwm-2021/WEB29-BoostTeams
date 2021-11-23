import React, { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { TeamUserType, UserIdType } from '@src/types/team';
import userState from '@stores/user';
import { teamUsersSelector } from '@stores/team';

import { FaTimes } from 'react-icons/fa';
import { ProfileIcon } from '@components/common';
import { SearchHeaderContainer, UserListContainer, InputWrapper, SearchContainer, UserContainer } from './style';

interface Props {
	teamId: number;
	inviteUsers: UserIdType[];
	addInviteUser: (newUser: UserIdType) => void;
	deleteInviteUser: (id: number) => void;
}

const SearchHeader: React.FC<Props> = ({ teamId, inviteUsers, addInviteUser, deleteInviteUser }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const myId = useRecoilValue(userState).id;
	const teamUsers = useRecoilValue(teamUsersSelector(teamId));
	const [userSearchResult, setUserSearchResult] = useState<TeamUserType[]>([]);

	const searchByKey = (searchKey: string): TeamUserType[] => {
		return Object.values(teamUsers).filter((user: TeamUserType) => {
			const regex = new RegExp(searchKey, 'gi');
			return (
				user.userId !== myId && (teamUsers[user.userId].email.match(regex) || teamUsers[user.userId].name.match(regex))
			);
		});
	};

	const handleSearchByKey = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchKey = e.currentTarget.value;
		const matches = !searchKey ? [] : searchByKey(searchKey);
		setUserSearchResult(matches);
	};

	const handleUserInvite = (userId: number) => {
		const user = teamUsers[userId];
		if (user) addToInvitationList(user.userId);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key !== 'Enter') return;
		e.preventDefault();
		addToInvitationList(userSearchResult[0].userId); // enter 눌렀을 때 첫번째 결과로 입력
	};

	const addToInvitationList = (userId: number) => {
		if (!inputRef.current) return;
		if (inviteUsers.find((invitedUser) => invitedUser.userId === userId)) return;
		addInviteUser({ userId });
		setUserSearchResult([]);
		inputRef.current.value = '';
	};

	return (
		<SearchHeaderContainer>
			<UserListContainer>
				{inviteUsers.map((user) => (
					<div key={user.userId}>
						<span>{teamUsers[user.userId].name}</span>
						<FaTimes onClick={() => deleteInviteUser(user.userId)} />
					</div>
				))}
			</UserListContainer>
			<InputWrapper>
				<input
					type='text'
					placeholder='초대할 유저 이름 입력'
					ref={inputRef}
					onChange={handleSearchByKey}
					onKeyDown={handleKeyPress}
				/>
			</InputWrapper>
			<SearchContainer>
				{userSearchResult.map((user) => (
					<UserContainer key={user.userId} onClick={() => handleUserInvite(user.userId)}>
						<ProfileIcon name={user.name} color={user.color} status='none' width={2.4} isHover={false} />
						<span>{`${user.name} (${user.email})`}</span>
					</UserContainer>
				))}
			</SearchContainer>
		</SearchHeaderContainer>
	);
};

export default SearchHeader;
