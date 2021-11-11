import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { ColorCode } from '../utils/constants';

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'Noto Sans KR';
    font-weight: 300;
    font-style: normal;
    src: url('/public/fonts/NotoSansKR-Light.otf') format('opentype'),
  }
  @font-face {
    font-family: 'Noto Sans KR';
    font-weight: 400;
    font-style: normal;
    src: url('/public/fonts/NotoSansKR-Regular.otf') format('opentype'),
  }
  @font-face {
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-style: normal;
    src: url('/public/fonts/NotoSansKR-Medium.otf') format('opentype'),
  }
  @font-face {
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-style: normal;
    src: url('/public/fonts/NotoSansKR-Bold.otf') format('opentype'),
  }
  @font-face {
    font-family: 'Noto Sans';
    font-weight: 400;
    font-style: normal;
    src: url('/public/fonts/NotoSans-Regular.otf') format('truetype'),
  }
  @font-face {
    font-family: 'Noto Sans';
    font-weight: 700;
    font-style: normal;
    src: url('/public/fonts/NotoSans-Bold.otf') format('truetype'),
  }
  html {
    font-family: 'Noto Sans KR', 'Noto Sans', sans-serif;
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
