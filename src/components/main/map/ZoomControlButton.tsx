import styled from 'styled-components';
import Minus from '~/components/common/icons/Minus';
import Plus from '~/components/common/icons/Plus';
import { flexCenter } from '~/style/mixins';

interface Props {
  onZoomIn: () => void;
  onZoomOut: () => void;
}
const ZoomControlButton = ({ onZoomIn, onZoomOut }: Props) => {
  return (
    <Wrapper>
      <PlusButton onClick={onZoomIn}>
        <Plus color="cool_gray_950" />
      </PlusButton>
      <MinusButton onClick={onZoomOut}>
        <Minus color="cool_gray_950" />
      </MinusButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border: solid 1px ${({ theme }) => theme.colors.cool_gray_200};
  border-radius: 4px;
`;

const ZoomButton = styled.button`
  ${flexCenter};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 12px;
  cursor: pointer;
  border-top: solid 1px red;
  border: none;
  overflow: hidden;
`;

const PlusButton = styled(ZoomButton)`
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;

const MinusButton = styled(ZoomButton)`
  border-top: solid 1px ${({ theme }) => theme.colors.cool_gray_200};
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;
export default ZoomControlButton;
