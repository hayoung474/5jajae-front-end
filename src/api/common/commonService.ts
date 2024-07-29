import geocoder from '~/lib/geocoder';
import ApiClient from '../util/apiClient';
import type * as types from './commonService.types';
import haversine from '~/lib/haversine';

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

  async readCommonStoreList(params: types.ReadCommonStoreListParams): Promise<types.StoreListItemType[]> {
    const { lat,lng, sort, itemTagIds } = params;
    const { data } = await this.apiClient.get<types.ReadCommonStoreListResponse>(URLS.READ_STORE_LIST, {
      params: { itemTagIds },
    });

    const stores = data.data.stores;


    const newStores = stores.map((store) => {
      const storeLat = store.lat;
      const storeLng = store.lng;
      const distance = Math.round(haversine(storeLat, storeLng, lat, lng));

      return { ...store, distance };
    });

    // 2. 정렬 (최근 등록순은 default 값 사용하면 됨.)
    if (sort === 'nearest') {
      newStores.sort(function (a, b) {
        return a.distance - b.distance;
      });
    }

    return newStores;
  }

  async readCommonStoreDetail(params: types.ReadCommonStoreDetailParams) {
    const { data } = await this.apiClient.get<types.ReadCommonStoreDetailResponse>(
      `${URLS.READ_STORE_DETAIL}/${params.storeId}`,
    );
    return data;
  }

  async readCommonItemTags() {
    const { data } = await this.apiClient.get<types.ReadCommonItemTagsResponse>(URLS.READ_ITEM_TAGS);
    return data;
  }

  async createCommonDashboard(payload: types.CreateCommonDashboardPayload) {
    const { data } = await this.apiClient.post<types.CreateCommonDashboardResponse>(URLS.CREATE_DASHBOARD, payload);
    return data;
  }
}
