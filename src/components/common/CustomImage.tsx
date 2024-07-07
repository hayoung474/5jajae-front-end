import styled from 'styled-components';
import Image from 'next/image';

interface Props {
  src: string;
  width: string;
  height: string;
  alt?: string;
}
const CustomImage = ({ src, alt, width, height }: Props) => {
  return (
    <Wrapper $width={width} $height={height}>
      <StyledImage
        fill
        alt={alt ?? 'image'}
        src={src}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
      />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $width: string; $height: string }>`
  position: relative;

  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
`;

const StyledImage = styled(Image)`
  overflow: hidden;
  border-radius: 4px;
  object-fit: cover;
`;

export default CustomImage;
