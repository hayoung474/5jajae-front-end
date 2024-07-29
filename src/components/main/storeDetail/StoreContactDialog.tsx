import styled from 'styled-components';
import Text from '~/components/common/Text';
import SolidButton from '~/components/common/buttons/SolidButton';
import { Call, Pin } from '~/components/common/icons';
import { flexCenter } from '~/style/mixins';

interface Props {
  name: string;
  address?: string;
  contactNumber: string;
  onContactClose: () => void;
}
const StoreContactDialog = ({ name, address, contactNumber, onContactClose }: Props) => {
  return (
    <Wrapper>
      <Backdrop onClick={onContactClose}></Backdrop>

      <Dialog>
        <div>
          <Text variant="heading_1" weight="bold" color="cool_gray_900">
            {name}
          </Text>
          {address && (
            <Address>
              <Pin size="20px" color="cool_gray_300" />
              <Text variant="label_1" color="cool_gray_500" weight="regular">
                {address}
              </Text>
            </Address>
          )}
        </div>
        <ContactContainer>
          <Contact>
            <Call size="24px" color="violet_600" />
            <Text variant="heading_1" color="violet_600" weight="bold">
              {contactNumber}
            </Text>
          </Contact>
        </ContactContainer>
        <CloseButton onClick={onContactClose} size="large">
          닫기
        </CloseButton>
      </Dialog>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  box-sizing: border-box;
  ${flexCenter}
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: #00000050;

  &:hover{
    cursor:pointer;
  }
`;

const Dialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  padding: 32px 20px;

  text-align: center;
  flex-direction: column;
  gap: 20px;
`;

const Address = styled.div`
  ${flexCenter}
  gap: 2px;
  margin-top: 4px;
`;

const ContactContainer = styled.div`
  ${flexCenter}
  width: 264px;
  padding: 24px 0;
  background-color: ${({ theme }) => theme.colors.cool_gray_100};
  border-radius: 8px;
`;

const Contact = styled.div`
  display: flex;
  gap: 4px;
`;

const CloseButton = styled(SolidButton)`
  width: 100%;
`;
export default StoreContactDialog;
