import { createQueryKeys } from '@lukemorales/query-key-factory';
import * as apis from '~/api/store/storeApi';
import type * as types from '~/api/store/storeApi.types';

export const storeQueries = createQueryKeys('store', {
  list: (params: types.ReadCommonStoreListParams) => ({
    queryKey: [params],
    queryFn: () => apis.readCommonStoreList(params),
  }),
  detail: (params: types.ReadCommonStoreDetailParams) => ({
    queryKey: [params],
    queryFn: () => apis.readCommonStoreDetail(params),
  }),
});
