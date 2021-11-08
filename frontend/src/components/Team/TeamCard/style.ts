import Styled from 'styled-components';
import { ColorCode, TeamCard, Font } from '../../../utils/constants';

export const TeamCardContainer = Styled.div`
  display : flex;
  flex-direction : column;
  justify-content: center;
  align-items : center;
  background-color: ${ColorCode.WHITE};
  border-radius: ${TeamCard.borderRadius};
  width : ${TeamCard.width};
  height :${TeamCard.height};
`;

export const TeamCardImage = Styled.div`
  display: flex;
  justify-content : center;
  align-items : center;
  width : ${TeamCard.width};
  height : calc(${TeamCard.height} * 0.6);
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const TeamCardName = Styled.span`
  width : ${TeamCard.width};
  height : calc(${TeamCard.height} * 0.1);
  font-size: ${Font.MEDIUM};
  font-weight: bold;
  text-align: center;
  padding-top : 0.5rem;
  padding-bottom : 0.5rem;
`;

export const InviteButtonWrapper = Styled.div`
    width : ${TeamCard.width};
    height : calc(${TeamCard.height} * 0.1);
    display: flex;
    align-items : center;
    justify-content : space-evenly; 
`;
