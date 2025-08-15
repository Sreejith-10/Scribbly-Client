'use client';

import { getCollaboratorsByBoadId } from '@/controllers/collaborators';
import { queryKeys } from '@/lib/query-keys';
import { ICollaborator } from '@/types';
import { IUser } from '@/types/user.type';
import { useQuery } from '@tanstack/react-query';

interface ICollaborationResponse extends ICollaborator {
	user: IUser;
}

export const useCollaborators = (id: string) => {
	return useQuery({
		queryKey: queryKeys.collaborators.byBoard(id),
		queryFn: () => getCollaboratorsByBoadId<ICollaborationResponse[]>(id),
		enabled: !!Boolean(id),
	});
};
