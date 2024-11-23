import styled from 'styled-components';
import IconContainedButton from '~/components/common/buttons/IconContainedButton';
import useDashboard from '../hooks/useDashboard';
import { copyText } from '~/lib';
import { snackBarActions } from '~/store/snackBar';
import { Share } from '~/components/common/icons';
import SolidButton from '~/components/common/buttons/SolidButton';

interface Props {
  storeId: string;
  onContactOpen: () => void;
}
export default function ButtonGroup({ storeId, onContactOpen }: Props) {
  const { sendDashboardEvent } = useDashboard();

  const handleShareClick = async () => {
    const text = `https://ojajae.com?storeId=${storeId}`;
    copyText(text);
    snackBarActions.open('링크를 복사하였습니다.\n원하는 곳에 붙여넣기(Ctrl + V) 해주세요.');

    sendDashboardEvent(Number(storeId), 'STORE_SHARE');
  };

  return (
    <Wrapper>
      <IconContainedButton size="large" onClick={handleShareClick}>
        <Share size="20px" />
      </IconContainedButton>
      <ContactButton onClick={onContactOpen} size="large">
        대표번호 보기
      </ContactButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 4px;
  position: absolute;
  box-sizing: border-box;

  width: 100%;

  padding: 24px 20px;
  bottom: 0;
  left: 0px;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 25%);
`;
const ContactButton = styled(SolidButton)`
  width: 100%;
`;
