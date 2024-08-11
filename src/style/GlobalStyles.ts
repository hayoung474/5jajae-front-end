import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { flexCenter } from './mixins';

const GlobalStyles = createGlobalStyle`
  ${reset}

  /* 글로벌 스타일 정의 */
  body {
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  };

  .map-guide-info-window{
    background-color:${({ theme }) => theme.colors.violet_600};
    border-radius:4px;
    padding:12px;
    text-align: center;
    .title{
      color:${({ theme }) => theme.colors.white};
      ${({ theme }) => theme.fontStyle.body_1}; 
      ${({ theme }) => theme.fontWeight.bold};                                           
    }
    .message{
      margin-top:2px;
      color:${({ theme }) => theme.colors.white};
      ${({ theme }) => theme.fontStyle.label_2}; 
      ${({ theme }) => theme.fontWeight.regular};   
    }
  }
  .map-center-marker-pin{
    width:16px;
    height:16px;
    background-color:#FC3059;
    border:solid 2px #ffffff;
    border-radius:50%;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);

    &::after{
      position:absolute;
      display:block;
      content:"";
      width:36px;
      height:36px;
      border-radius:50%;
      background-color:#FC305920;
      top:50%;
      left:50%;
      transform: translate(-50%, -50%);

    }
  }
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
    display:absolute;
    bottom:20px;
    /* margin-bottom:12px; */
    width:260px;
    border-radius:8px;
    padding:20px;
    background-color:${({ theme }) => theme.colors.white};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);

    .store-badge-list{
      display:flex;
      gap:4px;
      flex-wrap: wrap;
      margin-bottom:4px;
      .store-badge-list-item{
        ${({ theme }) => theme.fontStyle.caption_2};
        ${({ theme }) => theme.fontWeight.medium};
        color:${({ theme }) => theme.colors.cool_gray_500};
        display: inline-block;
        background-color: ${({ theme }) => theme.colors.cool_gray_100};
        border-radius: 4px;
        padding: 4px 6px;
        white-space: nowrap;
      }
    }
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
