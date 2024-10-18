import * as apis from '~/api/common/commonApi';
import type * as serviceTypes from '~/api/common/commonApi.types';
import { useMutation, useQuery } from '@tanstack/react-query';

const COMMON_QUERY_KEYS = {
  COMMON_STORE_LIST: 'COMMON/STORE_LIST',
  COMMON_STORE_DETAIL: 'COMMON/STORE_DETAIL',
  COMMON_ITEM_TAGS: 'COMMON/ITEM_TAGS',
};

export const useStoreListQuery = (params: serviceTypes.ReadCommonStoreListParams) => {
  const { lat, lng, sort, itemTagId } = params;
  return useQuery({
    queryKey: [COMMON_QUERY_KEYS.COMMON_STORE_LIST, lat, lng, sort, itemTagId],
    queryFn: () => apis.readCommonStoreList(params),
    enabled: !!params.lat && !!params.lng && !!params.sort,
  });
};

export const useStoreDetailQuery = (params: serviceTypes.ReadCommonStoreDetailParams) =>
  useQuery({
    queryKey: [COMMON_QUERY_KEYS.COMMON_STORE_DETAIL, params.storeId],
    queryFn: () => apis.readCommonStoreDetail(params),
    enabled: !!params.storeId,
    placeholderData: (prev) => prev,
  });

export const useItemTagsQuery = () =>
  useQuery({
    queryKey: [COMMON_QUERY_KEYS.COMMON_ITEM_TAGS],
    queryFn: () => apis.readCommonItemTags(),
    select: (res) => res.itemTags,
  });

export const useDashboardMutation = () =>
  useMutation({
    mutationFn: (payload: serviceTypes.CreateCommonDashboardPayload) => apis.createCommonDashboard(payload),
  });
