import styled from 'styled-components';

import SearchSection from '../search/SearchSection';
import StoreListSection from './StoreListSection';
import { StoreListItemDTO } from '~/api/common/commonService.types';

interface Props {
  stores: StoreListItemDTO[];
  onStoreMarkerActive: (storeId: number) => void;
  activeStoreId?: number;
}
const Side = ({ stores, activeStoreId,onStoreMarkerActive }: Props) => {
  return (
    <Wrapper>
      <SearchSection />
      <StoreListSection stores={stores} onStoreMarkerActive={onStoreMarkerActive} activeStoreId={activeStoreId}/>
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
