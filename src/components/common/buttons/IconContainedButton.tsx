import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { flexCenter } from '~/style/mixins';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size: 'medium' | 'large';
};
const IconContainedButton = ({ size, children, ...attr }: PropsWithChildren<Props>) => {
  if (size === 'large') {
    return <LargeButton {...attr}>{children}</LargeButton>;
  }
  return <MediumButton {...attr}>{children}</MediumButton>;
};

const LargeButton = styled.button`
  ${flexCenter}
  padding: 16px;
  border-radius: 8px;
  border: solid 1px ${({ theme }) => theme.colors.cool_gray_200};
  background-color: ${({ theme }) => theme.colors.white};
  outline: none;

  &:hover {
    cursor: pointer;
    background-color: #00000005;
  }
  &:active {
    background-color: #00000008;
  }
`;

const MediumButton = styled(LargeButton)`
  padding: 12px;
`;

export default IconContainedButton;
