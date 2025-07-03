import {BOARD_STATE_QUERY_KEY} from "@/constant";
import {getBoardState} from "@/controllers/board";
import {IBoardState} from "@/types";
import {useQuery} from "@tanstack/react-query";

export const useBoardState = (id: string) => {
	return useQuery({
		queryKey: [BOARD_STATE_QUERY_KEY, id],
		queryFn: () => getBoardState<IBoardState>(id),
		initialData: {
			currentState: {},
			deltas: [],
			snapshot: {
				shapes: {},
				version: 0,
			},
		},
	});
};
