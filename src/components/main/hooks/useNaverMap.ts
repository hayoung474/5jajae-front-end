import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { StoreListItemDTO } from '~/api/common/commonService.types';

export interface MapMarker<T> {
  marker: NaverMapMarker;
  data: T;
}

interface Props {
  mapElementId: string;
}

interface InitProps {
  center: Coordinates;
}

type StoreMarker = MapMarker<StoreListItemDTO>;

const useNaverMap = ({ mapElementId }: Props) => {
  const router = useRouter();
  const { storeId } = router.query as { storeId: string };

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
      zoom: 11,
      scaleControl: true,
      mapDataControl: false,
      zoomControl: false,
      disableKineticPan: false,
    };

    const map = new naver.maps.Map(mapElementId, mapOptions);

    map.addListener('click', () => {
      setActiveMarker(undefined);
    });

    setMap(map);
  };

  const handleActiveMarkerSet = (targetMarker: StoreMarker) => {
    const icon = createHtmlStoreIconMarker({
      status: 'active',
      name: targetMarker.data.name,
    });
    targetMarker.marker.setIcon(icon);
    targetMarker.marker.setZIndex(999);

    if (map) {
      const position = targetMarker.marker.getPosition();
      const projection = map.getProjection();
      let point = projection.fromCoordToOffset(position);
      point.x = point.x - 213;
      const newPosition = projection.fromOffsetToCoord(point);
      map.panTo(newPosition);
    }

    setActiveMarker(targetMarker);
  };

  const handleInactiveMarkerSet = (targetMarker: StoreMarker) => {
    const icon = createHtmlStoreIconMarker({
      status: 'default',
      name: targetMarker.data.name,
    });
    targetMarker.marker.setZIndex(0);
    targetMarker.marker.setIcon(icon);
  };

  const renderMarkers = (dataList: StoreListItemDTO[]) => {
    if (markers) {
      clearAllMarkers();
    }

    let tempMarkers: StoreMarker[] = [];

    dataList.forEach((data) => {
      const icon = createHtmlStoreIconMarker({
        status: 'default',
        name: data.name,
      });

      const position = new naver.maps.LatLng(data.lat, data.lng);

      const marker = new naver.maps.Marker({
        map,
        position,
        icon,
      });

      const markerObj: StoreMarker = {
        marker,
        data,
      };

      marker.addListener('click', () => {
        handleActiveMarkerSet(markerObj);
        router.push({ pathname: router.pathname, query: { ...router.query, storeId: data.id } });
      });

      tempMarkers.push(markerObj);
    });

    setMarkers(tempMarkers);
  };

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

  useEffect(() => {
    if (!storeId && activeMarker) {
      handleInactiveMarkerSet(activeMarker);
    }
  }, [storeId]);

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

interface storeMarkerProps {
  status: 'default' | 'active';
  name: string;
}

const createHtmlStoreIconMarker = ({ status, name }: storeMarkerProps): naver.maps.HtmlIcon => {
  const defaultMarkerImgSrc = '/image/defaultMarker.png';
  const activeMarkerImgSrc = '/image/activeMarker.png';

  if (status === 'default') {
    return {
      content: [
        `<div class="map-store-marker-default">`,
        `<img class="pin"src="${defaultMarkerImgSrc}" />`,
        `<div class="label">${name}</div>`,
        `</div>`,
      ].join(''),
      anchor: new naver.maps.Point(13, 13),
    };
  }
  return {
    content: [
      `<div class="map-store-marker-active">`,
      `<img class="pin"src="${activeMarkerImgSrc}"/>`,
      `<div class="label">${name}</div>`,
      `</div>`,
    ].join(''),
    anchor: new naver.maps.Point(20.5, 28),
  };
};

export default useNaverMap;
