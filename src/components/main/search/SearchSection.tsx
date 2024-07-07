import styled from 'styled-components';
import SearchBar from './SearchBar';
import Text from '~/components/common/Text';
import TextDivider from '~/components/common/TextDivider';
import { Pin } from '~/components/common/icons';
import { flexBetweenCenter } from '~/style/mixins';

const SearchSection = () => {
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
      <SearchResult>
        <div className="address">
          <Text variant="label_2" weight="medium" color="violet_600">
            '서울특별시 중랑구 망우로'
          </Text>
          <Text variant="label_2" weight="regular" color="cool_gray_500">
            {' '}
            의 검색결과
          </Text>
        </div>
        <Text variant="label_2" weight="medium" color="cool_gray_500">
          주소 초기화
        </Text>
      </SearchResult>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 24px;
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
  background-color: ${({ theme }) => theme.colors.cool_gray_50};
  border-radius: 8px;
  padding: 10px 12px;
  .address {
    display: flex;
  }
`;

export default SearchSection;