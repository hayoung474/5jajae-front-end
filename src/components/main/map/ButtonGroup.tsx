import styled from 'styled-components';
import LocationCenterButton from './LocationCenterButton';
import ZoomControlButton from './ZoomControlButton';

interface Props {
  onCenterMove: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}
const ButtonGroup = ({ onCenterMove, onZoomIn, onZoomOut }: Props) => {
  return (
    <Wrapper>
      <LocationCenterButton onCenterMove={onCenterMove} />
      <ZoomControlButton onZoomIn={onZoomIn} onZoomOut={onZoomOut} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 16px;
  right: 16px;
  bottom: 74px;
  z-index: 999;
`;

export default ButtonGroup;
