import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { ColorCode } from '@utils/constants';
import NotoSansKR_B from '@fonts/NotoSansKR-Bold.woff';
import NotoSansKR_L from '@fonts/NotoSansKR-Light.woff';
import NotoSansKR_M from '@fonts/NotoSansKR-Medium.woff';
import NotoSansKR_R from '@fonts/NotoSansKR-Regular.woff';
import NotoSans_B from '@fonts/NotoSans-Bold.woff';
import NotoSans_R from '@fonts/NotoSans-Regular.woff';

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'Noto_Sans_KR';
    font-weight: 300;
    src: local('Noto_Sans_KR'), url(${NotoSansKR_L}) format('woff');
    font-display: swap;
  }
  @font-face {
    font-family: 'Noto_Sans_KR';
    font-weight: 400;
    src: local('Noto_Sans_KR'), url(${NotoSansKR_R}) format('woff');
    font-display: swap;
  }
  @font-face {
    font-family: 'Noto_Sans_KR';
    font-weight: 500;
    src: local('Noto_Sans_KR'), url(${NotoSansKR_M}) format('woff');
    font-display: swap;
  }
  @font-face {
    font-family: 'Noto_Sans_KR';
    font-weight: 700;
    src: local('Noto_Sans_KR'), url(${NotoSansKR_B}) format('woff');
    font-display: swap;
  }
  @font-face {
    font-family: 'Noto_Sans';
    font-weight: 400;
    src: local('Noto_Sans'), url(${NotoSans_R}) format('woff');
    font-display: swap;
  }
  @font-face {
    font-family: 'Noto_Sans';
    font-weight: 700;
    src: local('Noto_Sans'), url(${NotoSans_B}) format('woff');
    font-display: swap;
  }
  html,
  body,
  span,
  div,
  a,
  input,
  textarea,
  button {
    font-family: 'Noto_Sans_KR', 'Noto_Sans', sans-serif;
  }
  a {
    text-decoration: none;
    color: ${ColorCode.BLACK};
    &:visited {
      color: ${ColorCode.BLACK};
    }
  }
`;

export default GlobalStyle;
