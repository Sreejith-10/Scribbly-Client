import {getBoardMetadataByBoardId} from "@/controllers/board";
import {queryKeys} from "@/lib/query-keys";
import {AccessMode} from "@/types";
import {IUser} from "@/types/user.type";
import {useQuery} from "@tanstack/react-query";

export interface BoardMetadata {
	_id: string;
	boardId: string;
	ownerId: string;
	title: string;
	description: string;
	boardThumbnail: null;
	accessMode: AccessMode;
	collaborators: IUser[];
	createdAt: string;
	updatedAt: string;
	owner: IUser;
}

export const useBoardMetadata = (id: string) => {
	return useQuery({
		queryKey: queryKeys.boardMetadatas.byBoard(id),
		queryFn: () => getBoardMetadataByBoardId<BoardMetadata>(id!),
		enabled: !!Boolean(id),
	});
};
