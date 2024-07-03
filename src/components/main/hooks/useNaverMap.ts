import { useCallback, useEffect, useState } from 'react';

export interface MapMarker<T> {
  marker: NaverMapMarker;
  data: T;
}

export interface MapMarkerData {
  name: string;
}
interface Props {
  mapElementId: string;
}

interface InitProps {
  center: Coordinates;
}

type StoreMarker = MapMarker<MapMarkerData>;

const useNaverMap = ({ mapElementId }: Props) => {
  /** map instance */
  const [map, setMap] = useState<NaverMap>();
  const [mapCenter, setMapCenter] = useState<Coordinates>();

  const [markers, setMarkers] = useState<StoreMarker[]>([]);

  /** 현재 선택(active)된 marker */
  const [activeMarker, setActiveMarker] = useState<StoreMarker>();
  /** 이전 선택(active)된 marker */
  const [prevMarker, setPrevMarker] = useState<StoreMarker>();

  const mapInitialize = ({ center }: InitProps) => {
    setMapCenter(center);
    const centerLocation = new naver.maps.LatLng(center.lat, center.lng);
    let mapOptions = {
      center: centerLocation,
      zoom: 10,
      scaleControl: true,
      mapDataControl: false,
      zoomControl: false,
      disableKineticPan: false,
    };

    const map = new naver.maps.Map(mapElementId, mapOptions);

    setMap(map);
  };

  const handleActiveMarkerSet = (targetMarker: StoreMarker) => {
    // active된 마커 아이콘 세팅하기
    //     targetMarker.marker.setIcon(markerIcon);
    targetMarker.marker.setZIndex(999);
    setActiveMarker(targetMarker);
  };

  const handleInactiveMarkerSet = (targetMarker: StoreMarker) => {
    // inactive된 마커 아이콘 세팅하기
    //     targetMarker.marker.setIcon(markerIcon);
  };

  const renderMarkers = (dataList: MapMarkerData[]) => {
    if (markers) {
      clearAllMarkers();
    }

    let tempMarkers: StoreMarker[] = [];

    dataList.forEach((data) => {
      const marker = new naver.maps.Marker({
        map,
        position: { lat: 9, lng: 9 },
        // position: uniqueMarkerPosition,
        // icon: markerIcon,
      });

      const markerObj: StoreMarker = {
        marker,
        data,
      };

      marker.addListener('click', () => {
        handleActiveMarkerSet(markerObj);
      });

      tempMarkers.push(markerObj);
    });

    setMarkers(tempMarkers);
  };

  // const goToCenter = () => {
  //   const centerLocation = new naver.maps.LatLng(mapCenter.y, mapCenter.x);
  //   map.setCenter(centerLocation);
  // };

  const clearAllMarkers = () => {
    if (markers.length > 0) {
      markers.forEach((markerObj) => {
        markerObj.marker.setMap(null);
      });
    }

    setActiveMarker(undefined);
    setPrevMarker(undefined);
  };
  const destroyMapInstance = useCallback(() => {
    map?.destroy();
  }, [map]);

  useEffect(() => {
    setPrevMarker(activeMarker);
    prevMarker && handleInactiveMarkerSet(prevMarker);
  }, [activeMarker]);

  return {
    map,
    markers,
    activeMarker,
    setActiveMarker,
    handleActiveMarkerSet,
    mapInitialize,
    renderMarkers,
    // goToCenter,
    clearAllMarkers,
    destroyMapInstance,
  };
};

export default useNaverMap;
