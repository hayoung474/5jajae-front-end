import styled from 'styled-components';

import StoreListTitle from './StoreListTitle';
import { StoreListItemDTO } from '~/api/common/commonService.types';
import StoreListItem from './StoreListItem';

interface Props {
  stores: StoreListItemDTO[];
  onStoreMarkerActive: (storeId: number) => void;
}
const StoreListSection = ({ stores,onStoreMarkerActive }: Props) => {
  return (
    <Wrapper>
      <StoreListTitle storesCount={stores.length} />
      <StoreListWrapper>
        {stores.map((store) => {
          return <StoreListItem store={store} onStoreMarkerActive={onStoreMarkerActive} />;
        })}
      </StoreListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 120px;
`;

const StoreListWrapper = styled.div``;
export default StoreListSection;
