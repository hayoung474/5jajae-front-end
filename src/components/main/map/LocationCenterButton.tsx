import styled from 'styled-components';
import Location from '~/components/common/icons/Location';
import { flexCenter } from '~/style/mixins';

interface Props {
  onCenterMove: () => void;
}
const LocationCenterButton = ({ onCenterMove }: Props) => {
  return (
    <Wrapper onClick={onCenterMove}>
      <Location color="cool_gray_950"/>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  ${flexCenter};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 8px;
  border-radius: 4px;
  border: solid 1px ${({ theme }) => theme.colors.cool_gray_200};
  cursor: pointer;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
`;

export default LocationCenterButton;
