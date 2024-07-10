import styled from 'styled-components';
import ChipToggleFilter from '../../common/filter/ChipToggleFilter';
import { useItemTagsQuery } from '~/query/common/commonQueries';
import { useEffect, useState } from 'react';

const Filter = () => {
  const { data: itemTags, isSuccess } = useItemTagsQuery();
  const [selectedFilter, setSelectedFilter] = useState<number[]>();

  return (
    <Wrapper>
      <ChipToggleFilter name="전체" filterActive />
      {isSuccess &&
        itemTags.map((itemTag) => {
          const uniqueKey = `item-tag-${itemTag.id}`;
          return <ChipToggleFilter key={uniqueKey} name={itemTag.name} />;
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
