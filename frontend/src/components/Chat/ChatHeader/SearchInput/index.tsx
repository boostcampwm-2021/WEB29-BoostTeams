import React, { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import userState from '@stores/user';
import { teamUsersSelector } from '@stores/team';
import { chatModeState, chatRoomUsersState } from '@stores/chat';
import { TeamUsersType, TeamUserType, UserIdType } from '@src/types/team';

import { FaTimes } from 'react-icons/fa';
import { ProfileIcon } from '@components/common';
import { Container, UserListContainer, InputWrapper, SearchContainer, UserContainer } from './style';

interface Props {
	teamId: number;
	inviteUsers: UserIdType[];
	addInviteUser: (newUser: UserIdType) => void;
	deleteInviteUser: (id: number) => void;
}

const SearchInput: React.FC<Props> = ({ teamId, inviteUsers, addInviteUser, deleteInviteUser }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const myId = useRecoilValue(userState).id;
	const chatMode = useRecoilValue(chatModeState);
	const teamUsers = useRecoilValue<TeamUsersType>(teamUsersSelector(teamId));
	const chatRoomUsers = useRecoilValue(chatRoomUsersState);
	const [userSearchResult, setUserSearchResult] = useState<TeamUserType[]>([]);

	const getTeamUserList = (): TeamUserType[] => {
		if (chatMode === 'chat') {
			return Object.values(teamUsers).filter(
				(user) => !chatRoomUsers.find((chatRoomUser) => chatRoomUser.userId === user.userId),
			);
		}
		return Object.values(teamUsers);
	};
	const searchByKey = (searchKey: string): TeamUserType[] => {
		return getTeamUserList().filter((user) => {
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
		<Container>
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
		</Container>
	);
};

export default SearchInput;
