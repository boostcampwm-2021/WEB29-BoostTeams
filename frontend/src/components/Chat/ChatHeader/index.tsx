import React, { useRef, useState } from 'react';
import { ProfileIcon } from '@components/common';
import { FaUserPlus, FaPen, FaTimes } from 'react-icons/fa';
import { UserType, userEx } from '../dataStructure';

import {
	Container,
	HeaderContainer,
	InputHeaderContainer,
	UserListContainer,
	InputWrapper,
	SearchContainer,
	UserContainer,
	ChatRoomInfoContainer,
	InvitationBtn,
} from './style';

interface Props {
	chatMode: string;
	inviteUsers: UserType[];
	addInviteUser: (newUser: UserType) => void;
	deleteInviteUser: (email: string) => void;
}

const chatRoomInfo = {
	title: '채팅방1',
	id: 1,
	userList: ['user1', 'user2', 'user3'],
};

const ChatHeader: React.FC<Props> = ({ chatMode, inviteUsers, addInviteUser, deleteInviteUser }) => {
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
		const matches = !searchKey ? [] : searchByKey(searchKey, userEx);
		setUserSearchResult(matches);
	};

	const handleUserClick = (userEmail: string) => {
		const user = userEx.find((user) => user.user_email === userEmail);
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
		<Container>
			{chatMode === 'create' ? (
				<InputHeaderContainer>
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
				</InputHeaderContainer>
			) : (
				<HeaderContainer>
					<ChatRoomInfoContainer>
						<ProfileIcon name={chatRoomInfo.title} color={0} status='none' width={3.2} isHover={false} />
						<h2>{chatRoomInfo.title}</h2>
						<FaPen />
					</ChatRoomInfoContainer>
					<InvitationBtn>
						<FaUserPlus />
						<span>{chatRoomInfo.userList.length}</span>
					</InvitationBtn>
				</HeaderContainer>
			)}
		</Container>
	);
};

export default ChatHeader;
