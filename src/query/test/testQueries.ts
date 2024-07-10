import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { testApi } from './test';

export const useTestQuery = () => {
  return useQuery({
    queryKey: ['test'],
    queryFn: () => testApi(),
    placeholderData: (prev) => prev,
  });
};

export const useTestSuspenseQuery = () => {
  return useSuspenseQuery({
    queryKey: ['test'],
    queryFn: () => testApi(),
  });
};
