import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
