import { getRequestStatus } from '@/controllers/collaboration-request';
import { queryKeys } from '@/lib/query-keys';
import { ICollaborationRequest } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useRequestStatus = (boardId: string, userId: string) => {
  return useQuery({
    queryKey: queryKeys.collaborationRequests.status(boardId, userId),
    queryFn: () =>
      getRequestStatus<
        Pick<ICollaborationRequest, 'status' | 'requestCount' | 'updatedAt'>
      >(boardId, userId),
  });
};
