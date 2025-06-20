import {BOARD_STATE} from "@/constant";
import {
	getBoardState,
	addShape,
	updateShape,
	deleteShape,
} from "@/controllers/board";
import {IBoardState, Shape} from "@/types";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export const useBoardState = (id: string) => {
	const queryClient = useQueryClient();

	const {data: currentState} = useQuery({
		queryKey: [BOARD_STATE, id],
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

	const {mutate: addNewShape} = useMutation({
		mutationFn: (shape: Shape) => addShape(id, shape),
		onMutate: (state) => {
			console.log({currentState: state});
		},
	});

	return {currentState, addNewShape};
};
