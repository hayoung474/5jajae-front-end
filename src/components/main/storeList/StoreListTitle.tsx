import styled from 'styled-components';
import Text from '~/components/common/Text';
import TextDivider from '~/components/common/TextDivider';
import { SortType, commonActions, useCommonStore } from '~/store/common';
import { flexBetweenCenter } from '~/style/mixins';

interface Props {
  storesCount?: number;
}
const StoreListTitle = ({ storesCount }: Props) => {
  const sort = useCommonStore((state) => state.sort);

  const handleSortClick = (sort: SortType) => {
    commonActions.setSort(sort);
  };
  return (
    <Wrapper>
      <Title>
        <Text variant="body_1" weight="bold" color="cool_gray_900" className="title">
          자재업체
        </Text>
        <Text variant="body_1" weight="bold" color="violet_600" className="title">
          {storesCount ?? 0}
        </Text>
      </Title>
      <Sort>
        <Text
          variant="label_2"
          color={sort === 'newest' ? 'violet_600' : 'cool_gray_500'}
          weight="medium"
          style={{ cursor: 'pointer' }}
          onClick={() => handleSortClick('newest')}
        >
          최근 등록순
        </Text>
        <TextDivider />
        <Text
          variant="label_2"
          color={sort === 'nearest' ? 'violet_600' : 'cool_gray_500'}
          weight="medium"
          style={{ cursor: 'pointer' }}
          onClick={() => handleSortClick('nearest')}
        >
          가까운 거리순
        </Text>
      </Sort>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${flexBetweenCenter}
  padding:8px 20px;

  margin-top: 24px;
`;

const Title = styled.div`
  display: flex;
  gap: 4px;
`;
const Sort = styled.div`
  display: flex;
  align-items: center;
`;
export default StoreListTitle;
