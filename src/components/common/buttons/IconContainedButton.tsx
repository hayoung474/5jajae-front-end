import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { flexCenter } from '~/style/mixins';

interface Props {
  size: 'medium' | 'large';
}
const IconContainedButton = ({ size, children }: PropsWithChildren<Props>) => {
  if (size === 'large') {
    return <LargeButton>{children}</LargeButton>;
  }
  return <MediumButton>{children}</MediumButton>;
};

const LargeButton = styled.button`
  ${flexCenter}
  padding: 16px;
  border-radius: 8px;
  border: solid 1px ${({ theme }) => theme.colors.cool_gray_200};
  background-color: ${({ theme }) => theme.colors.white};

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
