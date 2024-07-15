import styled from 'styled-components';
import useNaverMap from './hooks/useNaverMap';
import { useEffect } from 'react';
import StoreListSide from './storeList/StoreListSide';
import Header from './header/Header';
import StoreDetailSide from './storeDetail/StoreDetailSide';
import { useRouter } from 'next/router';
import { useStoreListQuery } from '~/query/common/commonQueries';
import { AnimatePresence, motion } from 'framer-motion';

const MainScreen = () => {
  const router = useRouter();
  const { storeId } = router.query;
  const {
    map,
    markers,
    activeMarker,
    mapInitialize,
    renderMarkers,
    handleActiveMarkerSet,
    destroyMapInstance,
    handleActiveMarkerByStoreId,
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
        <AnimatePresence>
          {storeId && (
            <StoreDetailSlideContainer
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
                type: 'spring',
                bounce: 0,
                bounceDamping: 0,
                bounceStiffness: 100,
              }}
              exit={{ x: '-100%' }}
            >
              <StoreDetailSide />
            </StoreDetailSlideContainer>
          )}
        </AnimatePresence>
        <StoreListSlideContainer>
          {storeListQuery.isSuccess && (
            <StoreListSide
              stores={storeListQuery.data}
              onStoreMarkerActive={handleActiveMarkerByStoreId}
              activeStoreId={activeMarker?.data.id}
            />
          )}
        </StoreListSlideContainer>

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

  position: relative;
`;

const MapWrapper = styled.div`
  flex: 1;
`;

const StoreDetailSlideContainer = styled(motion.div)`
  width: 426px;
  height: 100%;
  position: absolute;
  left: 426px;
  top: 0;
  z-index: 2;
`;
const StoreListSlideContainer = styled.div`
  width: 426px;
  height: 100%;

  overflow-y: scroll;
  z-index: 2;
`;

export default MainScreen;
