import {
	RectState,
	CircleState,
	LineState,
	ArrowState,
	ScribbleState,
	ActionType,
} from "./canvas.types";

export type Shape = {
	id: string;
	type: ActionType;
} & (RectState | CircleState | LineState | ArrowState | ScribbleState);
