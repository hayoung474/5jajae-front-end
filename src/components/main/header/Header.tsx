import styled from 'styled-components';
import GNB from './GNB';
import Filter from './Filter';

const Header = () => {
  return (
    <Wrapper>
      <GNB />
      <Filter />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Header;
