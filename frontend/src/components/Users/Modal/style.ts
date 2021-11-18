import styled from 'styled-components';

export const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 0 10% 0;
`;

export const UpdateModalContent = styled.div`
	padding: 0 10%;
	& > * {
		margin: 5%;
	}
`;

export const Input = styled.input`
	font-size: 1rem;
	border: solid 1px black;
`;
