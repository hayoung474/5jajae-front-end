import styled from 'styled-components';
import Text from '~/components/common/Text';

interface Props {
  title: string;
  label: string | React.ReactNode;
}
export default function StoreInfoDetailItem({ title, label }: Props) {
  return (
    <Wrapper>
      <Text variant="label_2" weight="bold" color="cool_gray_900" className="label">
        {title}
      </Text>
      {typeof label === 'string' && (
        <Text variant="label_2" weight="regular" color="cool_gray_500" className="text-wrapper">
          {label}
        </Text>
      )}
      {typeof label !== 'string' && label}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 8px 0;
  .label {
    width: 88px;
    flex-shrink: 0;
  }
  .text-container {
    display: flex;
    gap: 4px;
    flex: 1;
  }

  a {
    color: #0068ee;
    ${({ theme }) => theme.fontStyle.label_2}
    ${({ theme }) => theme.fontWeight.medium}
    text-decoration: none;
    text-decoration-line: none;
  }
`;
