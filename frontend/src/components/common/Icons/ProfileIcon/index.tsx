import React from 'react';
import { ColorCode, PrimaryPalette, SecondaryPalette } from '@utils/constants';
import { Container, ProfileIconContainer, Status } from './style';

interface ProfileProps {
	name: string; // 유저 name
	color: number; // 유저 프로필 배경색 user_color
	status: string; // online, offline, none
	width: number; // n rem으로 크기 결정
	isHover?: boolean; // hover 효과 줄건가? (default: true)
	onClick?: (e: React.MouseEvent<HTMLElement>) => void; // onClick Event
}

const Palette = [...PrimaryPalette, ...SecondaryPalette];

const ProfileIcon: React.FC<ProfileProps> = ({ name, color, status, width, isHover, onClick }) => {
	const backgroundColor = color === 6 ? ColorCode.WHITE : Palette[color]; // 6이면 header 색상과 같음
	const fontColor = color === 8 || color === 9 || color === 11 ? ColorCode.WHITE : ColorCode.BLACK;
	const statusColor = status === 'online' ? ColorCode.GREEN : ColorCode.GRAY;
	return (
		<Container onClick={onClick} width={`${width}rem`} isHover={isHover}>
			<ProfileIconContainer backgroundColor={backgroundColor} fontColor={fontColor} width={`${width - 1}rem`}>
				<span>{name[0]}</span>
				{status !== 'none' && <Status color={statusColor} />}
			</ProfileIconContainer>
		</Container>
	);
};

ProfileIcon.defaultProps = {
	isHover: true,
	onClick: undefined,
};

export default ProfileIcon;
