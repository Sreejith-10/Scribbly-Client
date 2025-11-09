import { removeCollaborationRequest } from '@/controllers/collaboration-request';
import { queryClient } from '@/lib';
import { queryKeys } from '@/lib/query-keys';
import { useMutation } from '@tanstack/react-query';
import { IBoard, ICollaborationRequest } from '@/types';
import { IUser } from '@/types';

type MutationValuesType = {
  boardId: string;
  userId: string;
};

interface IUserCollabRequest extends ICollaborationRequest {
  board: IBoard[];
  owner: IUser[];
}

export const useRemoveRequest = () => {
  return useMutation({
    mutationFn: (values: MutationValuesType) =>
      removeCollaborationRequest(values.boardId),
    onMutate: (variables) => {
      const previousData = queryClient.getQueryData(
        queryKeys.collaborationRequests.byUser(variables.userId),
      );

      queryClient.setQueryData(
        queryKeys.collaborationRequests.byUser(variables.boardId),
        (old: IUserCollabRequest[]) => {
          return old.filter((req) => req.boardId !== variables.boardId);
        },
      );

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          queryKeys.collaborationRequests.byUser(variables.userId),
          context.previousData,
        );
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.collaborationRequests.byUser(variables.userId)],
      });
    },
  });
};
