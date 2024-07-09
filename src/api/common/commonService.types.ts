/** service에서 사용할 타입들을 정의합니다. */

/** params */

export interface ReadCommonStoreListParams {
  address?: string;
  itemTagIds?: number[];
}

export interface ReadCommonStoreDetailParams {
  storeId: number;
}

export interface CreateCommonDashboardPayload {}

/** payload */

/** response */
export type ReadCommonStoreListResponse = ResponseDTO<{ stores: StoreListItemDTO[] }>;
export type ReadCommonStoreDetailResponse = ResponseDTO<StoreDetailItemDTO>;

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
  description?: string;
  lat: number;
  lng: number;
  hits: number;
  contactNumber?: string;
  homepage?: string;
  representativeName?: string;
  identificationNumber?: string;
  address?: string;
  items?: ItemTag[];
  openingHours?: string;
  imageUrls: StoreImage[];
  storeReadCount: number;
}

export interface ItemTag {
  id: number;
  name: number;
  imageUrl: string;
}

export interface StoreImage {
  id: number;
  imageUrl: string;
}
