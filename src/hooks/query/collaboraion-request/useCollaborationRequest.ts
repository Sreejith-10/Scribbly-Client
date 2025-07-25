import { getCollabReqByBoardId } from '@/controllers/collaboration-request';
import { queryKeys } from '@/lib/query-keys';
import { IUser } from '@/types/user.type';
import { useQuery } from '@tanstack/react-query';

interface ICollaborationRequest {
  boardId: string;
  userId: string;
  requestedAt: string;
  status: 'pending' | 'rejected' | 'accepted';
  user: IUser;
}

export const useCollaborationRequest = (id: string) => {
  return useQuery({
    queryKey: queryKeys.collaborators.byBoard(id),
    queryFn: () => getCollabReqByBoardId<ICollaborationRequest[]>(id),
    enabled: !!Boolean(id),
  });
};
