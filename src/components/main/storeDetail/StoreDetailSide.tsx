import styled, { keyframes } from 'styled-components';
import { flexBetweenCenter } from '~/style/mixins';
import IconButton from '../../common/buttons/IconButton';
import { Close, Share } from '../../common/icons';
import Text from '../../common/Text';
import CustomImage from '../../common/CustomImage';
import Badge from '../../common/Badge';
import ContentDivider from '../../common/ContentDivider';
import { useRouter } from 'next/router';
import { useStoreDetailQuery } from '~/query/common/commonQueries';
import { Suspense, useState } from 'react';
import StoreContactDialog from './StoreContactDialog';
import SolidButton from '~/components/common/buttons/SolidButton';
import IconContainedButton from '~/components/common/buttons/IconContainedButton';

const StoreDetailSide = () => {
  const router = useRouter();

  const { storeId } = router.query as { storeId: string };

  const { data: storeDetail, isSuccess } = useStoreDetailQuery({ storeId });

  const [contactOpen, setContactOpen] = useState<boolean>(false);

  const handleContactOpen = () => {
    setContactOpen(true);
  };
  const handleContactClose = () => {
    setContactOpen(false);
  };
  const handleClose = () => {
    const query = { ...router.query };
    delete query.storeId;
    router.push({ pathname: router.pathname, query });
  };

  if (!isSuccess) {
    return null;
  }

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
        <ButtonGroup>
          <IconContainedButton size="large">
            <Share size="20px" />
          </IconContainedButton>
          <ContactButton onClick={handleContactOpen} size="large">
            대표번호 보기
          </ContactButton>
        </ButtonGroup>

        {storeDetail.contactNumber && contactOpen && (
          <StoreContactDialog
            name={storeDetail.name}
            address={storeDetail.address}
            contactNumber={storeDetail.contactNumber}
            onContactClose={handleContactClose}
          />
        )}
      </Suspense>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
  position: absolute;
  box-sizing: border-box;

  width: 100%;

  padding: 24px 20px;
  bottom: 0;
  left: 0px;
`;
const ContactButton = styled(SolidButton)`
  width: 100%;
`;

export default StoreDetailSide;
