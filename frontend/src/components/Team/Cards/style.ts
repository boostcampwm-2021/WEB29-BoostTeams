import styled from 'styled-components';
import { ColorCode, TeamCard, Font, PrimaryPalette } from '@utils/constants';

interface ThumbnailProps {
	team_id: number;
}

export const Container = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${ColorCode.WHITE};
	border-radius: ${TeamCard.BORDER_RADIUS};
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
	width: ${TeamCard.WIDTH};
	height: ${TeamCard.HEIGHT};
	cursor: pointer;
	&:hover {
		filter: brightness(90%);
	}
	transition: filter 0.2s ease-in-out;
`;

export const ThumbnailWrapper = styled('div')<ThumbnailProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 9rem;
	height: 9rem;
	border-radius: 5px;
	font-size: 3rem;
	color: ${ColorCode.LINE3};
	background-color: ${(props) => PrimaryPalette[props.team_id % 6]};
	margin-bottom: 1rem;
	svg {
		font-size: 2rem;
	}
`;

export const Name = styled.span`
	width: ${TeamCard.WIDTH};
	height: calc(${TeamCard.HEIGHT} * 0.1);
	font-size: ${Font.MEDIUM};
	font-weight: bold;
	text-align: center;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
`;

export const InviteButtonContainer = styled.div`
	position: absolute;
	padding: 1rem;
	width: calc(100% - 2rem); // 2rem: padding
	height: calc(100% - 2rem); // 2rem: padding
	display: flex;
	align-items: end;
	background-color: rgba(0, 0, 0, 0.3);
	border-radius: ${TeamCard.BORDER_RADIUS};
	justify-content: space-between;
	cursor: default;
`;
