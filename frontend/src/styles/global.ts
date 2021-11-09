import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { ColorCode } from '../utils/constants';

const GlobalStyle = createGlobalStyle`
  ${reset}
  a {
    text-decoration: none;
    color: ${ColorCode.BLACK};
    &:visited {
      color: ${ColorCode.BLACK};
    }
  }
`;

export default GlobalStyle;
