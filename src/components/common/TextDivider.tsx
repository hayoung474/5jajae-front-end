import styled from 'styled-components';

const TextDivider = () => {
  return <Wrapper></Wrapper>;
};

const Wrapper = styled.div`
  width: 1px;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.cool_gray_200};
  margin: 0 4px;
`;

export default TextDivider;
