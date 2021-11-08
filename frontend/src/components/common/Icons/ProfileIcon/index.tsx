import React from 'react';
import { ColorCode, PrimaryPalette, SecondaryPalette } from '../../../../utils/constants';
import { Container, ProfileIconContainer, Status } from './style';

interface ProfileProps {
	name: string;
	color: number;
	status: string;
	width: number;
	isHover?: boolean;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Palette = [...PrimaryPalette, ...SecondaryPalette];

const ProfileIcon: React.FC<ProfileProps> = ({ name, color, status, width, isHover, onClick }) => {
	const backgroundColor = color === 6 ? ColorCode.WHITE : Palette[color]; // 6이면 header 색상과 같음
	const fontColor = color === 8 || color === 9 || color === 11 ? ColorCode.WHITE : ColorCode.BLACK;
	return (
		<Container onClick={onClick} width={`${width}rem`} isHover={isHover}>
			<ProfileIconContainer backgroundColor={backgroundColor} fontColor={fontColor} width={`${width - 1}rem`}>
				<span>{name[0]}</span>
				{status === 'none' && <Status color={status} />}
			</ProfileIconContainer>
		</Container>
	);
};

ProfileIcon.defaultProps = {
	isHover: true,
	onClick: undefined,
};

export default ProfileIcon;
