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
}));
