import { getBoardMetadata } from '@/controllers/board';
import { queryKeys } from '@/lib/query-keys';
import { IBoardMetadata } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// export interface IMainBoardMetadata {
// 	boardMetadata: BoardMetadata;
// }

// export interface BoardMetadata {
// 	_id: string;
// 	boardId: string;
// 	ownerId: string;
// 	title: string;
// 	description: string;
// 	boardThumbnail: null;
// 	accessMode: AccessMode;
// 	collaborators: IUser[];
// 	createdAt: Date;
// 	updatedAt: Date;
// 	owner: IUser;
// }

export const useBoardMetadatas = (query: string = 'all') => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: queryKeys.boardMetadatas.query(query),
    queryFn: () => getBoardMetadata<IBoardMetadata[]>(query),
    enabled: !!queryClient.getQueryData(queryKeys.user.u),
  });
};
