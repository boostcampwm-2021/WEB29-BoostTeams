import styled from 'styled-components';

export const CardListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 3rem;
	align-items: center;
	justify-items: center;
	top: 3rem;
	padding: 1rem;
	height: calc((100% - 3rem) / 2 - 2rem); // 3rem: header, 2rem: padding
`;
