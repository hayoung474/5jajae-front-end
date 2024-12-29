import styled from 'styled-components';
import StoreListItem from './StoreListItem';
import { useIsScrolled } from '~/hooks/useIsScrolled';
import { useRef } from 'react';
import StoreListHeader from './StoreListHeader';
import { StoreListItemType } from '~/api/store/storeApi.types';

interface Props {
  stores: StoreListItemType[];
}
const StoreListSection = ({ stores }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isScrolled = useIsScrolled(ref);

  return (
    <Wrapper>
      <StoreListHeader storesCount={stores.length} isScrolled={isScrolled} />
      <StoreListWrapper ref={ref}>
        {stores.map((store) => {
          const uniqueKey = `store-list-item-${store.id}`;
          return <StoreListItem key={uniqueKey} store={store} />;
        })}
      </StoreListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const StoreListWrapper = styled.div`
  padding-bottom: 120px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export default StoreListSection;
