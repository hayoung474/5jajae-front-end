import styled from 'styled-components';

const ContentDivider = () => {
  return <Wrapper></Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.cool_gray_200};
  margin: 20px 0;
`;

export default ContentDivider;
