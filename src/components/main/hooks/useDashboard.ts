import { useMutation } from '@tanstack/react-query';
import { createCommonDashboard } from '~/api/common/commonApi';
import { CreateCommonDashboardPayload, DashboardType } from '~/api/common/commonApi.types';

const useDashboard = () => {
  const { mutateAsync: submit } = useMutation({
    mutationFn: createCommonDashboard,
  });

  const sendDashboardEvent = async (storeId: number, dashboardType: DashboardType) => {
    const payload: CreateCommonDashboardPayload = { storeId, dashboardType };

    try {
      await submit(payload);
    } catch (e) {
      console.error(e);
    }
  };

  return { sendDashboardEvent };
};
export default useDashboard;
