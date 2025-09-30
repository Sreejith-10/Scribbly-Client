import { createBoard } from '@/controllers/board';
import { queryClient } from '@/lib';
import { queryKeys } from '@/lib/query-keys';
import { AccessMode, IBoard } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useCreateBoard = () => {
  return useMutation({
    mutationFn: ({
      title,
      description,
      accessMode,
    }: {
      title: string;
      description?: string;
      accessMode: AccessMode;
    }) => createBoard<IBoard>(title, description, accessMode),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.boardMetadatas.query('all'),
      });
    },
  });
};
