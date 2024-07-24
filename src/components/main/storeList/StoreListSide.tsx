import styled from 'styled-components';

import SearchSection from '../search/SearchSection';
import StoreListSection from './StoreListSection';
import { StoreListItemType } from '~/api/common/commonService.types';

interface Props {
  stores: StoreListItemType[] | undefined;
  onStoreMarkerActive: (storeId: number) => void;
  activeStoreId?: number;
}
const Side = ({ stores, activeStoreId, onStoreMarkerActive }: Props) => {
  return (
    <Wrapper>
      <SearchSection />
      {stores && (
        <StoreListSection stores={stores} onStoreMarkerActive={onStoreMarkerActive} activeStoreId={activeStoreId} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-sizing: border-box;
  border-right: solid 1px ${({ theme }) => theme.colors.cool_gray_200};
  background-color: ${({ theme }) => theme.colors.white};
  padding-bottom: 120px;
`;

export default Side;
