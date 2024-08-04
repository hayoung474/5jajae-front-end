import styled from 'styled-components';
import SearchBar from './SearchBar';
import Text from '~/components/common/Text';
import TextDivider from '~/components/common/TextDivider';
import { Pin } from '~/components/common/icons';
import { flexBetweenCenter, flexCenter } from '~/style/mixins';
import TextButton from '~/components/common/buttons/TextButton';
import { commonActions, useCommonStore } from '~/store/common';
import Refresh from '~/components/common/icons/Refresh';

const SearchSection = () => {
  const addressInfo = useCommonStore((state) => state.addressInfo);

  const handleAddressReset = () => {
    commonActions.resetAddress();
  };
  return (
    <Wrapper>
      <Text variant="body_1" weight="bold" color="cool_gray_900" className="title">
        현장 주소
      </Text>
      <SearchBar />
      <ServiceInfo>
        <Pin size="16px" color="cool_gray_400" />
        <Text variant="caption_2" color="cool_gray_500" weight="medium" className="info">
          서비스 가능 지역
        </Text>
        <TextDivider />
        <Text variant="caption_2" color="cool_gray_500" weight="medium">
          서울시
        </Text>
      </ServiceInfo>
      {addressInfo && (
        <SearchResult>
          <div className="address">
            <Text variant="label_2" weight="medium" color="violet_600" className="address-content" truncateLines={2}>
              '{addressInfo.address}'
            </Text>
            <Text variant="label_2" weight="regular" color="cool_gray_500" className="address-result">
              의 검색결과
            </Text>
          </div>
          <TextButton
            onClick={handleAddressReset}
            className="address-reset-button"
            icon={<Refresh size="16px" color="cool_gray_500" />}
          >
            주소 초기화
          </TextButton>
        </SearchResult>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 24px 20px 0px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  .title {
    margin-bottom: 8px;
  }
`;

const ServiceInfo = styled.div`
  display: flex;
  align-items: center;
  .info {
    margin-left: 2px;
  }
`;

const SearchResult = styled.div`
  ${flexBetweenCenter}
  gap:8px;
  background-color: ${({ theme }) => theme.colors.cool_gray_50};
  border-radius: 8px;
  padding: 10px 12px;
  .address {
    display: flex;
    align-items: center;
    /* display: flex; */
    /* align-items: center; */
    /* flex: 1; */
    /* gap: 2px; */
    .address-result {
      flex-shrink: 0;
      margin-left: 2px;
    }
  }
  .address-reset-button {
    flex-shrink: 0;
  }
`;

export default SearchSection;
