import { RTK_STALE_TIME } from '@/constant';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: RTK_STALE_TIME } },
});
