import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { flexCenter } from '~/style/mixins';
import { ColorsType } from '~/style/theme';

type Props = {
  size: 'medium' | 'large';
  backgroundColor?: keyof ColorsType;
  textColor?: keyof ColorsType;
} & ButtonHTMLAttributes<HTMLButtonElement>;
const SolidButton = ({ size, backgroundColor, textColor, children, ...rest }: PropsWithChildren<Props>) => {
  if (size === 'medium') {
    return (
      <MediumButton $backgroundColor={backgroundColor} $textColor={textColor} {...rest}>
        {children}
      </MediumButton>
    );
  }
  return (
    <LargeButton $backgroundColor={backgroundColor} $textColor={textColor} {...rest}>
      {children}
    </LargeButton>
  );
};

interface StyleProps {
  $backgroundColor?: keyof ColorsType;
  $textColor?: keyof ColorsType;
}
const LargeButton = styled.button<StyleProps>`
  border-radius: 8px;
  border: none;
  outline: none;

  padding: 16px;

  color: ${({ $textColor, theme }) => theme.colors[$textColor ?? 'white']};
  background-color: ${({ $backgroundColor, theme }) => theme.colors[$backgroundColor ?? 'violet_600']};

  ${({ theme }) => theme.fontStyle.label_1};
  ${({ theme }) => theme.fontWeight.medium};

  &:disabled {
    color: ${({ theme }) => theme.colors.cool_gray_400};
    background-color: ${({ theme }) => theme.colors.cool_gray_200};
  }
`;

const MediumButton = styled(LargeButton)`
  ${flexCenter}
  padding:0 12px;
  height: 40px;

  ${({ theme }) => theme.fontStyle.label_2};
  ${({ theme }) => theme.fontWeight.medium};
`;

export default SolidButton;
