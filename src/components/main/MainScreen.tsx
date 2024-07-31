import styled from 'styled-components';
import useNaverMap from './hooks/useNaverMap';
import { use, useEffect } from 'react';
import StoreListSide from './storeList/StoreListSide';
import Header from './header/Header';
import StoreDetailSide from './storeDetail/StoreDetailSide';
import { useRouter } from 'next/router';
import { useStoreListQuery } from '~/query/common/commonQueries';
import { AnimatePresence, motion } from 'framer-motion';
import { commonActions, useCommonStore } from '~/store/common';
import ButtonGroup from './map/ButtonGroup';

type QueryParamsType = {
  storeId?: string;
  itemTagId?: string;
};
const MainScreen = () => {
  const router = useRouter();
  const { storeId, itemTagId } = router.query as QueryParamsType;
  const {
    map,
    markers,
    activeMarker,
    mapInitialize,
    renderMarkers,
    handleZoomIn,
    handleZoomOut,
    handleCenterMove,
    handleCenterChange,
    destroyMapInstance,
    handleActiveMarkerByStoreId,
  } = useNaverMap({
    mapElementId: 'map',
  });

  const addressInfo = useCommonStore((state) => state.addressInfo);
  const sort = useCommonStore((state) => state.sort);

  const storeListQuery = useStoreListQuery({ sort, lat: addressInfo.lat, lng: addressInfo.lng, itemTagId });

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const centerLocation = new naver.maps.LatLng(lat, lng);
        naver.maps.Service.reverseGeocode(
          {
            coords: centerLocation,
          },
          function (status, response) {
            if (status !== naver.maps.Service.Status.OK) {
              return alert('주소를 변환하는데 실패하였습니다.');
            }

            const result = response.v2;
            const address = result.address.jibunAddress;

            commonActions.setAddress(address);
          },
        );
      });
    }
  };

  useEffect(() => {
    if (addressInfo) {
      mapInitialize({ center: { lng: addressInfo.lng, lat: addressInfo.lat } });
      handleLocation();
    }

    return () => {
      destroyMapInstance();
    };
  }, []);

  useEffect(() => {
    if (markers && storeId) {
      handleActiveMarkerByStoreId(Number(storeId));
    }
  }, [markers, storeId]);

  useEffect(() => {
    if (map && storeListQuery.data) {
      renderMarkers(storeListQuery.data);
    }
  }, [storeListQuery.data]);

  useEffect(() => {
    if (addressInfo) {
      handleCenterChange({ lat: addressInfo.lat, lng: addressInfo.lng });
    }
  }, [addressInfo]);

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
          <StoreListSide
            stores={storeListQuery?.data}
            onStoreMarkerActive={handleActiveMarkerByStoreId}
            activeStoreId={activeMarker?.data.id}
          />
        </StoreListSlideContainer>

        <MapWrapper>
          <div id="map" style={{ width: '100%', height: '100%' }}></div>
          <ButtonGroup onCenterMove={handleCenterMove} onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
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
