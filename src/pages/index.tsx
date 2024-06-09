import { styled } from 'styled-components';

export default function Home() {
  return <Title>hello world!</Title>;
}

const Title = styled.div`
  ${({ theme }) => theme.fontStyle.title_1}
`;
