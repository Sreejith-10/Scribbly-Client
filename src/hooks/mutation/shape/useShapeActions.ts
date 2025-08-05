import {
  addShape,
  updateShape,
  deleteShape,
  createSnapShot,
  undoShape,
  redoShape,
  resetBoard,
} from '@/controllers/board';
import { queryClient } from '@/lib';
import { queryKeys } from '@/lib/query-keys';
import { IBoardState, Shape } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useShapeActions = (id: string) => {
  const addNewShape = useMutation({
    mutationFn: (shape: Shape) => addShape(id, shape),
    onMutate: (shape) => {
      return queryClient.setQueryData(
        queryKeys.boards.detail(id),
        (old: IBoardState) => ({
          ...old,
          currentState: { ...old.currentState, [shape.id]: { ...shape } },
        }),
      );
    },
  });

  const editShape = useMutation({
    mutationFn: (shape: Shape) => updateShape(id, shape),
    onMutate: (shape) => {
      const state = queryClient.getQueryData<IBoardState>(
        queryKeys.boards.detail(id),
      );
      if (state) state.currentState[shape.id] = { ...shape };
      queryClient.setQueryData(
        queryKeys.boards.detail(id),
        (old: IBoardState) => ({
          ...old,
          currentState: { ...old.currentState },
        }),
      );
    },
  });

  const removeShape = useMutation({
    mutationFn: (shape: Shape) => deleteShape(id, shape.id),
    onMutate: (shape) => {
      const previousState = queryClient.getQueryData<IBoardState>(
        queryKeys.boards.detail(id),
      );

      if (!previousState) return { previousState: null };

      const newState = {
        ...previousState,
        currentState: { ...previousState.currentState },
      };
      delete newState.currentState[shape.id];
      queryClient.setQueryData(queryKeys.boards.detail(id), newState);

      return { previousState };
    },
    onError: (error, variables, context) => {
      if (context?.previousState) {
        queryClient.setQueryData(
          queryKeys.boards.detail(id),
          context.previousState,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.boards.detail(id) });
    },
  });

  const snapShot = useMutation({
    mutationFn: () => createSnapShot(id),
    onMutate: () => {
      queryClient.setQueryData(
        queryKeys.boards.detail(id),
        (old: IBoardState) => ({
          ...old,
          deltas: [],
        }),
      );
    },
    onSuccess: () => {
      toast.success('board saved');
    },
  });

  const resizeShape = useMutation({
    mutationFn: (shape: Shape) => updateShape(id, shape),
    onMutate: (shape) => {
      queryClient.setQueryData(
        queryKeys.boards.detail(id),
        (old: IBoardState) => ({
          ...old,
          currentState: { ...old.currentState, [shape.id]: { ...shape } },
          // Delta is needed to be updated here
        }),
      );
    },
  });

  const moveShape = useMutation({
    mutationFn: (shape: Shape) => updateShape(id, shape),
    onMutate: (shape) => {
      queryClient.setQueryData(
        queryKeys.boards.detail(id),
        (old: IBoardState) => ({
          ...old,
          currentState: { ...old.currentState, [shape.id]: { ...shape } },
          // Delta is needed to be updated here
        }),
      );
    },
  });

  const undo = useMutation({
    mutationFn: (shapeId: string) => undoShape(shapeId),
    onMutate: (shapeId: string) => {
      const previousState = queryClient.getQueryData<IBoardState>(
        queryKeys.boards.detail(id),
      );

      if (!previousState) return { previousState: null };

      const newState = {
        ...previousState,
        currentState: { ...previousState.currentState },
      };
      delete newState.currentState[shapeId];
      queryClient.setQueryData(queryKeys.boards.detail(id), newState);

      return { previousState };
    },
    onError: (error, variables, context) => {
      if (error) {
        toast.error(error.message);
      }
      if (context?.previousState) {
        queryClient.setQueryData(
          queryKeys.boards.detail(id),
          context.previousState,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.boards.detail(id) });
    },
  });

  const redo = useMutation({
    mutationFn: (shapeId: string) => redoShape(shapeId),
    onMutate: (shapeId: string) => {
      const previousState = queryClient.getQueryData<IBoardState>(
        queryKeys.boards.detail(id),
      );

      if (!previousState) return { previousState: null };

      const newState = {
        ...previousState,
        currentState: { ...previousState.currentState },
      };
      delete newState.currentState[shapeId];
      queryClient.setQueryData(queryKeys.boards.detail(id), newState);

      return { previousState };
    },
    onError: (error, variables, context) => {
      if (error) {
        toast.error(error.message);
      }
      if (context?.previousState) {
        queryClient.setQueryData(
          queryKeys.boards.detail(id),
          context.previousState,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.boards.detail(id) });
    },
  });

  const reset = useMutation({
    mutationFn: (boardId: string) => resetBoard(boardId),
    onMutate: (boardId: string) => {
      const previousState = queryClient.getQueryData(
        queryKeys.boards.detail(boardId),
      );

      queryClient.setQueryData(
        queryKeys.boards.detail(boardId),
        (old: any) => ({
          deltas: [],
          currentState: {},
          snapShot: {},
        }),
      );

      return { previousState };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        queryKeys.boards.detail(id),
        context?.previousState,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.boards.detail(id) });
    },
  });

  return {
    addNewShape,
    editShape,
    removeShape,
    snapShot,
    resizeShape,
    moveShape,
    undo,
    redo,
    reset,
  };
};
