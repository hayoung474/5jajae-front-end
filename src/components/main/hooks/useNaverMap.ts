import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { ItemTag } from '~/api/common/commonService.types';
import { StoreListItemDTO } from '~/api/common/commonService.types';
import copyText from '~/lib/copyText';
import sleep from '~/lib/sleep';

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
  const [mapCenterMarker, setMapCenterMarker] = useState<NaverMapMarker>();

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
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.RIGHT_BOTTOM, // 줌 컨트롤러의 위치 설정
      },
      disableKineticPan: false,
    };

    const map = new naver.maps.Map(mapElementId, mapOptions);

    map.addListener('click', () => {
      setActiveMarker(undefined);
    });

    setMap(map);
  };

  const handleCenterChange = (center: Coordinates) => {
    setMapCenter(center);
  };

  const handleActiveMarkerByStoreId = (storeId: number) => {
    const targetMarker = markers.find((marker) => marker.data.id === Number(storeId));
    if (targetMarker) {
      handleActiveMarkerSet(targetMarker);
    }
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
    if (!map) {
      return;
    }
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

      const infoWindow = new naver.maps.InfoWindow({
        content: createHtmlStoreInfoWindow(data),
        borderWidth: 0,

        backgroundColor: 'transparent',
        anchorSize: new naver.maps.Size(12, 9),

        anchorColor: '#fff',
        anchorSkew: true,
      });

      marker.addListener('click', () => {
        handleActiveMarkerSet(markerObj);
        router.push({ pathname: router.pathname, query: { ...router.query, storeId: data.id } });
      });

      marker.addListener('mouseover', async () => {
        await sleep(700);
        infoWindow.open(map, marker);
      });

      // naver.maps.Event.addDOMListener(infoWindow.getContentElement(), 'mouseleave', async (e) => {
      //   const elementId = e.relatedTarget?.id;
      //   if (elementId !== 'map-store-marker') {
      //     await sleep(700);
      //     infoWindow.close();
      //   }
      // });
      // naver.maps.Event.addDOMListener(marker.getElement(), 'mouseleave', async (e) => {
      //   const elementId = e.relatedTarget?.id;
      //   if (elementId !== 'map-store-info-window') {
      //     await sleep(700);
      //     infoWindow.close();
      //   }
      // });

      naver.maps.Event.addListener(map, 'click', function (e) {
        if (infoWindow.getMap()) {
          infoWindow.close();
        }
      });

      naver.maps.Event.addDOMListener(infoWindow.getContentElement(), 'click', (e) => {
        const elementId = e.target.id;
        const storeId = e.target.dataset?.storeId;

        if (!storeId || !elementId) {
          return;
        }

        if (elementId === 'map-info-window-store-detail-button') {
          handleActiveMarkerByStoreId(Number(storeId));
          router.push({ pathname: router.pathname, query: { ...router.query, storeId } });
        }
        if (elementId === 'map-info-window-store-share-button') {
          const text = `https://ojajae.com?storeId=${storeId}`;
          copyText(text);
          alert('업체 주소가 복사되었습니다!');
        }
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

  useEffect(() => {
    if (map && mapCenter) {
      if (mapCenterMarker) {
        mapCenterMarker.setMap(null);
      }
      const centerLocation = new naver.maps.LatLng(mapCenter.lat, mapCenter.lng);
      map.setCenter(centerLocation);

      const icon = createHtmlCenterIconMarker();

      const marker = new naver.maps.Marker({
        map,
        icon,
        position: centerLocation,
      });
      marker.setZIndex(1000);

      setMapCenterMarker(marker);
    }
  }, [mapCenter]);

  return {
    map,
    markers,
    mapInitialize,
    activeMarker,
    setActiveMarker,
    clearAllMarkers,
    renderMarkers,
    handleActiveMarkerSet,
    handleActiveMarkerByStoreId,
    handleCenterChange,
    destroyMapInstance,
  };
};

interface storeMarkerProps {
  status: 'default' | 'active';
  name: string;
}

const createHtmlCenterIconMarker = (): naver.maps.HtmlIcon => {
  return {
    content: ['<div>', '<div class="map-center-marker-pin"></div>', '</div>'].join(''),
    anchor: new naver.maps.Point(10, 10),
  };
};
const createHtmlStoreIconMarker = ({ status, name }: storeMarkerProps): naver.maps.HtmlIcon => {
  const defaultMarkerImgSrc = '/image/defaultMarker.png';
  const activeMarkerImgSrc = '/image/activeMarker.png';

  if (status === 'default') {
    return {
      content: [
        `<div class="map-store-marker-default" id="map-store-marker">`,
        `<img class="pin"src="${defaultMarkerImgSrc}" />`,
        `<div class="label">${name}</div>`,
        `</div>`,
      ].join(''),
      anchor: new naver.maps.Point(13, 13),
    };
  }
  return {
    content: [
      `<div class="map-store-marker-active" id="map-store-marker">`,
      `<img class="pin"src="${activeMarkerImgSrc}"/>`,
      `<div class="label">${name}</div>`,
      `</div>`,
    ].join(''),
    anchor: new naver.maps.Point(20.5, 28),
  };
};

const createHtmlStoreInfoWindow = (store: StoreListItemDTO) => {
  return [
    '<div class="map-store-info-window" id="map-store-info-window">',
    ...createHtmlBadgeList(store.itemTags),
    `<div class="store-title">${store.name}</div>`,
    `<div class="store-description">${store.descriptions || ''}</div>`,
    `<div class="store-address">`,
    `<img class="pin-icon" src="/image/icon_pin_cool_gray_300.png"/>`,
    `<div>${store.address}</div>`,
    `</div>`,
    `<div class="store-button-group">`,
    `<button class="store-detail-button" id="map-info-window-store-detail-button" data-store-id="${store.id}">업체정보 보기</button>`,
    `<button class="store-share-button" id="map-info-window-store-share-button" data-store-id="${store.id}">`,
    `<img class="share-icon" src="/image/icon_share_cool_gray_950.png" id="map-info-window-store-share-button" data-store-id="${store.id}"/>`,
    `</button>`,
    `</div>`,
    '</div>',
  ].join('');
};

const createHtmlBadgeList = (itemTags: ItemTag[]) => {
  const list = itemTags.map((item) => {
    return `<div class="store-badge-list-item">${item.name}</div>`;
  });

  return ['<div class="store-badge-list">', ...list, '</div>'];
};
export default useNaverMap;
