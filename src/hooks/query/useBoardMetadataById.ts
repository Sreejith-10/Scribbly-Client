import {BOARD_METADATA_QUERY_KEY, USER_STATE_QUERY_KEY} from "@/constant";
import {getBoardMetadataByBoardId} from "@/controllers/board";
import {AccessMode} from "@/types";
import {IUser} from "@/types/user.type";
import {useQuery, useQueryClient} from "@tanstack/react-query";

export interface MainBoardMetadata {
	boardMetadata: BoardMetadata;
}

export interface BoardMetadata {
	_id: string;
	boardId: string;
	ownerId: string;
	title: string;
	description: string;
	boardThumbnail: null;
	accessMode: AccessMode;
	collaborators: IUser[];
	createdAt: Date;
	updatedAt: Date;
	owner: IUser;
}

export const useBoardMetadataById = (id: string) => {
	const queryClient = useQueryClient();

	return useQuery<MainBoardMetadata>({
		queryKey: [BOARD_METADATA_QUERY_KEY, id],
		queryFn: () => getBoardMetadataByBoardId(id!),
		enabled: !!queryClient.getQueryData([USER_STATE_QUERY_KEY]),
	});
};
