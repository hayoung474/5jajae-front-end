import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';
import { fontStyle, fontWeight } from './theme';

const styles = css`
  // your global styles
  body {
  }
`;

const GlobalStyles = createGlobalStyle`
  ${reset}
  ${styles}


  .map-store-marker-default{
    display:flex;
    flex-direction:column;
    align-items:center;
    position:relative;
    .pin{
      width:26px;
    }
    .label{
      position:absolute;
      top:26px;
      width:100px;
      text-align:center;
      ${({ theme }) => theme.fontStyle.label_1};
      ${({ theme }) => theme.fontWeight.bold};
      color:${({ theme }) => theme.colors.cool_gray_950};
      text-shadow: -1.5px 0 white, 0 1.5px white, 1.5px 0 white, 0 -1.5px white;
      

    }
  }
  .map-store-marker-active{
    display:flex;
    flex-direction:column;
    align-items:center;
    position:relative;
    
    .pin{
      width:41px;
    }
    .label{
      width:100px;
      position:absolute;
      top:41px;
      text-align:center;
      ${({ theme }) => theme.fontStyle.label_1};
      ${({ theme }) => theme.fontWeight.bold};
      color:${({ theme }) => theme.colors.violet_600};
      text-shadow: -1.5px 0 white, 0 1.5px white, 1.5px 0 white, 0 -1.5px white;


    }
  }
  
`;

export default GlobalStyles;
