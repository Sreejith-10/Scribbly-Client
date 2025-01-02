import {cn} from "@/lib/utils";
import {
	ActionType,
	ArrowState,
	CircleState,
	LineState,
	RectState,
	ScribbleState,
	StrokeWidth,
} from "@/types/canvas.type";
import Konva from "konva";
import {KonvaEventObject} from "konva/lib/Node";
import {Dispatch, SetStateAction, useRef, useState} from "react";
import {
	Stage,
	Layer,
	Rect,
	Circle,
	Arrow,
	Line,
	Transformer,
} from "react-konva";

interface CanvasProps {
	action?: ActionType;
	width?: number;
	height?: number;
	className?: string;
	stroke: string;
	setStroke: Dispatch<SetStateAction<string>>;
	backgroundColor: string;
	setBackgroundColor: Dispatch<SetStateAction<string>>;
	strokeWidth: StrokeWidth;
	setStrokeWidth: Dispatch<SetStateAction<StrokeWidth>>;
	setShapeSelected: Dispatch<SetStateAction<boolean>>;
}

const Canvas = ({
	width = 1000,
	height = 1000,
	className,
	action,
	stroke,
	setStroke,
	backgroundColor,
	setBackgroundColor,
	strokeWidth,
	setStrokeWidth,
	setShapeSelected,
}: Readonly<CanvasProps>) => {
	const [rectangles, setRectangles] = useState<RectState[]>([]);
	const [circles, setCircles] = useState<CircleState[]>([]);
	const [lines, setLines] = useState<LineState[]>([]);
	const [arrows, setArrows] = useState<ArrowState[]>([]);
	const [scribbles, setScribbles] = useState<ScribbleState[]>([]);

	const stageRef = useRef<Konva.Stage>(null);
	const isPainting = useRef<boolean>(false);
	const currentShapeId = useRef<string | null>(null);
	const initialPosition = useRef<{x: number; y: number} | null>(null);
	const tranformerRef = useRef<Konva.Transformer>(null);

	const isDraggable = action === ActionType.SELECT;

	const pointerDownHandler = () => {
		if (action === ActionType.SELECT) return;

		const stage = stageRef.current;
		const position = stage?.getPointerPosition();

		if (!position) return;

		initialPosition.current = {...position!};
		const id = crypto.randomUUID();
		currentShapeId.current = id;
		isPainting.current = true;

		switch (action) {
			case ActionType.RECTANGLE:
				setRectangles((prev) => [
					...prev,
					{
						id,
						x: position?.x,
						y: position?.y,
						width: 0,
						height: 0,
						stroke: stroke,
						fill: backgroundColor,
					},
				]);
				break;

			case ActionType.CIRCLE:
				setCircles((prev) => [
					...prev,
					{
						id,
						x: position?.x,
						y: position?.y,
						radius: 0,
						stroke: stroke,
						fill: backgroundColor,
					},
				]);
				break;

			case ActionType.ARROW:
				setArrows((prev) => [
					...prev,
					{
						id,
						points: [position.x, position.y, position.x + 20, position.y + 20],
						stroke: stroke,
					},
				]);
				break;

			case ActionType.FREE:
				setScribbles((prev) => [
					...prev,
					{
						id,
						points: [position?.x!, position?.y!],
						fill: stroke,
						lineCap: "round",
						lineJoin: "round",
						stroke: stroke,
					},
				]);

			case ActionType.LINE:
				setLines((prev) => [
					...prev,
					{
						id,
						points: [position.x, position.y, position.x, position.y],
						stroke: stroke,
					},
				]);

			default:
				break;
		}
	};
	const pointerMoveHandler = () => {
		if (action === ActionType.SELECT) return;

		const stage = stageRef.current;
		const position = stage?.getPointerPosition();

		switch (action) {
			case ActionType.RECTANGLE:
				setRectangles((prev) =>
					prev.map((rect) => {
						if (rect.id === currentShapeId.current) {
							return {
								...rect,
								width: position?.x! - initialPosition?.current?.x!,
								height: position?.y! - initialPosition?.current?.y!,
							};
						}

						return rect;
					})
				);
				break;

			case ActionType.CIRCLE:
				setCircles((prev) =>
					prev.map((cir) => {
						if (cir.id === currentShapeId.current) {
							return {
								...cir,
								radius:
									((position?.y! - cir?.y!) ** 2 +
										(position?.x! - cir?.x!) ** 2) **
									0.5,
							};
						}
						return cir;
					})
				);
				break;

			case ActionType.ARROW:
				setArrows((prev) =>
					prev.map((arr) => {
						if (arr.id === currentShapeId.current) {
							return {
								...arr,
								points: [
									arr.points[0],
									arr.points[1],
									position?.x!,
									position?.y!,
								],
							};
						}
						return arr;
					})
				);
				break;

			case ActionType.FREE:
				setScribbles((prev) =>
					prev.map((scribble) => {
						if (scribble.id === currentShapeId.current) {
							return {
								...scribble,
								points: [...scribble.points, position?.x!, position?.y!],
							};
						}
						return scribble;
					})
				);
				break;

			case ActionType.LINE:
				setLines((prev) =>
					prev.map((line) => {
						if (line.id === currentShapeId.current && line.points) {
							return {
								...line,
								points: [
									line?.points[0]!,
									line?.points[1]!,
									position?.x!,
									position?.y!,
								],
							};
						}
						return line;
					})
				);

			default:
				break;
		}
	};

	const pointerUpHandler = () => {
		isPainting.current = false;
		currentShapeId.current = null;
		initialPosition.current = null;
	};

	const onclickHandler = (e: KonvaEventObject<MouseEvent>) => {
		if (action !== ActionType.SELECT) return;
		const target = e.currentTarget;
		if (target) tranformerRef.current?.nodes([target]);
		setShapeSelected(true);
	};

	return (
		<Stage
			ref={stageRef}
			width={width}
			height={height}
			className={cn("w-full h-screen", className)}
			onPointerDown={pointerDownHandler}
			onPointerUp={pointerUpHandler}
			onPointerMove={pointerMoveHandler}>
			<Layer>
				<Rect
					width={window.innerWidth}
					height={window.innerHeight}
					x={0}
					y={0}
					id="bg"
					onClick={() => {
						tranformerRef.current?.nodes([]);
						setShapeSelected(false);
					}}
				/>
				{rectangles?.map((rectangle) => (
					<Rect
						{...rectangle}
						key={rectangle.id}
						draggable={isDraggable}
						onClick={(e) => onclickHandler(e)}
						id="rect"
					/>
				))}
				{circles?.map((circle) => (
					<Circle
						{...circle}
						key={circle.id}
						draggable={isDraggable}
						onClick={(e) => onclickHandler(e)}
					/>
				))}
				{arrows?.map((arrow) => (
					<Arrow
						{...arrow}
						key={arrow.id}
						draggable={isDraggable}
						onClick={(e) => onclickHandler(e)}
					/>
				))}
				{scribbles?.map((scribble) => (
					<Line
						{...scribble}
						key={scribble.id}
						draggable={isDraggable}
						onClick={(e) => onclickHandler(e)}
					/>
				))}
				{lines?.map((line) => (
					<Line
						{...line}
						key={line.id}
						draggable={isDraggable}
						onClick={(e) => onclickHandler(e)}
					/>
				))}
				<Transformer ref={tranformerRef} />
			</Layer>
		</Stage>
	);
};

export default Canvas;
