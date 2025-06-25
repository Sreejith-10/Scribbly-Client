import {ShapeConfig} from "konva/lib/Shape";
import {Shape} from "./shapes.types";
import {AccessMode} from "./common";

export interface IShape extends ShapeConfig {
	id: string;
}

export interface IBoard {
	_id: string;
	ownerId: string;
	title: string;
	description: string | null;
	shapes: Shape[];
	accessMode: AccessMode;
	collaborators: string[];
	createdAt: string;
	updatedAt: string;
}

export interface IBoardMetadata extends Omit<IBoard, "shapes"> {
	boardId: string;
	boardThumbnail: string | null;
}

export type Snapshot = {
	shapes: Record<PropertyKey, Shape>;
	version: number;
};

export type Deltas = {
	author: string;
	data: Shape;
	operation: "create" | "update" | "delete";
	sequence: number;
	shapeId: string;
	timestamp: Date;
};

export type CurrentState = Record<PropertyKey, Shape>;

export interface IBoardState {
	snapshot: Snapshot;
	deltas: Deltas[];
	currentState: CurrentState;
}

export type Operation = "create" | "update" | "delete" | "move" | "resize";

export interface DeltaProp {
	data: Shape;
	operation: Operation;
}
