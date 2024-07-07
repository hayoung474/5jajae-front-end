import styled from 'styled-components';
import ChipToggleFilter from '../../common/filter/ChipToggleFilter';

const Filter = () => {
  return (
    <Wrapper>
      <ChipToggleFilter name="전체" filterActive />
      <ChipToggleFilter name="목자재" />
      <ChipToggleFilter name="경량자재" />
      <ChipToggleFilter name="금속자재" />
      <ChipToggleFilter name="철물" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  box-sizing: border-box;
  padding: 0 32px;
  width: 100%;
  height: 72px;

  border-bottom: solid 1px ${({ theme }) => theme.colors.cool_gray_200};
`;

export default Filter;
