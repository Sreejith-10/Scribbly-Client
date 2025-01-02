import {ShapeConfig} from "konva/lib/Shape";

export interface IShape extends ShapeConfig {
	id: string;
}

export interface IBorad {
	userId: number;
	boardId: string;
	shapes: IShape[];
	createdAt: number;
	updatedAt: number;
}
