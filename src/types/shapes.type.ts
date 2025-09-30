import {
  RectState,
  CircleState,
  LineState,
  ArrowState,
  ScribbleState,
  ActionType,
  TextState,
} from './canvas.type';

export type Shape = {
  id: string;
  type: ActionType;
} & (
  | RectState
  | CircleState
  | LineState
  | ArrowState
  | ScribbleState
  | TextState
);
