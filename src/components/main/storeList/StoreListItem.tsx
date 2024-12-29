import { useRouter } from 'next/router';
import { useRef } from 'react';
import styled from 'styled-components';
import { StoreListItemType } from '~/api/store/storeApi.types';
import Badge from '~/components/common/Badge';
import CustomImage from '~/components/common/CustomImage';
import Text from '~/components/common/Text';
import { Pin } from '~/components/common/icons';
import { meterToKilometer } from '~/lib';

interface Props {
  store: StoreListItemType;
}
const StoreListItem = ({ store }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleClick = () => {
    router.push({ pathname: router.pathname, query: { ...router.query, storeId: store.id } });
  };

  return (
    <Wrapper onClick={handleClick} ref={ref}>
      <CustomImage
        width="136px"
        height="136px"
        src={store.thumbnailImage || '/image/default.png'}
        alt="store-image"
        style={{ borderRadius: '4px' }}
      />
      <ContentWrapper>
        <BadgeList>
          {store.itemTags?.map((item) => {
            const uniqueKey = `store-item-tag-${item.id}`;
            return <Badge key={uniqueKey}>{item.name}</Badge>;
          })}
        </BadgeList>

        <Text variant="body_1" weight="bold" color="cool_gray_900">
          {store.name}
        </Text>
        {store.descriptions && (
          <Text variant="label_2" weight="regular" color="cool_gray_500" truncateLines={2}>
            {store.descriptions}
          </Text>
        )}
        {store.address && (
          <Address>
            <Pin color="cool_gray_300" />
            <Text variant="caption_2" weight="medium" color="cool_gray_500">
              {store.address}
            </Text>
          </Address>
        )}

        <Distance>
          <Text variant="caption_2" weight="medium" color="cool_gray_500">
            거리
          </Text>
          <Text variant="caption_2" weight="bold" color="cool_gray_500">
            {meterToKilometer(store.distance)}
          </Text>
        </Distance>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 8px 20px;
  display: flex;
  gap: 16px;
  background-color: ${({ theme }) => theme.colors.white};

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.cool_gray_50};
  }
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
  flex-wrap: wrap;
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
