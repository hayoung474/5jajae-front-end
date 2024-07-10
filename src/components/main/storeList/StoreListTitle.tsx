import styled from 'styled-components';
import Text from '~/components/common/Text';
import TextDivider from '~/components/common/TextDivider';
import { flexBetweenCenter } from '~/style/mixins';

interface Props {
  storesCount?: number;
}
const StoreListTitle = ({ storesCount }: Props) => {
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
        <Text variant="label_2" color="cool_gray_500" weight="medium" style={{ cursor: 'pointer' }}>
          최근 등록순
        </Text>
        <TextDivider />
        <Text variant="label_2" color="violet_600" weight="medium" style={{ cursor: 'pointer' }}>
          가까운 거리순
        </Text>
      </Sort>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${flexBetweenCenter}
  padding:8px 20px;
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
