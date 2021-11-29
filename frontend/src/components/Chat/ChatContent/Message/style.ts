import { ColorCode, Font } from '@utils/constants';
import styled from 'styled-components';

interface Props {
	myChat: boolean;
}
export const Container = styled.div<Props>`
	display: flex;
	margin: 1.5rem 3rem;
	justify-content: ${(props) => (props.myChat ? `right` : `left`)};
`;

export const ChatIconWrapper = styled.div`
	margin-right: 0.6rem;
`;

export const MessageContainer = styled.div<Props>`
	max-width: 70%;
	padding: 0.5rem 1rem;
	font-size: ${Font.SMALL};
	border-radius: 8px;
	background-color: ${(props) => (props.myChat ? `${ColorCode.PRIMARY2}` : `${ColorCode.WHITE}`)};
`;

export const InfoContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 0.5rem;
	b {
		font-weight: bold;
		padding-right: 0.5rem;
	}
	span {
		font-size: ${Font.X_SMALL};
	}
`;

export const ImojiWraper = styled.div`
	padding-left: 1rem;
`;
