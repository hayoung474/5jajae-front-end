import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { flexCenter } from './mixins';

const GlobalStyles = createGlobalStyle`
  ${reset}

  /* Pretendard 웹폰트 정의 */
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff2/Pretendard-Thin.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff/Pretendard-Thin.woff') format('woff');
    font-weight: 100;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff2/Pretendard-ExtraLight.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff/Pretendard-ExtraLight.woff') format('woff');
    font-weight: 200;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff2/Pretendard-Light.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff/Pretendard-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff2/Pretendard-Regular.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff2/Pretendard-Medium.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff/Pretendard-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff2/Pretendard-SemiBold.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff/Pretendard-SemiBold.woff') format('woff');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff2/Pretendard-Bold.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff/Pretendard-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff2/Pretendard-ExtraBold.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff/Pretendard-ExtraBold.woff') format('woff');
    font-weight: 800;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff2/Pretendard-Black.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff/Pretendard-Black.woff') format('woff');
    font-weight: 900;
    font-style: normal;
  }

  /* 글로벌 스타일 정의 */
  body {
    font-family: 'Pretendard', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  };

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
  .map-store-info-window{
    /* margin-bottom:12px; */
    width:260px;
    border-radius:8px;
    padding:20px;
    background-color:${({ theme }) => theme.colors.white};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    .store-title{
      ${({ theme }) => theme.fontStyle.heading_2};
      ${({ theme }) => theme.fontWeight.bold};
      color:${({ theme }) => theme.colors.cool_gray_900};
    }
    .store-description{

      margin-top:8px;
      ${({ theme }) => theme.fontStyle.label_2};
      ${({ theme }) => theme.fontWeight.regular};
      color:${({ theme }) => theme.colors.cool_gray_500};
    }
    .store-address{
      display:flex;
      gap:2px;
      .pin-icon{
        width:16px;
        height:16px;
      }
      margin-top:8px;
      ${({ theme }) => theme.fontStyle.label_2};
      ${({ theme }) => theme.fontWeight.medium};
      color:${({ theme }) => theme.colors.cool_gray_500};

    }
    .store-button-group{
      display:flex;
      gap:8px;
      margin-top:20px;
      .store-share-button{
        ${flexCenter}
        padding:12px;
        background-color:${({ theme }) => theme.colors.white};
        border-radius:8px;
        border:solid 1px ${({ theme }) => theme.colors.cool_gray_200};
        cursor:pointer;
        .share-icon{
          width:16px;
          height:16px;
        }

      }
      .store-detail-button{
        ${flexCenter}
        flex:1;
        padding:12px 0;
        border-radius:8px;
        outline:none;
        border:none;
        color:${({ theme }) => theme.colors.white};
        background-color:${({ theme }) => theme.colors.violet_600};
        cursor:pointer;
        ${({ theme }) => theme.fontStyle.label_2};
        ${({ theme }) => theme.fontWeight.medium};
      }
    }
  }
  
`;

export default GlobalStyles;
