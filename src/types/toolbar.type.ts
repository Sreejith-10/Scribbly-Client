import { ActionType, StrokeWidth } from '@/types/canvas.type';

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
	tension: number;
	setTension: (tension: number) => void;
}
