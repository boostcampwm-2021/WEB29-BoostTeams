import styled from 'styled-components';

export const CardListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 3rem;
	align-items: flex-start;
	padding: 2rem 0;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 5rem 2rem;
	height: calc((100% - 3rem) / 2 - 10rem); // 3rem: header, 10rem: padding
`;

export const Title = styled.span`
	font-weight: 700;
`;
