import Konva from "konva";

export enum ActionType {
	MOVE = "move",
	FREE = "free",
	SELECT = "select",
	RECTANGLE = "rectangle",
	CIRCLE = "circle",
	DIAMOND = "diamond",
	ARROW = "arrow",
	LINE = "line",
	PENCIL = "pencil",
	TEXT = "text",
	IMAGE = "image",
	ERASER = "eraser",
}

export interface RectState extends Konva.RectConfig {
	id: string;
}

export interface CircleState extends Konva.CircleConfig {
	id: string;
}

export interface LineState extends Konva.LineConfig {
	id: string;
}

export interface ArrowState extends Konva.ArrowConfig {
	id: string;
}

export interface ScribbleState extends Konva.LineConfig {
	id: string;
	points: number[];
}

export enum StrokeWidth {
	NORMAL = 5,
	MEDIUM = 10,
	THICK = 15,
}
