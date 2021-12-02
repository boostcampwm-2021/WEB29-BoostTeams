import styled from 'styled-components';
import { ColorCode, TeamCard } from '@src/utils/constants';

export const CardListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 3rem;
	padding: 1rem;
	min-height: ${TeamCard.HEIGHT};
	border-radius: 10px;
	align-items: flex-start;
	overflow-y: auto;
	&::-webkit-scrollbar {
		width: 10px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: ${ColorCode.LINE3};
		border-radius: 10px;
		background-clip: padding-box;
		border: 2px solid transparent;
	}
	&::-webkit-scrollbar-track {
		background-color: ${ColorCode.LINE2};
		border-radius: 10px;
		box-shadow: inset 0px 0px 5px ${ColorCode.WHITE};
	}
	background-color: ${ColorCode.LINE1};
`;

export const MyTeamContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 0 2rem;
	height: calc(100% - 3rem - 15rem - ${TeamCard.HEIGHT} - 2rem - 2rem); // 3rem: header, 10rem: padding
`;

export const InviteContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 0 2rem;
	height: calc(${TeamCard.HEIGHT} + 2rem + 2rem); // 2rem: text + margin, 2rem: padding: ;
`;

export const Title = styled.span`
	font-weight: 700;
`;
