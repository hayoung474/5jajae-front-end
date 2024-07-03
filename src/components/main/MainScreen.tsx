import styled from 'styled-components';
import useNaverMap from './hooks/useNaverMap';
import { useEffect } from 'react';

const MainScreen = () => {
  const {
    map,
    markers,
    mapInitialize,
    activeMarker,
    setActiveMarker,
    renderMarkers,
    handleActiveMarkerSet,
    destroyMapInstance,
  } = useNaverMap({
    mapElementId: 'map',
  });

  useEffect(() => {
    mapInitialize({ center: { lng: 126.9769, lat: 37.5657 } });
    return () => {
      destroyMapInstance();
    };
  }, []);
  return (
    <Wrapper>
      메인 화면 입니다. <div id="map" style={{ width: '100vw', height: '100vh' }}></div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default MainScreen;
