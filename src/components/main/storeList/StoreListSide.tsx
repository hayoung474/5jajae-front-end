import styled from 'styled-components';

import SearchSection from '../search/SearchSection';
import StoreListSection from './StoreListSection';
import { StoreListItemType } from '~/api/common/commonService.types';
import StoreListTitle from './StoreListTitle';

interface Props {
  stores: StoreListItemType[] | undefined;
  onStoreMarkerActive: (storeId: number) => void;
  activeStoreId?: number;
}
const Side = ({ stores, activeStoreId, onStoreMarkerActive }: Props) => {
  return (
    <Wrapper>
      <FixedSection>
        <SearchSection />
        {stores && <StoreListTitle storesCount={stores.length} />}
      </FixedSection>

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

const FixedSection = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  position: sticky;
  top: 0;
  z-index: 2;
`;
export default Side;
