import { css } from 'styled-components';

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexBetweenCenter = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const truncate = (lines = 1) => css`
  overflow: hidden;
  display: block;
  -webkit-line-clamp: ${lines};
  display: box;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
`;

export const hideScrollBar = css`
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
