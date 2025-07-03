import {
	addShape,
	updateShape,
	deleteShape,
	createSnapShot,
} from "@/controllers/board";
import {IBoardState, Shape} from "@/types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {BOARD_STATE_QUERY_KEY} from "@/constant";

export const useShapeActions = (id: string) => {
	const queryClient = useQueryClient();

	const addNewShape = useMutation({
		mutationFn: (shape: Shape) => addShape(id, shape),
		onMutate: (shape) => {
			return queryClient.setQueryData(
				[BOARD_STATE_QUERY_KEY, id],
				(old: IBoardState) => ({
					...old,
					currentState: {...old.currentState, [shape.id]: {...shape}},
				})
			);
		},
	});

	const editShape = useMutation({
		mutationFn: (shape: Shape) => updateShape(id, shape),
		onMutate: (shape) => {
			const state = queryClient.getQueryData<IBoardState>([
				BOARD_STATE_QUERY_KEY,
				id,
			]);
			if (state) state.currentState[shape.id] = {...shape};
			queryClient.setQueryData(
				[BOARD_STATE_QUERY_KEY, id],
				(old: IBoardState) => ({
					...old,
					currentState: {...old.currentState},
				})
			);
		},
	});

	const removeShape = useMutation({
		mutationFn: (shape: Shape) => deleteShape(id, shape.id),
		onMutate: (shape) => {
			const state = queryClient.getQueryData<IBoardState>([
				BOARD_STATE_QUERY_KEY,
				id,
			]);
			delete state?.currentState[shape.id];
			queryClient.setQueryData(
				[BOARD_STATE_QUERY_KEY, id],
				(old: IBoardState) => ({
					...old,
					currentState: {...state?.currentState},
				})
			);
		},
	});

	const snapShot = useMutation({
		mutationFn: () => createSnapShot(id),
		onMutate: () => {
			queryClient.setQueryData(
				[BOARD_STATE_QUERY_KEY, id],
				(old: IBoardState) => ({
					...old,
					deltas: [],
				})
			);
		},
		onSuccess: () => {
			toast.success("board saved");
		},
	});

	const resizeShape = useMutation({
		mutationFn: (shape: Shape) => updateShape(id, shape),
		onMutate: (shape) => {
			queryClient.setQueryData(
				[BOARD_STATE_QUERY_KEY, id],
				(old: IBoardState) => ({
					...old,
					currentState: {...old.currentState, [shape.id]: {...shape}},
					// Delta is needed to be updated here
				})
			);
		},
	});

	const moveShape = useMutation({
		mutationFn: (shape: Shape) => updateShape(id, shape),
		onMutate: (shape) => {
			queryClient.setQueryData(
				[BOARD_STATE_QUERY_KEY, id],
				(old: IBoardState) => ({
					...old,
					currentState: {...old.currentState, [shape.id]: {...shape}},
					// Delta is needed to be updated here
				})
			);
		},
	});

	return {
		addNewShape,
		editShape,
		removeShape,
		snapShot,
		resizeShape,
		moveShape,
	};
};
