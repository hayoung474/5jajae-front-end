import { apiClient } from '../util/apiClient';
import type * as types from './storeApi.types';

const URLS = {
  READ_STORE_LIST: '/v1/ojajae/stores',
  READ_STORE_DETAIL: '/v1/ojajae/stores',
};

export async function readCommonStoreList(params: types.ReadCommonStoreListParams) {
  const res = await apiClient.get<types.ReadCommonStoreListResponse>(URLS.READ_STORE_LIST, { params });
  return res.data.data;
}

export async function readCommonStoreDetail(params: types.ReadCommonStoreDetailParams) {
  const res = await apiClient.get<types.ReadCommonStoreDetailResponse>(`${URLS.READ_STORE_DETAIL}/${params.storeId}`);
  return res.data.data;
}
