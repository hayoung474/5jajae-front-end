import styled, { css } from 'styled-components';
import { StoreListItemType } from '~/api/common/commonService.types';
import StoreListItem from './StoreListItem';
import { useIsScrolled } from '~/hooks/useIsScrolled';
import { useRef } from 'react';

interface Props {
  stores: StoreListItemType[];
  onStoreMarkerActive: (storeId: number) => void;
  activeStoreId?: number;
}
const StoreListSection = ({ stores, activeStoreId, onStoreMarkerActive }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const isScrolled = useIsScrolled(ref);

  return (
    <Wrapper ref={ref} $isScrolled={isScrolled}>
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

const Wrapper = styled.div<{ $isScrolled: boolean }>`
  flex: 1;
  padding-bottom: 120px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none; /* 스크롤바를 숨깁니다 */
  }
  scrollbar-width: none; /* 스크롤바 너비를 없앱니다 */
  -ms-overflow-style: none; /* Internet Explorer 및 Edge(구버전)에서 스크롤바를 숨깁니다 */


  ${({ $isScrolled, theme }) =>
    $isScrolled &&
    css`
      border-top: solid 1px ${theme.colors.cool_gray_200};
    `}
`;

export default StoreListSection;
