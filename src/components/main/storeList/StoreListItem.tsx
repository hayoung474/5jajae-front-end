import styled from 'styled-components';
import Badge from '~/components/common/Badge';
import CustomImage from '~/components/common/CustomImage';
import Text from '~/components/common/Text';
import { Pin } from '~/components/common/icons';

const StoreListItem = () => {
  return (
    <Wrapper>
      <CustomImage width="136px" height="136px" src="/image/default.png" alt="store-image" />
      <ContentWrapper>
        <BadgeList>
          <Badge>목자재</Badge>
          <Badge>경량자재</Badge>
        </BadgeList>
        <Text variant="body_1" weight="bold" color="cool_gray_900">
          우리우드
        </Text>
        <Text variant="label_2" weight="regular" color="cool_gray_500">
          인테리어자재, 특수목, 핸드레일, 손스침, 계단판, 회전계단판, 라왕 등
        </Text>
        <Address>
          <Pin color="cool_gray_300" />
          <Text variant="caption_2" weight="medium" color="cool_gray_500">
            서울특별시 중랑구 망우로 32길 37
          </Text>
        </Address>
        <Distance>
          <Text variant="caption_2" weight="medium" color="cool_gray_500">
            거리
          </Text>
          <Text variant="caption_2" weight="bold" color="cool_gray_500">
            100m
          </Text>
        </Distance>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 8px 0;

  display: flex;
  gap: 16px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const BadgeList = styled.div`
  display: flex;
  gap: 4px;
`;

const Address = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const Distance = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;
export default StoreListItem;
