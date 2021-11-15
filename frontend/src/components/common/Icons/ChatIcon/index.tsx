import React from 'react';
import { ProfileImage } from './style';

interface Props {
	name: string;
	color: string;
}

const ChatIcon: React.FC<Props> = ({ name, color }) => {
	return <ProfileImage color={color}>{name}</ProfileImage>;
};

export default ChatIcon;
