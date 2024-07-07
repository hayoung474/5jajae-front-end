import styled from 'styled-components';
import StoreList from './storeList/StoreList';

const Side = () => {
  return (
    <Wrapper>
      <StoreList />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow-y: scroll;
  padding: 0 20px;
`;

export default Side;
