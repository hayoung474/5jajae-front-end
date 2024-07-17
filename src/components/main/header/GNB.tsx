import styled from 'styled-components';
import Logo from './Logo';

import { flexBetweenCenter } from '~/style/mixins';
import Text from '~/components/common/Text';
import TextButton from '~/components/common/buttons/TextButton';

const GNB = () => {
  const email = 'ojajaeee@gmail.com';
  return (
    <Wrapper>
      <Logo />
      <TextButton>
        <InquiryLink target="_blank" href={`mailto:${email}`}>
          <Text variant="label_2" weight="medium" color="cool_gray_500">
            문의하기
          </Text>
        </InquiryLink>
      </TextButton>
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

const InquiryLink = styled.a`
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0;
  text-decoration-line: none;
  color:;
`;
export default GNB;
