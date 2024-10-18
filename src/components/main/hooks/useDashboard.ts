import { CreateCommonDashboardPayload, DashboardType } from '~/api/common/commonApi.types';
import { useDashboardMutation } from '~/query/common/commonQueries';

const useDashboard = () => {
  const dashboardMutation = useDashboardMutation();

  const sendDashboardEvent = (storeId: number, dashboardType: DashboardType) => {
    const payload: CreateCommonDashboardPayload = { storeId, dashboardType };
    dashboardMutation.mutate(payload);
  };

  return { sendDashboardEvent };
};
export default useDashboard;
