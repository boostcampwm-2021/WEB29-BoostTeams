import Styled from 'styled-components';

export const CardListContainer = Styled.div`
  display:grid;
  grid-template-columns : repeat(auto-fill, minmax(20%, auto));
  grid-templates-rows : repeat(auto-fill, minmax(33%, auto));
  align-items: center;
  justify-items: center;
  top:3rem;
  height: calc(100% - 3rem);
  `;
