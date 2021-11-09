import Styled from 'styled-components';
import { ColorCode, TeamCard, Font } from '../../../utils/constants';

export const TeamCardContainer = Styled.div`
  display : flex;
  flex-direction : column;
  justify-content: center;
  align-items : center;
  background-color: ${ColorCode.WHITE};
  border-radius: ${TeamCard.BORDER_RADIUS};
  width : ${TeamCard.WIDTH};
  height :${TeamCard.HEIGHT};
`;

export const TeamCardImage = Styled.div`
  display: flex;
  justify-content : center;
  align-items : center;
  width : ${TeamCard.WIDTH};
  height : calc(${TeamCard.HEIGHT} * 0.6);
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const TeamCardName = Styled.span`
  width : ${TeamCard.WIDTH};
  height : calc(${TeamCard.HEIGHT} * 0.1);
  font-size: ${Font.MEDIUM};
  font-weight: bold;
  text-align: center;
  padding-top : 0.5rem;
  padding-bottom : 0.5rem;
`;

export const InviteButtonContainer = Styled.div`
    width : ${TeamCard.WIDTH};
    height : calc(${TeamCard.HEIGHT} * 0.1);
    display: flex;
    align-items : center;
    justify-content : space-evenly; 
`;
