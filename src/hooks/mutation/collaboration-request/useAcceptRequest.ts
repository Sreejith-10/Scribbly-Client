import { acceptRequest } from '@/controllers/collaboration-request';
import { queryClient } from '@/lib';
import { queryKeys } from '@/lib/query-keys';
import { ICollaborationRequest } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useAcceptRequest = () => {
	return useMutation({
		mutationFn: (values: { boardId: string; userId: string }) =>
			acceptRequest(values.boardId, values.userId),
		// onMutate: async (variables) => {
		// 	await queryClient.cancelQueries({
		// 		queryKey: queryKeys.collaborationRequests.byBoard(variables.boardId),
		// 	});

		// 	const previousData = queryClient.getQueryData(
		// 		queryKeys.collaborationRequests.byBoard(variables.boardId)
		// 	);

		// 	queryClient.setQueryData(
		// 		queryKeys.collaborationRequests.byBoard(variables.boardId),
		// 		(old: {requests: ICollaborationRequest[]}) => ({
		// 			...old,
		// 			requests: old.requests.filter(
		// 				(request) => request.userId !== variables.userId
		// 			),
		// 		})
		// 	);

		// 	return {previousData};
		// },
		// onError: (error, variables, context) => {
		// 	if (context?.previousData) {
		// 		queryClient.setQueryData(
		// 			queryKeys.collaborationRequests.byBoard(variables.boardId),
		// 			context.previousData
		// 		);
		// 	}
		// },
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.collaborationRequests.byBoard(
					variables.boardId,
				),
			});
		},
	});
};
