import { HTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { truncate } from '~/style/mixins';
import { ColorsType, FontStyleType, FontWeightType } from '~/style/theme';

type TextProps = {
  variant: keyof FontStyleType;
  weight: keyof FontWeightType;
  color?: keyof ColorsType;
  /** 말줄임표를 표시할 lines수 */
  truncateLines?: number;
} & HTMLAttributes<HTMLDivElement>;
const Text = ({
  variant,
  weight,
  color,
  truncateLines,
  children,
  ...rest
}: PropsWithChildren<TextProps>) => {
  return (
    <Wrapper
      $variant={variant}
      $weight={weight}
      $color={color}
      $truncateLines={truncateLines}
      {...rest}
    >
      {children}
    </Wrapper>
  );
};

interface StyleProps {
  $variant: keyof FontStyleType;
  $weight: keyof FontWeightType;
  $color?: keyof ColorsType;
  $truncateLines?: number;
}
const Wrapper = styled.div<StyleProps>`
  ${({ theme, $variant }) => theme.fontStyle[$variant]};
  ${({ theme, $weight }) => theme.fontWeight[$weight]};
  color: ${({ theme, $color }) => theme.colors[$color ?? 'black']};

  ${({ $truncateLines }) => $truncateLines && truncate($truncateLines ?? 1)}

  white-space: pre-wrap;
`;

export default Text;
