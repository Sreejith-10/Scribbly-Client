import { rejectRequest } from '@/controllers/collaboration-request';
import { queryClient } from '@/lib';
import { queryKeys } from '@/lib/query-keys';
import { ICollaborationRequest } from '@/types';
import { useMutation } from '@tanstack/react-query';

type MutationValuesType = {
  boardId: string;
  requestedUserId: string;
};

export const useRejectRequest = () => {
  return useMutation({
    mutationFn: (values: MutationValuesType) =>
      rejectRequest(values.boardId, values.requestedUserId),
    onMutate: (variables) => {
      const previousData = queryClient.getQueryData(
        queryKeys.collaborationRequests.byBoard(variables.boardId),
      );

      queryClient.setQueryData(
        queryKeys.collaborationRequests.byBoard(variables.boardId),
        (old: { requests: ICollaborationRequest[] }) =>
          old.requests.filter(
            (req) => req.userId !== variables.requestedUserId,
          ),
      );

      return { previousData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        queryKeys.collaborationRequests.byBoard(variables.boardId),
        context?.previousData,
      );
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.collaborationRequests.byBoard(variables.boardId)],
      });
    },
  });
};
