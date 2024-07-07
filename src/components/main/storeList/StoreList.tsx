import styled from 'styled-components';
import StoreListItem from './StoreListItem';

const StoreList = () => {
  return (
    <Wrapper>
      <StoreListItem />
      <StoreListItem />
      <StoreListItem />
      <StoreListItem />
      <StoreListItem />
      <StoreListItem />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 120px;
`;

export default StoreList;
