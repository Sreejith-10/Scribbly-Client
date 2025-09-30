import { removeCollaborator } from '@/controllers/collaborators';
import { queryClient } from '@/lib';
import { queryKeys } from '@/lib/query-keys';
import { ICollaborator } from '@/types';
import { useMutation } from '@tanstack/react-query';

type ValuesType = {
  boardId: string;
  userId: string;
};

export const useRemoveCollaboraotr = () => {
  return useMutation({
    mutationFn: (values: ValuesType) =>
      removeCollaborator(values.boardId, values.userId),

    onMutate: async (variables) => {
      const previousData = queryClient.getQueryData(
        queryKeys.collaborators.byBoard(variables.boardId),
      );
      queryClient.setQueryData(
        queryKeys.collaborators.byBoard(variables.boardId),
        (oldData: { collaborator: ICollaborator[] }) => {
          return oldData?.collaborator?.filter(
            (collaborator) => collaborator.userId !== variables.userId,
          );
        },
      );
      return { previousData };
    },
    onError: (error, variables, context) => {
      // Revert back to previous data on error
      if (context?.previousData) {
        queryClient.setQueryData(
          queryKeys.collaborators.byBoard(variables.boardId),
          context.previousData,
        );
      }
      console.error('Error occurred during mutation:', error);
    },
  });
};
