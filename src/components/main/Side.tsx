import styled from 'styled-components';

import SearchSection from './search/SearchSection';
import StoreListSection from './storeList/StoreListSection';

const Side = () => {
  return (
    <Wrapper>
      <SearchSection />
      <StoreListSection />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow-y: scroll;
  padding: 0 20px;
`;

export default Side;
