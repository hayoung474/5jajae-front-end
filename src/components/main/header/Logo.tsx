import { useRouter } from 'next/router';
import styled from 'styled-components';

const Logo = () => {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push('/');
  };
  return <LogoImg src="/image/logo.png" alt="오늘자재 로고 아이콘" onClick={handleLogoClick} />;
};

const LogoImg = styled.img`
  width: 100px;
  &:hover {
    cursor: pointer;
  }
`;

export default Logo;
