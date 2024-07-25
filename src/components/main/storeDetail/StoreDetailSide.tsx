import styled from 'styled-components';
import { flexBetweenCenter } from '~/style/mixins';
import IconButton from '../../common/buttons/IconButton';
import { Close, Copy, Share } from '../../common/icons';
import Text from '../../common/Text';
import CustomImage from '../../common/CustomImage';
import Badge from '../../common/Badge';
import ContentDivider from '../../common/ContentDivider';
import { useRouter } from 'next/router';
import { useDashboardMutation, useStoreDetailQuery } from '~/query/common/commonQueries';
import { useState } from 'react';
import StoreContactDialog from './StoreContactDialog';
import SolidButton from '~/components/common/buttons/SolidButton';
import IconContainedButton from '~/components/common/buttons/IconContainedButton';
import StoreShareInfo from './StoreShareInfo';
import copyText from '~/lib/copyText';
import ImageSlide from '~/components/common/ImageSlide';
import { CreateCommonDashboardPayload } from '~/api/common/commonService.types';
import useDashboard from '../hooks/useDashboard';

const StoreDetailSide = () => {
  const router = useRouter();

  const { storeId } = router.query as { storeId: string };

  const { data: storeDetail, isSuccess } = useStoreDetailQuery({ storeId });
  const { sendDashboardEvent } = useDashboard();

  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [shareOpen, setShareOpen] = useState<boolean>(false);

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
    setShareOpen(true);

    sendDashboardEvent(Number(storeId), 'STORE_SHARE');
  };

  const handleAddressCopyClick = (address?: string) => {
    if (!address) {
      return;
    }
    copyText(address);
    alert('업체 주소가 복사되었습니다!');
  };
  const handleShareClose = () => {
    setShareOpen(false);
  };

  if (!isSuccess) {
    return null;
  }

  return (
    <Wrapper>
      <Title>
        <Text variant="heading_1" weight="bold" color="cool_gray_900">
          업체 정보
        </Text>
        <IconButton onClick={handleClose} icon={<Close color="cool_gray_950" />} />
      </Title>
      <StoreImageSlide>
        {storeDetail.imageUrls.length === 0 && (
          <CustomImage
            width="100%"
            height="208px"
            src="/image/default.png"
            alt="store-image"
            style={{ borderRadius: '8px' }}
          />
        )}
        {storeDetail.imageUrls.length > 0 && (
          <ImageSlide images={storeDetail.imageUrls.map((image) => image.imageUrl)} />
        )}
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
            <Text variant="label_2" weight="regular" color="cool_gray_500" className="text-wrapper">
              {storeDetail.representativeName}
            </Text>
          </StoreInfoDetailItem>
        )}
        <StoreInfoDetailItem>
          <Text variant="label_2" weight="bold" color="cool_gray_900" className="label">
            상세품목
          </Text>
          <Text variant="label_2" weight="regular" color="cool_gray_500" className="text-wrapper">
            {storeDetail.items}
          </Text>
        </StoreInfoDetailItem>
        {storeDetail.openingHours && (
          <StoreInfoDetailItem>
            <Text variant="label_2" weight="bold" color="cool_gray_900" className="label">
              영업시간
            </Text>
            <Text variant="label_2" weight="regular" color="cool_gray_500" className="text-wrapper">
              {storeDetail.openingHours}
            </Text>
          </StoreInfoDetailItem>
        )}
        {storeDetail.address && (
          <StoreInfoDetailItem>
            <Text variant="label_2" weight="bold" color="cool_gray_900" className="label">
              주소
            </Text>
            <AddressTextItem>
              <Text variant="label_2" weight="regular" color="cool_gray_500" className="text">
                {storeDetail.address}
              </Text>
              <div className="copy-button" onClick={() => handleAddressCopyClick(storeDetail.address)}>
                <Copy size="16px" color="cool_gray_500" />
              </div>
            </AddressTextItem>
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
        <IconContainedButton size="large" onClick={handleShareClick}>
          <Share size="20px" />
        </IconContainedButton>
        <ContactButton onClick={handleContactOpen} size="large">
          대표번호 보기
        </ContactButton>
        {shareOpen && <StoreShareInfo onShareClose={handleShareClose} />}
      </ButtonGroup>

      {storeDetail.contactNumber && contactOpen && (
        <StoreContactDialog
          name={storeDetail.name}
          address={storeDetail.address}
          contactNumber={storeDetail.contactNumber}
          onContactClose={handleContactClose}
        />
      )}
    </Wrapper>
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
