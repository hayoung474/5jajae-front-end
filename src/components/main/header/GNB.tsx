import styled from 'styled-components';
import Logo from './Logo';

import { flexBetweenCenter } from '~/style/mixins';
import Text from '~/components/common/Text';

const GNB = () => {
  const handleInquiryClick = () => {
    window.alert('문의하기 클릭!');
  };

  return (
    <Wrapper>
      <Logo />
      <Text
        variant="label_2"
        weight="medium"
        color="cool_gray_500"
        onClick={handleInquiryClick}
        style={{ cursor: 'pointer' }}
      >
        문의하기
      </Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${flexBetweenCenter}
  box-sizing:border-box;
  padding: 0 32px;
  width: 100%;
  height: 72px;

  border-bottom: solid 1px ${({ theme }) => theme.colors.cool_gray_200};
`;

export default GNB;
