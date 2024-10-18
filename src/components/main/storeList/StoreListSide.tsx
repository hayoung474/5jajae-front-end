import styled from 'styled-components';
import SearchSection from '../search/SearchSection';
import StoreListSection from './StoreListSection';
import { StoreListItemType } from '~/api/common/commonApi.types';
import StoreListTitle from './StoreListTitle';

interface Props {
  stores?: StoreListItemType[];
  onStoreMarkerActive: (storeId: number) => void;
  activeStoreId?: number;
}
const StoreListSide = ({ stores, activeStoreId, onStoreMarkerActive }: Props) => {
  return (
    <Wrapper>
      <div>
        <SearchSection />
        {stores && <StoreListTitle storesCount={stores.length} />}
      </div>

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

  display: flex;
  flex-direction: column;

  height: 100%;
`;

export default StoreListSide;
