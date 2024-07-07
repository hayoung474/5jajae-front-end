import styled from 'styled-components';
import useNaverMap from './hooks/useNaverMap';
import { useEffect } from 'react';
import Side from './Side';
import Header from './header/Header';

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
      <Header />
      <ContentWrapper>
        <Side />
        <MapWrapper>
          <div id="map" style={{ width: '100%', height: '100%' }}></div>
        </MapWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 144px 1fr;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 426px 1fr;
  height: calc(100vh - 144px);
`;

const MapWrapper = styled.div``;

export default MainScreen;
