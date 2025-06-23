import {BOARD_STATE} from "@/constant";
import {
	getBoardState,
	addShape,
	updateShape,
	deleteShape,
	createSnapShot,
} from "@/controllers/board";
import {IBoardState, Shape} from "@/types";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

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
		onMutate: (shape) => {
			queryClient.setQueryData([BOARD_STATE, id], (old: IBoardState) => ({
				...old,
				currentState: {...old.currentState, [shape.id]: {...shape}},
			}));
		},
	});

	const {mutate: editShape} = useMutation({
		mutationFn: (shape: Shape) => updateShape(id, shape),
		onMutate: (shape) => {
			const state = queryClient.getQueryData<IBoardState>([BOARD_STATE, id]);
			if (state) state.currentState[shape.id] = {...shape};
			queryClient.setQueryData([BOARD_STATE, id], (old: IBoardState) => ({
				...old,
				currentState: {...old.currentState},
			}));
		},
	});

	const {mutate: removeShape} = useMutation({
		mutationFn: (shape: Shape) => deleteShape(id, shape.id),
		onMutate: (shape) => {
			const state = queryClient.getQueryData<IBoardState>([BOARD_STATE, id]);
			delete state?.currentState[shape.id];
			queryClient.setQueryData([BOARD_STATE, id], (old: IBoardState) => ({
				...old,
				currentState: {...state?.currentState},
			}));
		},
	});

	const {mutate: snapShot} = useMutation({
		mutationFn: () => createSnapShot(id),
		onMutate: () => {
			queryClient.setQueryData([BOARD_STATE, id], (old: IBoardState) => ({
				...old,
				deltas: [],
			}));
		},
		onSuccess: () => {
			toast.success("board saved");
		},
	});

	return {currentState, addNewShape, editShape, removeShape, snapShot};
};
