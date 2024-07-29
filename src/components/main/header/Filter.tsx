import styled from 'styled-components';
import ChipToggleFilter from '../../common/filter/ChipToggleFilter';
import { useItemTagsQuery } from '~/query/common/commonQueries';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Filter = () => {
  const router = useRouter();
  const { itemTagId } = router.query as { itemTagId: string };
  const { data: itemTags, isSuccess } = useItemTagsQuery();

  const [selectedFilter, setSelectedFilter] = useState<number>();

  // const handleFilterToggle = (itemTagId: number) => {
  // if (selectedFilter.has(itemTagId)) {
  //   setSelectedFilter((prev) => {
  //     const newSet = new Set(prev);
  //     newSet.delete(itemTagId);
  //     return newSet;
  //   });
  // } else {
  //   setSelectedFilter((prev) => {
  //     const newSet = new Set(prev);
  //     newSet.add(itemTagId);
  //     return newSet;
  //   });
  // }
  // };

  const handleFilterActive = (itemTagId: number) => {
    setSelectedFilter(itemTagId);
  };
  const handleFilterToggleAll = () => {
    if (selectedFilter) {
      setSelectedFilter(undefined);
    }
    // if (selectedFilter.size !== 0) {
    //   setSelectedFilter(new Set());
    // }
  };

  useEffect(() => {
    if (router.isReady && itemTagId) {
      // const newSet = new Set<number>();
      // const parsedItemTagIds = itemTagIds.split(',');

      // parsedItemTagIds.forEach((itemTagId) => {
      // newSet.add(Number(itemTagId));
      // });
      setSelectedFilter(Number(itemTagId));
    }
  }, [router.isReady]);

  useEffect(() => {
    // const newItemTagIds = Array.from(selectedFilter).join(',');
    router.replace({ pathname: router.pathname, query: { ...router.query, itemTagId: selectedFilter } });
  }, [selectedFilter]);

  return (
    <Wrapper>
      <ChipToggleFilter name="전체" filterActive={!selectedFilter} onClick={handleFilterToggleAll} />
      {isSuccess &&
        itemTags.map((itemTag) => {
          const uniqueKey = `item-tag-${itemTag.id}`;
          return (
            <ChipToggleFilter
              key={uniqueKey}
              name={itemTag.name}
              iconSrc={itemTag.imageUrl}
              onClick={() => handleFilterActive(itemTag.id)}
              filterActive={selectedFilter === itemTag.id}
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
`;

export default Filter;
