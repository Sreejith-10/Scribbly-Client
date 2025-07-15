import {Shape} from "@/types/shapes.type";
import {create} from "zustand";

export interface IBoardStore {
	shapes: Shape[];
	setShapes: (shapes: Shape[]) => void;
	addShape: (shape: Shape) => void;
	removeShape: (shapeId: string) => void;
	currentShapeSelected: Shape | null;
	setCurrentShapeSelected: (shape: Shape) => void;
	removeSelectedShape: () => void;
	changeShapeLayer: (shapeId: string, positionToBeMoved: number) => void;
}

export const useBoardStore = create<IBoardStore>((set) => ({
	shapes: [],
	setShapes: (shapes) => {
		set({shapes: [...shapes]});
	},
	addShape: (shape) => {
		set((state) => ({
			shapes: [...state.shapes, shape],
		}));
	},
	removeShape: (shapeId) => {
		set((state) => ({
			shapes: state.shapes.filter((shape) => shape.id !== shapeId),
		}));
	},
	currentShapeSelected: null,
	setCurrentShapeSelected: (shape) => {
		set(() => ({
			currentShapeSelected: shape,
		}));
	},
	removeSelectedShape: () => {
		set({currentShapeSelected: null});
	},
	changeShapeLayer: (shapeId, positionToBeMoved) => {
		set((state) => {
			const shapeIndex = state.shapes.findIndex(
				(shape) => shape.id === shapeId
			);
			if (shapeIndex <= 0 || shapeIndex >= state.shapes.length - 1) return {};

			const previousOrAfterShape =
				state.shapes[
					shapeIndex -
						(positionToBeMoved > shapeIndex ? shapeIndex + 1 : shapeIndex - 1)
				];

			const shapeToBeMoved = state.shapes[shapeIndex];

			const copyShapesArray = [...state.shapes];

			copyShapesArray[positionToBeMoved] = shapeToBeMoved;
			copyShapesArray[shapeIndex] = previousOrAfterShape;

			return {shapes: [...copyShapesArray]};
		});
	},
}));
