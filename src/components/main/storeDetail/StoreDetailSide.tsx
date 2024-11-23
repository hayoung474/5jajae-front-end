import styled from 'styled-components';
import { flexBetweenCenter, hideScrollBar } from '~/style/mixins';
import IconButton from '../../common/buttons/IconButton';
import { Close, Copy, Share } from '../../common/icons';
import Text from '../../common/Text';
import CustomImage from '../../common/CustomImage';
import Badge from '../../common/Badge';
import ContentDivider from '../../common/ContentDivider';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StoreContactDialog from './StoreContactDialog';
import SolidButton from '~/components/common/buttons/SolidButton';
import IconContainedButton from '~/components/common/buttons/IconContainedButton';
import copyText from '~/lib/copyText';
import ImageSlide from '~/components/common/ImageSlide';
import useDashboard from '../hooks/useDashboard';
import { snackBarActions } from '~/store/snackBar';
import MetaTags from '~/components/meta/MetaTags';
import { useQuery } from '@tanstack/react-query';
import { storeQueries } from '~/queries/storeQueries';
import ButtonGroup from './ButtonGroup';
import StoreInfoDetailItem from './StoreInfoDetailItem';

const StoreDetailSide = () => {
  const router = useRouter();

  const { storeId } = router.query as { storeId: string };

  const { data: storeDetailData, isSuccess } = useQuery({ ...storeQueries.detail({ storeId }) });
  const { sendDashboardEvent } = useDashboard();

  const [contactOpen, setContactOpen] = useState<boolean>(false);

  const handleContactOpen = () => {
    sendDashboardEvent(Number(storeId), 'STORE_CALL');
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

  const handleAddressCopyClick = (address?: string) => {
    if (!address) {
      return;
    }
    copyText(address);
    snackBarActions.open('링크를 복사하였습니다.\n원하는 곳에 붙여넣기(Ctrl + V) 해주세요.');
  };

  useEffect(() => {
    sendDashboardEvent(Number(storeId), 'STORE_COUNT');
  }, []);

  if (!isSuccess) {
    return null;
  }

  return (
    <>
      <MetaTags
        title={storeDetailData.name}
        additionalKeywords={storeDetailData.name}
        imageUrl={storeDetailData.imageUrls?.[0]}
        siteUrl={`https://ojajae.com?storeId=${storeId}`}
      />
      <Wrapper>
        <ContentWrapper>
          <Title>
            <Text variant="heading_1" weight="bold" color="cool_gray_900">
              업체 정보
            </Text>
            <IconButton onClick={handleClose} icon={<Close color="cool_gray_950" />} />
          </Title>
          <StoreImageSlide>
            {storeDetailData.imageUrls.length === 0 && (
              <CustomImage
                width="100%"
                height="208px"
                src="/image/default.png"
                alt="store-image"
                style={{ borderRadius: '8px' }}
              />
            )}
            {storeDetailData.imageUrls.length > 0 && (
              <ImageSlide height="208px" images={storeDetailData.imageUrls.map((image) => image)} />
            )}
          </StoreImageSlide>
          <StoreInfo>
            <BadgeList>
              {storeDetailData.itemTags?.map((item) => {
                return <Badge>{item.name}</Badge>;
              })}
            </BadgeList>
            <Text variant="heading_1" weight="bold" color="cool_gray_900">
              {storeDetailData.name}
            </Text>
            {storeDetailData.descriptions && (
              <Text variant="label_1" weight="regular" color="cool_gray_500">
                {storeDetailData.descriptions}
              </Text>
            )}
          </StoreInfo>
          <ContentDivider />
          <StoreInfoDetail>
            {storeDetailData.representativeName && (
              <StoreInfoDetailItem title="대표자명" label={storeDetailData.representativeName} />
            )}
            <StoreInfoDetailItem title="상세품목" label={storeDetailData.items} />

            {storeDetailData.openingHours && (
              <StoreInfoDetailItem title="영업시간" label={storeDetailData.openingHours} />
            )}
            {storeDetailData.address && (
              <StoreInfoDetailItem
                title="주소"
                label={
                  <AddressTextItem>
                    <Text variant="label_2" weight="regular" color="cool_gray_500" className="text">
                      {storeDetailData.address}
                    </Text>
                    <div className="copy-button" onClick={() => handleAddressCopyClick(storeDetailData.address)}>
                      <Copy size="16px" color="cool_gray_500" />
                    </div>
                  </AddressTextItem>
                }
              />
            )}
            {storeDetailData.homepage && (
              <StoreInfoDetailItem
                title="홈페이지"
                label={
                  <a target="_blank" href={storeDetailData.homepage}>
                    {storeDetailData.homepage}
                  </a>
                }
              />
            )}
          </StoreInfoDetail>
        </ContentWrapper>

        <ButtonGroup storeId={storeId} onContactOpen={handleContactOpen} />

        {storeDetailData.contactNumber && contactOpen && (
          <StoreContactDialog
            name={storeDetailData.name}
            address={storeDetailData.address}
            contactNumber={storeDetailData.contactNumber}
            onContactClose={handleContactClose}
          />
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;

  padding: 24px 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-right: solid 1px ${({ theme }) => theme.colors.cool_gray_200};
  background-color: ${({ theme }) => theme.colors.white};
`;

const ContentWrapper = styled.div`
  overflow-y: scroll;
  ${hideScrollBar}
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

const AddressTextItem = styled.div`
  display: flex;
  flex: 1;
  gap: 4px;
  align-items: center;
  .text {
    flex: 1;
  }
  .copy-button {
    cursor: pointer;
  }
`;

export default StoreDetailSide;
