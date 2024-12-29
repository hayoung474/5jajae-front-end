import styled, { css } from 'styled-components';
import Text from '~/components/common/Text';
import TextDivider from '~/components/common/TextDivider';
import { commonActions, useCommonStore } from '~/store/common';
import { flexBetweenCenter } from '~/style/mixins';

interface Props {
  storesCount?: number;
  isScrolled: boolean;
}
const StoreListHeader = ({ storesCount, isScrolled }: Props) => {
  const sort = useCommonStore((state) => state.sort);

  const handleSortClick = (sort: SortType) => {
    commonActions.setSort(sort);
  };
  return (
    <Wrapper $isScrolled={isScrolled}>
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
          color={sort === 'LATEST' ? 'violet_600' : 'cool_gray_500'}
          weight="medium"
          style={{ cursor: 'pointer' }}
          onClick={() => handleSortClick('LATEST')}
        >
          최근 등록순
        </Text>
        <TextDivider />
        <Text
          variant="label_2"
          color={sort === 'DISTANCE' ? 'violet_600' : 'cool_gray_500'}
          weight="medium"
          style={{ cursor: 'pointer' }}
          onClick={() => handleSortClick('DISTANCE')}
        >
          가까운 거리순
        </Text>
      </Sort>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $isScrolled: boolean }>`
  ${flexBetweenCenter}
  padding:8px 20px;

  margin-top: 24px;

  ${({ $isScrolled, theme }) =>
    $isScrolled &&
    css`
      border-bottom: solid 1px ${theme.colors.cool_gray_200};
    `}
`;

const Title = styled.div`
  display: flex;
  gap: 4px;
`;
const Sort = styled.div`
  display: flex;
  align-items: center;
`;
export default StoreListHeader;
