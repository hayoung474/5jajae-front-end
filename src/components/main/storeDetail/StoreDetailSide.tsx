import styled from 'styled-components';
import { flexBetweenCenter } from '~/style/mixins';
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

  const handleShareClick = async () => {
    const text = `https://ojajae.com?storeId=${storeId}`;
    copyText(text);
    snackBarActions.open('링크를 복사하였습니다.\n원하는 곳에 붙여넣기(Ctrl + V) 해주세요.');

    sendDashboardEvent(Number(storeId), 'STORE_SHARE');
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
            <ImageSlide images={storeDetailData.imageUrls.map((image) => image)} />
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
            <StoreInfoDetailItem>
              <Text variant="label_2" weight="bold" color="cool_gray_900" className="label">
                대표자명
              </Text>
              <Text variant="label_2" weight="regular" color="cool_gray_500" className="text-wrapper">
                {storeDetailData.representativeName}
              </Text>
            </StoreInfoDetailItem>
          )}
          <StoreInfoDetailItem>
            <Text variant="label_2" weight="bold" color="cool_gray_900" className="label">
              상세품목
            </Text>
            <Text variant="label_2" weight="regular" color="cool_gray_500" className="text-wrapper">
              {storeDetailData.items}
            </Text>
          </StoreInfoDetailItem>
          {storeDetailData.openingHours && (
            <StoreInfoDetailItem>
              <Text variant="label_2" weight="bold" color="cool_gray_900" className="label">
                영업시간
              </Text>
              <Text variant="label_2" weight="regular" color="cool_gray_500" className="text-wrapper">
                {storeDetailData.openingHours}
              </Text>
            </StoreInfoDetailItem>
          )}
          {storeDetailData.address && (
            <StoreInfoDetailItem>
              <Text variant="label_2" weight="bold" color="cool_gray_900" className="label">
                주소
              </Text>
              <AddressTextItem>
                <Text variant="label_2" weight="regular" color="cool_gray_500" className="text">
                  {storeDetailData.address}
                </Text>
                <div className="copy-button" onClick={() => handleAddressCopyClick(storeDetailData.address)}>
                  <Copy size="16px" color="cool_gray_500" />
                </div>
              </AddressTextItem>
            </StoreInfoDetailItem>
          )}
          {storeDetailData.homepage && (
            <StoreInfoDetailItem>
              <Text variant="label_2" weight="bold" color="cool_gray_900" className="label">
                홈페이지
              </Text>
              <a target="_blank" href={storeDetailData.homepage}>
                {storeDetailData.homepage}
              </a>
            </StoreInfoDetailItem>
          )}
        </StoreInfoDetail>
        <ButtonGroup>
          <IconContainedButton size="large" onClick={handleShareClick}>
            <Share size="20px" />
          </IconContainedButton>
          <ContactButton onClick={handleContactOpen} size="large">
            대표번호 보기
          </ContactButton>
        </ButtonGroup>

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
  .text-container {
    display: flex;
    gap: 4px;
    flex: 1;
  }

  a {
    color: #0068ee;
    ${({ theme }) => theme.fontStyle.label_2}
    ${({ theme }) => theme.fontWeight.medium}
    text-decoration: none;
    text-decoration-line: none;
  }
`;

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
