import {Shape} from "@/types/shapes.types";
import {IToolbar} from "@/types/toolbar.types";
import {create} from "zustand";

export interface IBoardStore {
	shapes: Shape[];
	setShapes: (shapes: Shape[]) => void;
	addShape: (shape: Shape) => void;
	removeShape: (shapeId: string) => void;
	currentShapeSelected: string | null;
	setCurrentShapeSelected: (shapeId: string) => void;
	updateCurrentShapeSelected: ({
		stroke,
		strokeWidth,
		fill,
		borderRadius,
	}: Partial<
		Pick<IToolbar, "stroke" | "strokeWidth" | "fill" | "borderRadius">
	>) => void;
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
	setCurrentShapeSelected: (shapeId) => {
		set(() => ({
			currentShapeSelected: shapeId,
		}));
	},
	updateCurrentShapeSelected: (attr) => {
		set((state) => ({
			shapes: state.shapes.map((shape) =>
				shape.id === state.currentShapeSelected ? {...shape, ...attr} : shape
			),
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

// [1,2,3,4,5]
