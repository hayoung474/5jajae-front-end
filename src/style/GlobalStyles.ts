import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

const styles = css`
  // your global styles
  body {
  }

`;

const GlobalStyles = createGlobalStyle`
  ${reset}
  ${styles}
  
`;

export default GlobalStyles;
