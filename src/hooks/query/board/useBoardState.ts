import {getBoardState} from "@/controllers/board";
import {queryKeys} from "@/lib/query-keys";
import {IBoardState} from "@/types";
import {useQuery} from "@tanstack/react-query";

export const useBoardState = (id: string) => {
	return useQuery({
		queryKey: queryKeys.boards.detail(id),
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
