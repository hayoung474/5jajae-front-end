export interface ReadCommonStoreListParams {
  itemTagIds?: string;
  sort: SortType;
  lng: number;
  lat: number;
}

export interface ReadCommonStoreDetailParams {
  storeId: string;
}

export type ReadCommonStoreListResponse = ResponseDTO<{ stores: StoreListItemType[] }>;
export type ReadCommonStoreDetailResponse = ResponseDTO<StoreDetailItemType>;

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


export interface StoreImage {
  id: number;
  imageUrl: string;
}
