import { deleteBoard } from '@/controllers/board';
import { queryClient } from '@/lib';
import { queryKeys } from '@/lib/query-keys';
import { IBoardMetadata } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useDeleteBoard = () => {
	return useMutation({
		mutationFn: (id: string) => deleteBoard(id),
		onMutate: (id: string) => {
			const metadatas = queryClient.getQueryData<{
				boardMetadatas: IBoardMetadata[];
			}>(queryKeys.boardMetadatas.query('all'));
			const updatedMetadatas = metadatas?.boardMetadatas.filter(
				(meta) => meta.boardId !== id,
			);
			queryClient.setQueryData(
				queryKeys.boardMetadatas.query('all'),
				updatedMetadatas,
			);

			return { metadatas };
		},
		onError: (error, variables, context) => {
			queryClient.setQueryData(
				queryKeys.boardMetadatas.query('all'),
				context?.metadatas,
			);
		},
		onSettled: (data, error, variables, context) => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.boardMetadatas.query('all'),
			});
		},
	});
};
