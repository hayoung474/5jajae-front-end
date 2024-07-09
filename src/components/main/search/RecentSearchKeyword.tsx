import styled from 'styled-components';
import Text from '~/components/common/Text';
import IconButton from '~/components/common/buttons/IconButton';
import { Close, Pin } from '~/components/common/icons';
import { flexBetweenCenter, flexCenter } from '~/style/mixins';

const RecentSearchKeyword = () => {
  return (
    <Wrapper>
      <Title>
        <Text variant="body_1" color="cool_gray_900" weight="bold">
          최근 검색
        </Text>
        <Text variant="label_2" color="cool_gray_500" weight="medium">
          전체삭제
        </Text>
      </Title>
      <KeywordList>
        <KeywordListEmpty>
          <Text variant="label_1" color="cool_gray_500" weight="regular">
            최근 검색한 내역이 없습니다.
          </Text>
        </KeywordListEmpty>
        {/* <KeywordListItem>
          <Pin size="20px" color="cool_gray_500" />
          <Text variant="label_1" color="cool_gray_950" weight="regular" className="keyword" truncateLines={1}>
            서울 금천구 가산디지털2로 127-20000
          </Text>
          <IconButton icon={<Close size="16px" color="cool_gray_400" />} />
        </KeywordListItem> */}
      </KeywordList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  z-index: 2;
  position: absolute;
  padding: 16px 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.white};
  border: solid 1px ${({ theme }) => theme.colors.cool_gray_200};
  border-radius: 8px;

  width: 100%;

  top: 42px;
  transition: 0.2s;
`;

const Title = styled.div`
  ${flexBetweenCenter}

  padding: 8px 20px;
`;

const KeywordList = styled.div`
  max-height: 252px;
  overflow: scroll;
`;
const KeywordListItem = styled.div`
  display: flex;
  align-items: center;

  padding: 11px 20px;

  gap: 4px;
  .keyword {
    flex: 1;
    padding-right: 4px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.cool_gray_50};
    cursor: pointer;
  }
`;

const KeywordListEmpty = styled.div`
  ${flexCenter};
  padding: 20px 0;
`;
export default RecentSearchKeyword;
