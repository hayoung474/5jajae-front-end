import styled, { css } from 'styled-components';
import Text from '../Text';
import { flexCenter } from '~/style/mixins';
import { HTMLAttributes } from 'react';

type Props = {
  name: string;
  iconSrc?: string;
  filterActive?: boolean;
} & HTMLAttributes<HTMLDivElement>;
const ChipToggleFilter = ({ iconSrc, name, filterActive, onClick }: Props) => {
  return (
    <Wrapper $filterActive={filterActive} onClick={onClick}>
      {iconSrc && <Icon src={iconSrc} alt="filter-icon-image" />}
      <Text color={filterActive ? 'violet_600' : 'cool_gray_700'} variant="body_1" weight="medium">
        {name}
      </Text>
    </Wrapper>
  );
};

interface StyledProps {
  $filterActive?: boolean;
}
const Wrapper = styled.div<StyledProps>`
  ${flexCenter};
  gap: 4px;
  box-sizing: border-box;
  padding: 0 12px;
  height: 40px;

  border-radius: 4px;
  border: solid 1px ${({ theme }) => theme.colors.cool_gray_200};
  background-color: ${({ theme }) => theme.colors.white};

  &:hover {
    cursor: pointer;
  }

  ${({ $filterActive, theme }) =>
    $filterActive &&
    css`
      border: solid 1px ${theme.colors.violet_600};
      background-color: ${theme.colors.violet_50};
    `}

  ${({ $filterActive }) =>
    !$filterActive &&
    css`
      &:hover {
        background-color: #00000005;
      }
      &:active {
        background-color: #00000008;
      }
    `}
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  ${flexCenter};
`;
export default ChipToggleFilter;
