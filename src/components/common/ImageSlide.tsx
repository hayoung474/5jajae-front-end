import { useState } from 'react';
import styled from 'styled-components';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Text from './Text';

interface Props {
  images: string[];
  width?: string;
  height?: string;
}
const ImageSlide = ({ images, width = '100%', height = '100%' }: Props) => {
  const [index, setIndex] = useState<number>(1);

  return (
    <Wrapper>
      <NumberIndicator>
        <Text variant="caption_2" color="white" weight="medium">
          {index}/{images.length}
        </Text>
      </NumberIndicator>
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
        }}
        onSlideChange={(e) => {
          setIndex(e.realIndex + 1);
        }}
        loop
        style={{ borderRadius: '8px' }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={`${img} ${index}`}>
            <Slide src={img} alt="image" $width={width} $height={height} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  isolation: isolate;
  overflow: hidden;
`;

const NumberIndicator = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 12px;
  right: 12px;
  border-radius: 4px;
  padding: 4px 8px;
  background-color: #00000050;
`;

const Slide = styled.img<{ $width: string; $height: string }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: 8px;
`;

export default ImageSlide;
