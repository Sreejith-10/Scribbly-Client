import { updateCollaboratorRole } from '@/controllers/collaborators';
import { queryClient } from '@/lib';
import { queryKeys } from '@/lib/query-keys';
import { ICollaborator } from '@/types';
import { useMutation } from '@tanstack/react-query';

type UpdateCollaboratorRoleType = {
  boardId: string;
  userId: string;
  role: 'view' | 'edit';
};

export const useUpdateCollaboratorRole = () => {
  return useMutation({
    mutationFn: ({ boardId, userId, role }: UpdateCollaboratorRoleType) =>
      updateCollaboratorRole(boardId, userId, role),
    onMutate: (variables) => {
      const previousState = queryClient.getQueryData(
        queryKeys.collaborators.byBoard(variables.boardId),
      );

      queryClient.setQueryData(
        queryKeys.collaborators.byBoard(variables.boardId),
        (old: { collaborators: ICollaborator[] }) => {
          return {
            ...old,
            collaborators: old.collaborators.map((c) =>
              c.userId === variables.userId
                ? { ...c, role: variables.role }
                : c,
            ),
          };
        },
      );

      return { previousState };
    },
    onError: (error, variables, context) => {
      if (context?.previousState)
        queryClient.setQueryData(
          queryKeys.collaborators.byBoard(variables.boardId),
          context.previousState,
        );
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.collaborators.byBoard(variables.boardId),
      });
    },
  });
};
