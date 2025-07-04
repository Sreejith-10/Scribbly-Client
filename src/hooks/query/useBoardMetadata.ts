import {BOARD_METADATAS_QUERY_KEY, USER_STATE_QUERY_KEY} from "@/constant";
import {getBoardMetadata} from "@/controllers/board";
import {AccessMode, IBoardMetadata} from "@/types";
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

export const useBoardMetadata = (query: string = "all") => {
	const queryClient = useQueryClient();

	return useQuery({
		queryKey: [BOARD_METADATAS_QUERY_KEY, query],
		queryFn: () => getBoardMetadata<{boardMetadatas: IBoardMetadata[]}>(query),
		enabled: !!queryClient.getQueryData([USER_STATE_QUERY_KEY]),
	});
};
