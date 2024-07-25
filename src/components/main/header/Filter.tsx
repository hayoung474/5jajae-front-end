import styled from 'styled-components';
import ChipToggleFilter from '../../common/filter/ChipToggleFilter';
import { useItemTagsQuery } from '~/query/common/commonQueries';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Filter = () => {
  const router = useRouter();
  const { itemTagIds } = router.query as { itemTagIds: string };
  const { data: itemTags, isSuccess } = useItemTagsQuery();

  const [selectedFilter, setSelectedFilter] = useState<Set<number>>(new Set());

  const handleFilterToggle = (itemTagId: number) => {
    if (selectedFilter.has(itemTagId)) {
      setSelectedFilter((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemTagId);
        return newSet;
      });
    } else {
      setSelectedFilter((prev) => {
        const newSet = new Set(prev);
        newSet.add(itemTagId);
        return newSet;
      });
    }
  };

  const handleFilterToggleAll = () => {
    if (selectedFilter.size !== 0) {
      setSelectedFilter(new Set());
    }
  };

  useEffect(() => {
    if (router.isReady && itemTagIds) {
      const newSet = new Set<number>();
      const parsedItemTagIds = itemTagIds.split(',');

      parsedItemTagIds.forEach((itemTagId) => {
        newSet.add(Number(itemTagId));
      });
      setSelectedFilter(newSet);
    }
  }, [router.isReady]);

  useEffect(() => {
    const newItemTagIds = Array.from(selectedFilter).join(',');
    if (newItemTagIds) {
      router.replace({ pathname: router.pathname, query: { ...router.query, itemTagIds: newItemTagIds } });
    }
  }, [selectedFilter]);

  return (
    <Wrapper>
      <ChipToggleFilter name="전체" filterActive={selectedFilter.size === 0} onClick={handleFilterToggleAll} />
      {isSuccess &&
        itemTags.map((itemTag) => {
          const uniqueKey = `item-tag-${itemTag.id}`;
          return (
            <ChipToggleFilter
              key={uniqueKey}
              name={itemTag.name}
              iconSrc={itemTag.imageUrl}
              onClick={() => handleFilterToggle(itemTag.id)}
              filterActive={selectedFilter.has(itemTag.id)}
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
