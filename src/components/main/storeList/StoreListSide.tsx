import styled from 'styled-components';
import SearchSection from '../search/SearchSection';
import StoreListSection from './StoreListSection';
import { StoreListItemType } from '~/api/store/storeApi.types';

interface Props {
  stores?: StoreListItemType[];
}
const StoreListSide = ({ stores }: Props) => {
  return (
    <Wrapper>
      <SearchSection />
      {stores && <StoreListSection stores={stores} />}
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
