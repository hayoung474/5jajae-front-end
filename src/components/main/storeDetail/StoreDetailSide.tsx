import styled, { keyframes } from 'styled-components';
import { flexBetweenCenter } from '~/style/mixins';
import IconButton from '../../common/buttons/IconButton';
import { Close } from '../../common/icons';
import Text from '../../common/Text';
import CustomImage from '../../common/CustomImage';
import Badge from '../../common/Badge';
import ContentDivider from '../../common/ContentDivider';
import { useRouter } from 'next/router';
import { useStoreDetailQuery } from '~/query/common/commonQueries';
import { Suspense } from 'react';

const StoreDetailSide = () => {
  const router = useRouter();

  const { storeId } = router.query as { storeId: string };

  const { data: storeDetail } = useStoreDetailQuery({ storeId });

  const handleClose = () => {
    const query = { ...router.query };
    delete query.storeId;
    router.push({ pathname: router.pathname, query });
  };

  return (
    <Wrapper>
      <Suspense fallback={<div>데이터 로딩중!</div>}>
        <Title>
          <Text variant="heading_1" weight="bold" color="cool_gray_900">
            업체 정보
          </Text>
          <IconButton onClick={handleClose} icon={<Close color="cool_gray_950" />} />
        </Title>
        <StoreImageSlide>
          <CustomImage
            width="100%"
            height="208px"
            src="/image/default.png"
            alt="store-image"
            style={{ borderRadius: '8px' }}
          />
        </StoreImageSlide>
        <StoreInfo>
          <BadgeList>
            {storeDetail.itemTags?.map((item) => {
              return <Badge>{item.name}</Badge>;
            })}
          </BadgeList>
          <Text variant="heading_1" weight="bold" color="cool_gray_900">
            {storeDetail.name}
          </Text>
          {storeDetail.descriptions && (
            <Text variant="label_1" weight="regular" color="cool_gray_500">
              {storeDetail.descriptions}
            </Text>
          )}
        </StoreInfo>
        <ContentDivider />
        <StoreInfoDetail>
          {storeDetail.representativeName && (
            <StoreInfoDetailItem>
              <Text variant="label_2" weight="bold" color="cool_gray_900" className="label">
                대표자명
              </Text>
              <Text variant="label_2" weight="regular" color="cool_gray_500" className="text">
                {storeDetail.representativeName}
              </Text>
            </StoreInfoDetailItem>
          )}

          <StoreInfoDetailItem>
            <Text variant="label_2" weight="bold" color="cool_gray_900" className="label">
              상세품목
            </Text>
            <Text variant="label_2" weight="regular" color="cool_gray_500" className="text">
              {storeDetail.itemTags?.map((item) => item.name).join(', ')}
            </Text>
          </StoreInfoDetailItem>
          <StoreInfoDetailItem>
            <Text variant="label_2" weight="bold" color="cool_gray_900" className="label">
              영업시간
            </Text>
            <Text variant="label_2" weight="regular" color="cool_gray_500" className="text">
              07:00 ~ 18:00
            </Text>
          </StoreInfoDetailItem>
          {storeDetail.address && (
            <StoreInfoDetailItem>
              <Text variant="label_2" weight="bold" color="cool_gray_900" className="label">
                주소
              </Text>
              <Text variant="label_2" weight="regular" color="cool_gray_500" className="text">
                {storeDetail.address}
              </Text>
            </StoreInfoDetailItem>
          )}
          {storeDetail.homepage && (
            <StoreInfoDetailItem>
              <Text variant="label_2" weight="bold" color="cool_gray_900" className="label">
                홈페이지
              </Text>
              <a target="_blank" href={storeDetail.homepage}>
                {storeDetail.homepage}
              </a>
            </StoreInfoDetailItem>
          )}
        </StoreInfoDetail>
      </Suspense>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow-y: scroll;

  padding: 24px 20px;
  width: 426px;
  box-sizing: border-box;
  border-right: solid 1px ${({ theme }) => theme.colors.cool_gray_200};
`;

const Title = styled.div`
  ${flexBetweenCenter}
`;

const StoreImageSlide = styled.div`
  margin-top: 20px;
`;

const StoreInfo = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BadgeList = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`;

const StoreInfoDetail = styled.div``;

const StoreInfoDetailItem = styled.div`
  display: flex;
  padding: 8px 0;
  .label {
    width: 88px;
  }
  .text {
  }

  a {
    color: #0068ee;
    ${({ theme }) => theme.fontStyle.label_2}
    ${({ theme }) => theme.fontWeight.medium}
    text-decoration: none;
  }
`;

export default StoreDetailSide;
