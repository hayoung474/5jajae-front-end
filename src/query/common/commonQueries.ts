import CommonService from '~/api/common/commonService';
import type * as serviceTypes from '~/api/common/commonService.types';

import { useQuery } from '@tanstack/react-query';

const COMMON_QUERY_KEYS = {
  COMMON_STORE_LIST: 'COMMON/STORE_LIST',
  COMMON_STORE_DETAIL: 'COMMON/STORE_DETAIL',
};
const commonService = new CommonService();

export const useStoreListQuery = (params: serviceTypes.ReadCommonStoreListParams = {}) =>
  useQuery({
    queryKey: [COMMON_QUERY_KEYS.COMMON_STORE_LIST, params.address],
    queryFn: () => commonService.readCommonStoreList(params),
    select: (res) => res.data.stores,
  });

export const useStoreDetailQuery = (params: serviceTypes.ReadCommonStoreDetailParams) =>
  useQuery({
    queryKey: [COMMON_QUERY_KEYS.COMMON_STORE_DETAIL, params.storeId],
    queryFn: () => commonService.readCommonStoreDetail(params),
    enabled: !!params.storeId,
  });
