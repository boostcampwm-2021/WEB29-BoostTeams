import React, { useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ProfileIcon } from '@components/common';
import { UserType } from '../dataStructure';
import { SearchHeaderContainer, UserListContainer, InputWrapper, SearchContainer, UserContainer } from './style';

interface Props {
	teamUsers: UserType[];
	inviteUsers: UserType[];
	addInviteUser: (newUser: UserType) => void;
	deleteInviteUser: (email: string) => void;
}

const SearchHeader: React.FC<Props> = ({ teamUsers, inviteUsers, addInviteUser, deleteInviteUser }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [userSearchResult, setUserSearchResult] = useState<UserType[]>([]);

	const searchByKey = (searchKey: string, userList: UserType[]): UserType[] => {
		return userList.filter((user) => {
			const regex = new RegExp(searchKey, 'gi');
			return user.user_email.match(regex) || user.user_name.match(regex);
		});
	};

	const handleSearchByKey = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchKey = e.currentTarget.value;
		const matches = !searchKey ? [] : searchByKey(searchKey, teamUsers);
		setUserSearchResult(matches);
	};

	const handleUserClick = (userEmail: string) => {
		const user = teamUsers.find((user) => user.user_email === userEmail);
		if (user) addToInvitationList(user);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key !== 'Enter') return;
		e.preventDefault();
		addToInvitationList(userSearchResult[0]); // enter 눌렀을 때 첫번째 결과로 입력
	};

	const addToInvitationList = (user: UserType) => {
		if (!inputRef.current) return;
		if (inviteUsers.find((invitedUser) => invitedUser.user_email === user.user_email)) return;
		addInviteUser(user);
		setUserSearchResult([]);
		inputRef.current.value = '';
	};

	return (
		<SearchHeaderContainer>
			<UserListContainer>
				{inviteUsers.map((user) => (
					<div key={user.user_email}>
						<span>{user.user_name}</span>
						<FaTimes onClick={() => deleteInviteUser(user.user_email)} />
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
					<UserContainer key={user.user_email} onClick={() => handleUserClick(user.user_email)}>
						<ProfileIcon name={user.user_name} color={0} status='none' width={2.4} isHover={false} />
						<span>{`${user.user_name} (${user.user_email})`}</span>
					</UserContainer>
				))}
			</SearchContainer>
		</SearchHeaderContainer>
	);
};

export default SearchHeader;
