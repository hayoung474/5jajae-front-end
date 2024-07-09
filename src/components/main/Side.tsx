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
  z-index: 2;
  overflow-y: scroll;
  /* padding: 0 20px; */
  width: 426px;
  box-sizing: border-box;
  border-right: solid 1px ${({ theme }) => theme.colors.cool_gray_200};
`;

export default Side;
