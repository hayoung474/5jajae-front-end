/** service에서 사용할 타입들을 정의합니다. */

import { SortType } from '~/store/common';

/** params */

export interface ReadCommonStoreListParams {
  itemTagId?: string;
  // address: string;
  sort: SortType;
  lng: number;
  lat: number;
}

export interface ReadCommonStoreDetailParams {
  storeId: string;
}

/** payload */

export interface CreateCommonDashboardPayload {
  storeId: number;
  dashboardType: DashboardType;
}

/** response */
export type ReadCommonStoreListResponse = ResponseDTO<{ stores: StoreListItemDTO[] }>;
export type ReadCommonStoreDetailResponse = ResponseDTO<StoreDetailItemDTO>;
export type ReadCommonItemTagsResponse = ResponseDTO<{ itemTags: ItemTag[] }>;
export type CreateCommonDashboardResponse = ResponseDTO<void>;

/** DTO */

export interface StoreListItemDTO {
  id: number;
  name: string;
  descriptions?: string;
  lat: number;
  lng: number;
  thumbnailImage: string;
  address?: string;
  itemTags?: ItemTag[];
}

export interface StoreDetailItemDTO {
  /** 업체 고유 id */
  id: number;
  name: string;
  descriptions?: string;
  lat: number;
  lng: number;
  hits: number;
  items: string;
  contactNumber?: string;
  homepage?: string;
  representativeName?: string;
  identificationNumber?: string;
  address?: string;
  itemTags?: ItemTag[];
  openingHours?: string;
  imageUrls: string[];
  storeReadCount: number;
}

export interface ItemTag {
  id: number;
  name: string;
  imageUrl: string;
}

export interface StoreImage {
  id: number;
  imageUrl: string;
}

export type StoreListItemType = StoreListItemDTO & { distance: number };
// 대시보드 타입(STORE_COUNT: 조회, STORE_CALL: 전화, STORE_SHARE: 공유하기)
export type DashboardType = 'STORE_COUNT' | 'STORE_CALL' | 'STORE_SHARE';
