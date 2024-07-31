import styled from 'styled-components';

import StoreListTitle from './StoreListTitle';
import { StoreListItemType } from '~/api/common/commonService.types';
import StoreListItem from './StoreListItem';

interface Props {
  stores: StoreListItemType[];
  onStoreMarkerActive: (storeId: number) => void;
  activeStoreId?: number;
}
const StoreListSection = ({ stores, activeStoreId, onStoreMarkerActive }: Props) => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default StoreListSection;
