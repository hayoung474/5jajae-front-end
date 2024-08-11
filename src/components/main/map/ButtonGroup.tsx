import styled from 'styled-components';
import LocationCenterButton from './LocationCenterButton';
import ZoomControlButton from './ZoomControlButton';

interface Props {
  onCurrentLocationSet: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}
const ButtonGroup = ({ onCurrentLocationSet, onZoomIn, onZoomOut }: Props) => {
  return (
    <Wrapper>
      <LocationCenterButton onCurrentLocationSet={onCurrentLocationSet} />
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
