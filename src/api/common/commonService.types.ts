/** service에서 사용할 타입들을 정의합니다. */

/** params */

export interface ReadCommonStoreListParams {
  address?: string;
  itemTagIds?: number[];
}

export interface ReadCommonStoreDetailParams {
  storeId: string;
}

export interface CreateCommonDashboardPayload {}

/** payload */

/** response */
export type ReadCommonStoreListResponse = ResponseDTO<{ stores: StoreListItemDTO[] }>;
export type ReadCommonStoreDetailResponse = ResponseDTO<StoreDetailItemDTO>;
export type ReadCommonItemTagsResponse = ResponseDTO<{ itemTags: ItemTag[] }>;

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
  imageUrls: StoreImage[];
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
