import React from 'react';
import { Container, ProfileIconContainer, Status } from './style';

interface ProfileProps {
	name: string;
	color: string;
	status: string;
}

const ProfileIcon: React.FC<ProfileProps> = ({ name, color, status }: ProfileProps) => {
	return (
		<Container>
			<ProfileIconContainer color={color}>
				<span>{name}</span>
				<Status color={status} />
			</ProfileIconContainer>
		</Container>
	);
};

export default ProfileIcon;
