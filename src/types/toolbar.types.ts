import {ActionType, StrokeWidth} from "@/types/canvas.types";

export interface IToolbar {
	action: ActionType;
	setAction: (type: ActionType) => void;
	isShapeSelected: boolean;
	setIsShapeSelected: (selected: boolean) => void;
	stroke: string;
	setStroke: (stroke: string) => void;
	fill: string;
	setFill: (fill: string) => void;
	strokeWidth: StrokeWidth;
	setStrokeWidth: (strokeW: StrokeWidth) => void;
	borderRadius: number;
	setBorderRadius: (borderR: number) => void;
	toolSelected: boolean;
	setToolSelected: (selected: boolean) => void;
}
