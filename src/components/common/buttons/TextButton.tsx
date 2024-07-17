import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { ColorsType } from '~/style/theme';
import Text from '../Text';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { textColor?: keyof ColorsType };
const TextButton = ({ textColor, children, ...attr }: Props) => {
  return (
    <Wrapper {...attr}>
      <Text variant="label_2" weight="medium" color={textColor ?? 'cool_gray_500'}>
        {children}
      </Text>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0;
`;

export default TextButton;
