import { useState } from 'react';
import styled from 'styled-components';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Text from './Text';

interface Props {
  images: string[];
}
const ImageSlide = ({ images }: Props) => {
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
            <Slide src={img} alt="image" style={{ borderRadius: '8px' }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  /* border-radius: 8px; */
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

const Slide = styled.img`
  width: 100%;
  overflow: hidden;
`;

export default ImageSlide;
