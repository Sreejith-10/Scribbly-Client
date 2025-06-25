import {BOARD_METADATA_QUERY_KEY} from "@/constant";
import {getBoardMetadataByBoardId} from "@/controllers/board";
import { AccessMode } from "@/types";
import {useQuery} from "@tanstack/react-query";

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
	collaborators: Owner[];
	createdAt: Date;
	updatedAt: Date;
	owner: Owner;
}

export interface Owner {
	_id: string;
	username: string;
	email: string;
	avatarUrl: null;
	createdAt: Date;
	updatedAt: Date;
}

export const useBoardMetadata = (id: string) => {
	const {data: boardMetadata, isLoading: boardMetadataLoading} =
		useQuery<MainBoardMetadata>({
			queryKey: [BOARD_METADATA_QUERY_KEY, id],
			queryFn: () => getBoardMetadataByBoardId(id),
		});

	return {boardMetadata: boardMetadata?.boardMetadata, boardMetadataLoading};
};
