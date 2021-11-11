import React from 'react';
import { ProfileImage } from './style';

interface TeamProps {
	name: string;
	color: string;
}

const TeamIcon: React.FC<TeamProps> = ({ name, color }: TeamProps) => {
	return <ProfileImage color={color}>{name}</ProfileImage>;
};

export default TeamIcon;
