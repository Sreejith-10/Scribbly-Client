import {
	RectState,
	CircleState,
	LineState,
	ArrowState,
	ScribbleState,
	ActionType,
} from './canvas.type';

export type Shape = {
	id: string;
	type: ActionType;
} & (RectState | CircleState | LineState | ArrowState | ScribbleState);
