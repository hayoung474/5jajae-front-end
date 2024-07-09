import styled, { keyframes } from 'styled-components';
import { flexBetweenCenter } from '~/style/mixins';
import IconButton from '../../common/buttons/IconButton';
import { Close } from '../../common/icons';
import Text from '../../common/Text';
import CustomImage from '../../common/CustomImage';
import Badge from '../../common/Badge';
import ContentDivider from '../../common/ContentDivider';
import { useRouter } from 'next/router';

const StoreDetailSide = () => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };
  return (
    <Wrapper>
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
          <Badge>목자재</Badge>
          <Badge>경량자재</Badge>
        </BadgeList>
        <Text variant="heading_1" weight="bold" color="cool_gray_900">
          우리우드
        </Text>
        <Text variant="label_1" weight="regular" color="cool_gray_500">
          인테리어자재, 특수목, 핸드레일, 손스침, 계단판, 회전계단판, 라왕 등 인테리어자재, 특수목, 핸드레일, 손스침,
          여기서는 2줄 이상 보여도 괜찮겠네요~, 손스침, 계단판, 회전계단판, 라왕 등
        </Text>
      </StoreInfo>
      <ContentDivider />
      <StoreInfoDetail>
        <StoreInfoDetailItem>
          <Text variant="label_2" weight="bold" color="cool_gray_900" className="label">
            대표자명
          </Text>
          <Text variant="label_2" weight="regular" color="cool_gray_500" className="text">
            홍길동
          </Text>
        </StoreInfoDetailItem>
        <StoreInfoDetailItem>
          <Text variant="label_2" weight="bold" color="cool_gray_900" className="label">
            상세품목
          </Text>
          <Text variant="label_2" weight="regular" color="cool_gray_500" className="text">
            타일, 마루
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
        <StoreInfoDetailItem>
          <Text variant="label_2" weight="bold" color="cool_gray_900" className="label">
            주소
          </Text>
          <Text variant="label_2" weight="regular" color="cool_gray_500" className="text">
            서울특별시 중랑구 망우로 32길 37
          </Text>
        </StoreInfoDetailItem>
        <StoreInfoDetailItem>
          <Text variant="label_2" weight="bold" color="cool_gray_900" className="label">
            홈페이지
          </Text>
          <a target="_blank" href="http://wooriwood.com/">
            http://wooriwood.com/
          </a>
        </StoreInfoDetailItem>
      </StoreInfoDetail>
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
