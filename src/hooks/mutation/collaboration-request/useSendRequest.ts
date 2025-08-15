import { sendCollabReq } from '@/controllers/collaboration-request';
import { useMutation } from '@tanstack/react-query';

export const useSendRequest = () => {
	return useMutation({
		mutationFn: (boardId: string) => sendCollabReq(boardId),
	});
};
