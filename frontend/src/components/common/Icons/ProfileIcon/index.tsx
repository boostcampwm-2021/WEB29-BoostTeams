import React from 'react';
import { ColorCode, PrimaryPalette, SecondaryPalette } from '../../../../utils/constants';
import { Container, ProfileIconContainer, Status } from './style';

interface ProfileProps {
	name: string;
	color: number;
	status: string;
}

const Palette = [...PrimaryPalette, ...SecondaryPalette];

const ProfileIcon: React.FC<ProfileProps> = ({ name, color, status }: ProfileProps) => {
	const backgroundColor = color === 6 ? ColorCode.WHITE : Palette[color]; // 6이면 header 색상과 같음
	const fontColor = color === 8 || color === 9 || color === 11 ? ColorCode.WHITE : ColorCode.BLACK;
	return (
		<Container>
			<ProfileIconContainer backgroundColor={backgroundColor} fontColor={fontColor}>
				<span>{name}</span>
				{status === 'none' && <Status color={status} />}
			</ProfileIconContainer>
		</Container>
	);
};

export default ProfileIcon;
