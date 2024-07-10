import styled from 'styled-components';
import useNaverMap from './hooks/useNaverMap';
import { Suspense, useEffect } from 'react';
import StoreListSide from './storeList/StoreListSide';
import Header from './header/Header';
import StoreDetailSide from './storeDetail/StoreDetailSide';
import { useRouter } from 'next/router';
import { useStoreListQuery } from '~/query/common/commonQueries';

const MainScreen = () => {
  const router = useRouter();
  const { storeId } = router.query;
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

  const storeListQuery = useStoreListQuery();

  useEffect(() => {
    mapInitialize({ center: { lng: 126.9769, lat: 37.5657 } });
    return () => {
      destroyMapInstance();
    };
  }, []);

  useEffect(() => {
    if (map && storeListQuery.data) {
      renderMarkers(storeListQuery.data);
    }
  }, [storeListQuery.data]);

  return (
    <Wrapper>
      <Header />
      <ContentWrapper>
        {storeListQuery.isSuccess && <StoreListSide stores={storeListQuery.data} />}
        {storeId && <StoreDetailSide />}
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
  display: flex;
  width: 100vw;
  height: calc(100vh - 144px);
`;

const MapWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
`;

export default MainScreen;
