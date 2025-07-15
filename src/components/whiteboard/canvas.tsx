import {cn} from "@/lib";
import {useBoardStore, useToolbarStore} from "@/stores/canvas";
import {ActionType, Shape} from "@/types";
import Konva from "konva";
import {KonvaEventObject} from "konva/lib/Node";
import {Dispatch, SetStateAction, useCallback, useRef, useState} from "react";
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
	shapes: Shape[];
	setShapes: Dispatch<SetStateAction<Shape[]>>;
	addNewShape: (shape: Shape) => void;
}

const Canvas = ({
	width,
	height,
	className,
	shapes,
	setShapes,
	addNewShape,
}: Readonly<CanvasProps>) => {
	const [draftShape, setDraftShape] = useState<Shape | null>(null);

	const {action, stroke, fill, setIsShapeSelected, strokeWidth} =
		useToolbarStore();
	const {setCurrentShapeSelected, removeSelectedShape} = useBoardStore();

	const stageRef = useRef<Konva.Stage>(null);
	const isPainting = useRef<boolean>(false);
	const currentShapeId = useRef<string | null>(null);
	const initialPosition = useRef<{x: number; y: number} | null>(null);
	const tranformerRef = useRef<Konva.Transformer>(null);
	const lastUpdateTime = useRef(0);
	const throttleDelay = 50;
	const isDraggable = action === ActionType.SELECT;

	console.log(shapes);

	const pointerDownHandler = useCallback(() => {
		if (["move", "select", "eraser"].includes(action)) return;

		const stage = stageRef.current;
		if (!stage) return;

		const position = stage.getPointerPosition();
		if (!position) return;

		initialPosition.current = {...position};
		const id = crypto.randomUUID();
		const type = action;
		currentShapeId.current = id;
		isPainting.current = true;

		switch (action) {
			case ActionType.RECTANGLE:
				setDraftShape((prev) => ({
					...prev!,
					id,
					type,
					x: position?.x,
					y: position?.y,
					width: 0,
					height: 0,
					stroke: stroke,
					fill,
					strokeWidth,
				}));
				break;

			case ActionType.CIRCLE:
				setDraftShape((prev) => ({
					...prev,
					id,
					type,
					x: position?.x,
					y: position?.y,
					radius: 0,
					stroke: stroke,
					fill,
					strokeWidth,
				}));
				break;

			case ActionType.ARROW:
				setDraftShape((prev) => ({
					...prev,
					id,
					type,
					points: [position.x, position.y, position.x + 20, position.y + 20],
					stroke: stroke,
					strokeWidth,
				}));
				break;

			case ActionType.FREE:
				setDraftShape((prev) => ({
					...prev,
					id,
					type,
					points: [position.x ?? 0, position.y ?? 0],
					fill: stroke,
					lineCap: "round",
					lineJoin: "round",
					stroke: stroke,
					strokeWidth,
				}));
				break;

			case ActionType.LINE:
				setDraftShape((prev) => ({
					...prev,
					id,
					type,
					points: [position.x, position.y, position.x, position.y],
					stroke: stroke,
					strokeWidth,
				}));
				break;

			default:
				break;
		}
	}, [action, fill, stroke, strokeWidth]);

	const pointerMoveHandler = useCallback(() => {
		if (["move", "select", "eraser"].includes(action)) return;

		const now = new Date().getTime();
		if (now - lastUpdateTime.current < throttleDelay) return;
		lastUpdateTime.current = now;

		const stage = stageRef.current;
		if (!stage) return;

		const position = stage.getPointerPosition();
		if (position?.x && position?.y && initialPosition.current) {
			switch (draftShape?.type) {
				case ActionType.RECTANGLE:
					setDraftShape((prev) => ({
						...prev!,
						width: (position?.x ?? 0) - initialPosition.current!.x,
						height: (position?.y ?? 0) - initialPosition.current!.y,
					}));
					break;

				case ActionType.CIRCLE:
					setDraftShape((prev) => ({
						...prev!,
						radius: Math.sqrt(
							Math.pow((position?.x ?? 0) - (prev?.x ?? 0), 2) +
								Math.pow((position?.y ?? 0) - (prev?.y ?? 0), 2)
						),
					}));
					break;

				case ActionType.ARROW:
					setDraftShape((prev) => ({
						...prev!,
						points: [
							prev?.points[0],
							prev?.points[1],
							position?.x ?? 0,
							position?.y ?? 0,
						],
					}));
					break;

				case ActionType.LINE:
					setDraftShape((prev) => ({
						...prev!,
						points: [
							prev?.points[0],
							prev?.points[1],
							position?.x ?? 0,
							position?.y ?? 0,
						],
					}));
					break;

				case ActionType.FREE:
					setDraftShape((prev) => ({
						...prev!,
						points: [...prev?.points, position?.x ?? 0, position?.x ?? 0],
					}));
					break;

				default:
					break;
			}
		}
	}, [action, draftShape]);

	const pointerUpHandler = useCallback(() => {
		if (draftShape) {
			addNewShape(draftShape);
		}

		isPainting.current = false;
		currentShapeId.current = null;
		initialPosition.current = null;
		removeSelectedShape();
		// setDraftShape(null);
	}, [draftShape]);

	const onclickHandler = (e: KonvaEventObject<MouseEvent>) => {
		const target = e.currentTarget;
		const id = target.id();

		if (action === ActionType.SELECT) {
			if (target) {
				tranformerRef.current?.nodes([target]);
				setIsShapeSelected(true);
				setCurrentShapeSelected(id);
			}
		} else if (action === ActionType.ERASER) {
			setShapes((prev) => prev.filter((shape) => shape.id !== id));
		}
	};

	const renderDraft = () => {
		switch (draftShape?.type) {
			case ActionType.RECTANGLE:
				return (
					<Rect
						key={draftShape.id}
						{...draftShape}
						id={draftShape.id}
						draggable={isDraggable}
						onClick={onclickHandler}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<Stage
			ref={stageRef}
			width={width}
			height={height}
			className={cn(className)}
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
						setIsShapeSelected(false);
					}}
				/>

				{shapes?.map((shape) => {
					switch (shape?.type) {
						case ActionType.RECTANGLE:
							return (
								<Rect
									key={shape.id}
									{...shape}
									id={shape.id}
									draggable={isDraggable}
									onClick={onclickHandler}
								/>
							);
						case ActionType.CIRCLE:
							return (
								<Circle
									key={shape.id}
									{...shape}
									id={shape.id}
									draggable={isDraggable}
									onClick={onclickHandler}
								/>
							);
						case ActionType.ARROW:
							return (
								// @ts-expect-error error
								<Arrow
									{...shape}
									key={shape.id}
									id={shape.id}
									draggable={isDraggable}
									onClick={onclickHandler}
								/>
							);
						case ActionType.LINE:
							return (
								<Line
									key={shape.id}
									{...shape}
									draggable={isDraggable}
									onClick={(e) => onclickHandler(e)}
								/>
							);
						case ActionType.FREE:
							return (
								<Line
									key={shape.id}
									{...shape}
									id={shape.id}
									draggable={isDraggable}
									onClick={onclickHandler}
									tension={0.5}
								/>
							);
						default:
							return null;
					}
				})}

				{renderDraft()}

				<Transformer ref={tranformerRef} keepRatio={true} />
			</Layer>
		</Stage>
	);
};

export default Canvas;
