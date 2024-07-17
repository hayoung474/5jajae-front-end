import styled from 'styled-components';

import StoreListTitle from './StoreListTitle';
import { StoreListItemDTO } from '~/api/common/commonService.types';
import StoreListItem from './StoreListItem';

interface Props {
  stores: StoreListItemDTO[];
  onStoreMarkerActive: (storeId: number) => void;
  activeStoreId?: number;
}
const StoreListSection = ({ stores, activeStoreId, onStoreMarkerActive }: Props) => {
  return (
    <Wrapper>
      <StoreListTitle storesCount={stores.length} />
      <StoreListWrapper>
        {stores.map((store) => {
          const uniqueKey = `store-list-item-${store.id}`;
          return (
            <StoreListItem
              key={uniqueKey}
              store={store}
              onStoreMarkerActive={onStoreMarkerActive}
              activeStoreId={activeStoreId}
            />
          );
        })}
      </StoreListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 24px;
`;

const StoreListWrapper = styled.div``;
export default StoreListSection;
