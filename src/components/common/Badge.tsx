import styled from 'styled-components';
import Text from './Text';

const Badge = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Wrapper>
      <Text variant="caption_2" weight="medium" color="cool_gray_500">
        {children}
      </Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.cool_gray_100};
  border-radius: 4px;
  padding: 4px 6px;
  white-space: nowrap;
`;

export default Badge;
