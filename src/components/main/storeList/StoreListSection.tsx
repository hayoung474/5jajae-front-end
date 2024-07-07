import styled from 'styled-components';
import StoreList from './StoreList';
import StoreListTitle from './StoreListTitle';

const StoreListSection = () => {
  return (
    <Wrapper>
      <StoreListTitle />
      <StoreList />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 120px;
`;

export default StoreListSection;
