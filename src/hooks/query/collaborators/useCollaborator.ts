import { getCollborator } from '@/controllers/collaborators';
import { queryKeys } from '@/lib/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useCollaborator = (boardId: string, userId: string) => {
	return useQuery({
		queryKey: queryKeys.collaborators.byUserBoard(boardId, userId),
		queryFn: () => getCollborator(boardId, userId),
		enabled: !!Boolean(boardId) && !!Boolean(userId),
	});
};
