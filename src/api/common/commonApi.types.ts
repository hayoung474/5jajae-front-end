export interface ReadCommonStoreListParams {
  itemTagId?: string;
  sort: SortType;
  lng: number;
  lat: number;
}

export interface ReadCommonStoreDetailParams {
  storeId: string;
}

export interface CreateCommonDashboardPayload {
  storeId: number;
  dashboardType: DashboardType;
}

export type ReadCommonStoreListResponse = ResponseDTO<{ stores: StoreListItemType[] }>;
export type ReadCommonStoreDetailResponse = ResponseDTO<StoreDetailItemType>;
export type ReadCommonItemTagsResponse = ResponseDTO<{ itemTags: ItemTag[] }>;
export type CreateCommonDashboardResponse = ResponseDTO;

export interface StoreListItemType {
  id: number;
  name: string;
  descriptions?: string;
  lat: number;
  lng: number;
  thumbnailImage: string;
  address?: string;
  itemTags: ItemTag[];
  distance: number;
}

export interface StoreDetailItemType {
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

// 대시보드 타입(STORE_COUNT: 조회, STORE_CALL: 전화, STORE_SHARE: 공유하기)
export type DashboardType = 'STORE_COUNT' | 'STORE_CALL' | 'STORE_SHARE';
