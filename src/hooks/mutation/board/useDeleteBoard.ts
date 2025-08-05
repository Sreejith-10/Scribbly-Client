import { deleteBoard } from '@/controllers/board';
import { useMutation } from '@tanstack/react-query';

export const useDeleteBoard = () => {
  return useMutation({
    mutationFn: (id: string) => deleteBoard(id),
    onMutate: () => {},
    onError: (error, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  });
};
