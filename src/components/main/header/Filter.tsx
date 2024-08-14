import styled from 'styled-components';
import ChipToggleFilter from '../../common/filter/ChipToggleFilter';
import { useItemTagsQuery } from '~/query/common/commonQueries';
import { useRouter } from 'next/router';

const Filter = () => {
  const router = useRouter();
  const { itemTagId } = router.query as { itemTagId: string };
  const { data: itemTags, isSuccess } = useItemTagsQuery();

  const handleFilterActive = (itemTagId: number) => {
    router.replace({ pathname: router.pathname, query: { ...router.query, itemTagId } });
  };
  const handleFilterToggleAll = () => {
    if (itemTagId) {
      const query = { ...router.query };
      delete query.itemTagId;
      router.replace({ pathname: router.pathname, query });
    }
  };

  return (
    <Wrapper>
      <ChipToggleFilter name="전체" filterActive={!itemTagId} onClick={handleFilterToggleAll} />
      {isSuccess &&
        itemTags.map((itemTag) => {
          const uniqueKey = `item-tag-${itemTag.id}`;
          return (
            <ChipToggleFilter
              key={uniqueKey}
              name={itemTag.name}
              iconSrc={itemTag.imageUrl}
              onClick={() => handleFilterActive(itemTag.id)}
              filterActive={itemTagId === `${itemTag.id}`}
            />
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  box-sizing: border-box;
  padding: 0 32px;
  width: 100%;
  flex-wrap: wrap;
  overflow-x: scroll;
  height: 72px;

  border-bottom: solid 1px ${({ theme }) => theme.colors.cool_gray_200};

  &::-webkit-scrollbar {
    display: none; /* 스크롤바를 숨깁니다 */
  }
  scrollbar-width: none; /* 스크롤바 너비를 없앱니다 */
  -ms-overflow-style: none; /* Internet Explorer 및 Edge(구버전)에서 스크롤바를 숨깁니다 */
`;

export default Filter;
