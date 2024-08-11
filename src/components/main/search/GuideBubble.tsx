import styled from 'styled-components';
import { Close } from '~/components/common/icons';
import Text from '~/components/common/Text';
import { commonActions, useCommonStore } from '~/store/common';

const GuideBubble = () => {
  const isShow = useCommonStore((state) => state.showGuide.bubble);

  if (!isShow) {
    return null;
  }
  return (
    <Wrapper>
      <Text variant="label_2" weight="regular" color="white" className="message">
        현장주소를 기반으로 가까운 업체 정보를 확인할 수 있어요
      </Text>
      <div className="close-btn" onClick={commonActions.closeBubbleGuide}>
        <Close color="white" size="16px" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 8px;

  width: fit-content;
  position: absolute;

  box-sizing: border-box;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.cool_gray_900};
  border-radius: 4px;
  padding: 8px 12px;

  width: 248px;

  .message {
    flex: 1;
    white-space: pre-wrap;
  }

  .close-btn {
    cursor: pointer;
  }

  &:after {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 8px solid ${({ theme }) => theme.colors.cool_gray_900};
  }
`;
export default GuideBubble;
