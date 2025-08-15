import { ShapeConfig } from 'konva/lib/Shape';
import { Shape } from './shapes.type';
import { AccessMode } from './common';
import { IUser } from './user.type';

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

export interface IBoardMetadata extends Omit<IBoard, 'shapes'> {
	boardId: string;
	boardThumbnail: string | null;
	owner: IUser;
}

export type Snapshot = {
	shapes: Record<PropertyKey, Shape>;
	version: number;
};

export type Deltas = {
	author: string;
	data: Shape;
	operation: 'create' | 'update' | 'delete';
	sequence: number;
	shapeId: string;
	timestamp: string;
};

export type CurrentState = Record<PropertyKey, Shape>;

export interface IBoardState {
	snapshot: Snapshot;
	deltas: Deltas[];
	currentState: CurrentState;
}

export type Operation = 'create' | 'update' | 'delete' | 'free' | 'resize';

export interface DeltaProp {
	data: Shape;
	operation: Operation;
}
