import { apiClient } from '../util/apiClient';
import type * as types from './commonApi.types';

const URLS = {
  READ_STORE_LIST: '/v1/ojajae/stores',
  READ_STORE_DETAIL: '/v1/ojajae/stores',
  READ_ITEM_TAGS: '/v1/ojajae/item-tags',
  CREATE_DASHBOARD: 'v1/ojajae/dashboard',
};

export const readCommonStoreList = async (params: types.ReadCommonStoreListParams) => {
  const res = await apiClient.get<types.ReadCommonStoreListResponse>(URLS.READ_STORE_LIST, { params });
  return res.data.data;
};

export const readCommonStoreDetail = async (params: types.ReadCommonStoreDetailParams) => {
  const res = await apiClient.get<types.ReadCommonStoreDetailResponse>(`${URLS.READ_STORE_DETAIL}/${params.storeId}`);
  return res.data.data;
};

export const readCommonItemTags = async () => {
  const res = await apiClient.get<types.ReadCommonItemTagsResponse>(URLS.READ_ITEM_TAGS);
  return res.data.data;
};

export const createCommonDashboard = async (payload: types.CreateCommonDashboardPayload) => {
  const res = await apiClient.post<types.CreateCommonDashboardResponse>(URLS.CREATE_DASHBOARD, payload);
  return res.data.data;
};
