import styled from 'styled-components';
import useNaverMap from './hooks/useNaverMap';
import { useEffect } from 'react';
import GNB from './GNB';
import Filter from './Filter';
import Side from './side/Side';

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
      <GNB />
      <Filter />
      <RowWrapper>
        <Side />
        <MapWrapper>
          <div id="map" style={{ width: '100%', height: '100%' }}></div>
        </MapWrapper>
      </RowWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const RowWrapper = styled.div`
  flex: 1;
  height: 100%;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default MainScreen;
