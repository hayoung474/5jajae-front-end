import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { ColorsType } from '~/style/theme';
import Text from '../Text';
import { flexCenter } from '~/style/mixins';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { textColor?: keyof ColorsType; icon: React.ReactNode };
const TextButton = ({ icon, textColor, children, disabled, ...attr }: Props) => {
  const color: keyof ColorsType = disabled ? 'cool_gray_300' : textColor ?? 'cool_gray_500';
  return (
    <Wrapper {...attr}>
      {icon}
      <Text variant="label_2" weight="medium" color={color}>
        {children}
      </Text>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  display: flex;
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0;

  position: relative;

  ${flexCenter}
  gap:2px;

  &:hover {
    &::before {
      display: block;
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      border-radius: 4px;
      background-color: #00000005;
      padding: 4px;
      top: -4px;
      left: -4px;
    }
  }
  &:active {
    &::before {
      display: block;
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      border-radius: 4px;
      background-color: #00000008;
      padding: 4px;
      top: -4px;
      left: -4px;
    }
  }
`;

export default TextButton;
