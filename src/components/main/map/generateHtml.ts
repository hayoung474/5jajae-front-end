import { StoreListItemType } from "~/api/store/storeApi.types";

export const getClusterMarkerHtml = (size: 'small' | 'large'): naver.maps.HtmlIcon => {
  if (size === 'large') {
    return {
      content: `<div class="store-cluster-icon-large"></div>`,
      size: new naver.maps.Size(64, 64),
      anchor: new naver.maps.Point(32, 32),
    };
  }

  return {
    content: `<div class="store-cluster-icon-small"></div>`,
    size: new naver.maps.Size(48, 48),
    anchor: new naver.maps.Point(24, 24),
  };
};

export const getCenterMarkerHtml = (): naver.maps.HtmlIcon => {
  return {
    content: `<div><div class="map-center-marker-pin"></div></div>`,
    anchor: new naver.maps.Point(10, 10),
  };
};

interface storeMarkerProps {
  status: 'default' | 'active';
  name: string;
}

export const getStoreMarkerHtml = ({ status, name }: storeMarkerProps): naver.maps.HtmlIcon => {
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

export const getGuideInfoWindowHtml = () => {
  return [
    '<div class="map-guide-info-window">',
    '<div class="title">서울특별시</div>',
    '<div class="message">📍현재 서비스 가능 지역이에요!</div>',
    '</div>',
  ].join('');
};


export const getStoreInfoWindowHtml = (store: StoreListItemType) => {
  return [
    '<div class="map-store-info-window" id="map-store-info-window">',
    ...getBadgeListHtml(store.itemTags),
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

const getBadgeListHtml = (itemTags: ItemTag[]) => {
  const list = itemTags.map((item) => {
    return `<div class="store-badge-list-item">${item.name}</div>`;
  });
  return ['<div class="store-badge-list">', ...list, '</div>'];
};
