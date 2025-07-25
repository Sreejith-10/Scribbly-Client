import { getCurrentUserCollaborationReuests } from '@/controllers/collaboration-request';
import { queryKeys } from '@/lib/query-keys';
import { IBoard, ICollaborationRequest } from '@/types';
import { IUser } from '@/types/user.type';
import { useQuery } from '@tanstack/react-query';

interface IUserCollabRequest extends ICollaborationRequest {
  board: IBoard[];
  owner: IUser[];
}

export const useCurrentUserRequests = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.collaborationRequests.byUser(userId),
    queryFn: () =>
      getCurrentUserCollaborationReuests<IUserCollabRequest[]>(userId),
    enabled: !!Boolean(userId),
  });
};
