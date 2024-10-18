export interface CreateCommonDashboardPayload {
  storeId: number;
  dashboardType: DashboardType;
}

export type ReadCommonItemTagsResponse = ResponseDTO<{ itemTags: ItemTag[] }>;
export type CreateCommonDashboardResponse = ResponseDTO;

// 대시보드 타입(STORE_COUNT: 조회, STORE_CALL: 전화, STORE_SHARE: 공유하기)
export type DashboardType = 'STORE_COUNT' | 'STORE_CALL' | 'STORE_SHARE';
