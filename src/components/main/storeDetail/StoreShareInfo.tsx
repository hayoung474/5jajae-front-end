import styled from 'styled-components';
import Text from '~/components/common/Text';
import SolidButton from '~/components/common/buttons/SolidButton';
import Portal from '~/components/common/util/Portal';

interface Props {
  onShareClose: () => void;
}
const StoreShareInfo = ({ onShareClose }: Props) => {
  return (
    <Portal>
      <Wrapper>
        <Text variant="label_1" color="cool_gray_500" weight="regular">
          링크를 복사하였습니다.
          <br />
          원하는 곳에 붙여넣기(Ctrl+V)해주세요.
        </Text>
        <SolidButton size="medium" onClick={onShareClose}>
          확인
        </SolidButton>
      </Wrapper>
    </Portal>
  );
};

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 16px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border: solid 1px ${({ theme }) => theme.colors.cool_gray_200};
  border-radius: 16px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

  left: calc(426px - 100px);
  bottom: 102px;

  z-index: 3;
`;

export default StoreShareInfo;
