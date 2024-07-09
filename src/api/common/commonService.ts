import ApiClient from '../util/apiClient';
import type * as types from './commonService.types';

const URLS = {
  READ_STORE_LIST: '/v1/ojajae/stores',
  READ_STORE_DETAIL: '/v1/ojajae/stores',
  READ_ITEM_TAGS: '/v1/ojajae/item-tags',
  CREATE_DASHBOARD: 'v1/ojajae/dashboard',
};

export default class CommonService {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  async readCommonStoreList(params: types.ReadCommonStoreListParams): Promise<types.ReadCommonStoreListResponse> {
    const { data } = await this.apiClient.get<types.ReadCommonStoreListResponse>(URLS.READ_STORE_LIST, { params });
    return data;
  }

  async readCommonStoreDetail(params: types.ReadCommonStoreDetailParams) {
    const { data } = await this.apiClient.get<types.ReadCommonStoreDetailResponse>(
      `${URLS.READ_STORE_DETAIL}/${params.storeId}`,
    );
    return data;
  }
}
