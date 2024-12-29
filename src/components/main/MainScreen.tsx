import styled from 'styled-components';
import StoreListSide from './storeList/StoreListSide';
import Header from './header/Header';
import StoreDetailSide from './storeDetail/StoreDetailSide';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { StoreListItemType } from '~/api/store/storeApi.types';
import { MapMarker } from './hooks/useNaverMap';
import { useQuery } from '@tanstack/react-query';
import { storeQueries } from '~/queries/storeQueries';
import { commonActions, useCommonStore } from '~/store/common';
import ButtonGroup from './map/ButtonGroup';
import {
  getCenterMarkerHtml,
  getClusterMarkerHtml,
  getGuideInfoWindowHtml,
  getStoreInfoWindowHtml,
  getStoreMarkerHtml,
} from './map/generateHtml';
import { makeMarkerClustering } from './map/marker-cluster';
import { copyText } from '~/lib';
import { snackBarActions } from '~/store/snackBar';

type QueryParamsType = {
  storeId?: string;
  itemTagIds?: string;
};

type StoreMarker = MapMarker<StoreListItemType>;

const MainScreen = () => {
  const router = useRouter();
  const { storeId, itemTagIds } = router.query as QueryParamsType;

  // 해당 값은 상태 관리가 필요 함.
  const [map, setMap] = useState<NaverMap>();
  const [markers, setMarkers] = useState<StoreMarker[]>([]);
  const [clusters, setClusters] = useState<any>();

  const infoWindowRef = useRef<naver.maps.InfoWindow | null>(null);
  const centerMarkerRef = useRef<naver.maps.Marker | null>(null);

  const [prevStore, setPrevStore] = useState<StoreMarker>();
  // 현재 active 된 store. 이 값이 있을 땐 storeId가 세팅되어 있음.
  const [activeStore, setActiveStore] = useState<StoreMarker>();

  // 필터 값 또는 가이드 조건문
  const addressInfo = useCommonStore((state) => state.addressInfo);
  const sort = useCommonStore((state) => state.sort);
  const guideIsShow = useCommonStore((state) => state.showGuide.circle);

  // 업체 목록 쿼리
  const { data: storesData } = useQuery({
    ...storeQueries.list({ sort, lat: addressInfo.lat, lng: addressInfo.lng, itemTagIds }),
    select: (data) => data.stores,
  });

  const handleCenterMove = () => {
    if (map) {
      const centerPosition = new naver.maps.LatLng(addressInfo.lat, addressInfo.lng);
      map.setCenter(centerPosition);
    }
  };
  const getStoreInfoWindow = (data: StoreListItemType) => {
    const infoWindow = new naver.maps.InfoWindow({
      content: getStoreInfoWindowHtml(data),
      borderWidth: 0,

      backgroundColor: 'transparent',
      anchorSize: new naver.maps.Size(12, 9),

      anchorColor: '#fff',
      anchorSkew: true,
    });

    naver.maps.Event.addDOMListener(infoWindow.getContentElement(), 'click', (e) => {
      const elementId = e.target.id;
      const storeId = e.target.dataset?.storeId;

      if (!storeId || !elementId) {
        return;
      }

      if (elementId === 'map-info-window-store-detail-button') {
        router.push({ pathname: router.pathname, query: { ...router.query, storeId } });
      }
      if (elementId === 'map-info-window-store-share-button') {
        copyText(`https://ojajae.com?storeId=${storeId}`);
        snackBarActions.open('링크를 복사하였습니다.\n원하는 곳에 붙여넣기(Ctrl + V) 해주세요.');
      }
    });

    return infoWindow;
  };

  const handleLocationSet = () => {
    const handleLocationSuccess = (position: GeolocationPosition) => {
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
    };

    const handleLocationError = (error: GeolocationPositionError) => {
      commonActions.resetAddress();
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError);
    }
  };

  const handleZoomIn = () => {
    if (map && map.getMaxZoom() !== map.getZoom()) {
      map.setZoom(map.getZoom() + 1, true);
    }
  };
  const handleZoomOut = () => {
    if (map && map.getMinZoom() !== map.getZoom()) {
      map.setZoom(map.getZoom() - 1, true);
    }
  };

  useEffect(() => {
    // 지도 초기화.
    const mapElement = new naver.maps.Map('map', {
      // center: centerLocation,
      zoom: 11,
      scaleControl: true,
      mapDataControl: false,
      zoomControl: false,
      disableKineticPan: false,
    });

    setMap(mapElement);
    // 주소 최초 세팅
    handleLocationSet();

    return () => {
      map?.destroy();
    };
  }, []);

  useEffect(() => {
    if (centerMarkerRef.current) {
      centerMarkerRef.current.setMap(null);
    }

    if (map && addressInfo) {
      const centerPosition = new naver.maps.LatLng(addressInfo.lat, addressInfo.lng);
      map.setCenter(centerPosition);

      const centerMarker = new naver.maps.Marker({
        map,
        icon: getCenterMarkerHtml(),
        position: centerPosition,
        zIndex: 1000,
      });

      centerMarkerRef.current = centerMarker;
    }
  }, [map, addressInfo]);

  /** 사용 가이드 렌더링 로직. 지도가 로드 되었고, 가이드 노출 조건이 성립할 때 실행한다. */
  useEffect(() => {
    if (map && guideIsShow) {
      const defaultCenterLocation = new naver.maps.LatLng(37.5665, 126.978);
      const guideInfoWindowLocation = new naver.maps.LatLng(37.7035486, 126.9801816);
      const circle = new naver.maps.Circle({
        map,
        center: defaultCenterLocation,
        radius: 15000,
        fillColor: '#6839ee',
        fillOpacity: 0.15,
        strokeWeight: 2,
        strokeOpacity: 0.4,
        strokeColor: '#6839ee',
        strokeStyle: 'solid',
      });

      const infoWindow = new naver.maps.InfoWindow({
        content: getGuideInfoWindowHtml(),
        borderWidth: 0,
        backgroundColor: 'transparent',
        anchorSize: new naver.maps.Size(12, 9),
        anchorColor: '#6839ee',
        anchorSkew: true,
      });
      infoWindow.open(map, guideInfoWindowLocation);

      /** 지도 줌레벨 변경 이벤트 추가. 줌 레벨 변경 시 가이드 제거 */
      naver.maps.Event.addListener(map, 'zoom_changed', function () {
        infoWindow.close();
        circle.setMap(null);
        commonActions.closeCircleGuide();
      });
    }
  }, [map, guideIsShow]);

  /** 마커 렌더링 로직  */
  useEffect(() => {
    // 지도가 로드되지 않았거나, 업체 정보가 없으면 실행하지 않는다.
    if (!map || !storesData) {
      return;
    }

    // 클러스터링 할 마커를 임시 저장하는 배열
    const clusterMarkers: naver.maps.Marker[] = [];
    // markers state에 저장 할 배열
    const storeMarkers: StoreMarker[] = [];

    // 마커를 생성한다.
    storesData.forEach((store) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(store.lat, store.lng),
        draggable: true,
        icon: getStoreMarkerHtml({
          status: 'default',
          name: store.name,
        }),
      });

      marker.addListener('click', () => {
        router.push({ pathname: router.pathname, query: { ...router.query, storeId: store.id } });
      });

      clusterMarkers.push(marker);
      storeMarkers.push({ marker, data: store });
    });

    setMarkers(storeMarkers);

    /** html string 을 self-closing 형태로 작성하면 안됨. */
    const smallClusterMarker = getClusterMarkerHtml('small');
    const largeClusterMarker = getClusterMarkerHtml('large');

    const MarkerClustering = makeMarkerClustering(window.naver);

    const markerClustering = new MarkerClustering({
      minClusterSize: 2,
      maxZoom: 20,
      map,
      markers: clusterMarkers,
      disableClickZoom: false,
      gridSize: 100,
      icons: [smallClusterMarker, smallClusterMarker, largeClusterMarker],
      indexGenerator: [10, 100],
      stylingFunction: (clusterMarker: any, count: number) => {
        if (clusterMarker) {
          const firstChild = clusterMarker.getElement().querySelector('div:first-child');
          if (firstChild) {
            firstChild.innerHTML = count;
          }
        }
      },
    });
    setClusters((prevClusters: any) => {
      prevClusters?.setMap(null);
      return markerClustering;
    });
  }, [storesData]);

  // storeId에 따른 마커 동작 이펙트.
  useEffect(() => {
    // 지도가 로드되어 있지 않다면 호출하지 않는다. 마커 값이 없어도 실행하지 않는다.
    if (!map || markers.length === 0) {
      return;
    }

    setActiveStore(undefined);

    // storeId가 없는데
    if (!storeId) {
      // state에 저장된 값이 있다면?
      if (activeStore) {
        activeStore.marker.setIcon(
          getStoreMarkerHtml({
            status: 'default',
            name: activeStore.data.name,
          }),
        );
      }

      // infoWindowRef 값이 뭐라도 있다면?
      if (infoWindowRef.current) {
        // 있던 infowindow를 닫고 초기화 시킨다.
        infoWindowRef.current.close();
        infoWindowRef.current = null;
      }
    }

    // storeId 값이 있다면?
    if (storeId) {
      const target = markers.find((store) => store.data.id.toString() === storeId);

      if (target) {
        const position = target.marker.getPosition();

        // 마커 active 상태로 변경하기
        target.marker.setZIndex(999);
        target.marker.setIcon(
          getStoreMarkerHtml({
            status: 'active',
            name: target.data.name,
          }),
        );

        /** 마커 인포 윈도우 열기 */
        const infoWindow = getStoreInfoWindow(target.data);
        infoWindow.open(map, target.marker);
        infoWindowRef.current = infoWindow;

        /** 마커 가운데로 이동하기 */
        const projection = map.getProjection();
        let point = projection.fromCoordToOffset(position);
        point.x = point.x - 213;
        const newPosition = projection.fromOffsetToCoord(point);
        map.panTo(newPosition);

        /** target을 state에 저장  */
        setActiveStore(target);
      }
    }
  }, [map, markers, storeId, activeStore]);

  useEffect(() => {
    setPrevStore(activeStore);
    if (prevStore) {
      prevStore.marker.setIcon(
        getStoreMarkerHtml({
          status: 'default',
          name: prevStore.data.name,
        }),
      );
    }
  }, [activeStore]);

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
          <StoreListSide stores={storesData} />
        </StoreListSlideContainer>

        <MapWrapper>
          <div id="map" style={{ width: '100%', height: '100%' }}></div>
          <ButtonGroup onCurrentLocationSet={handleCenterMove} onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
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
  position: relative;
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

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export default MainScreen;
