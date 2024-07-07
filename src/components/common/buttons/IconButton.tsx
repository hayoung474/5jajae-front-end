import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { flexCenter } from '~/style/mixins';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactNode;
};
const IconButton = ({ icon, ...attr }: Props) => {
  return <Wrapper {...attr}>{icon}</Wrapper>;
};

const Wrapper = styled.button`
  ${flexCenter}
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0;
`;

export default IconButton;
