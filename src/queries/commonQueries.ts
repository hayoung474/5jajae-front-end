import { createQueryKeys } from '@lukemorales/query-key-factory';
import * as apis from '~/api/common/commonApi';

export const commonQueries = createQueryKeys('common', {
  itemTags: { queryKey: null, queryFn: () => apis.readCommonItemTags() },
});
