import {cn} from "@/lib";
import {useBoardStore, useToolbarStore} from "@/stores/canvas";
import {ActionType, DeltaProp, Shape} from "@/types";
import Konva from "konva";
import {KonvaEventObject} from "konva/lib/Node";
import {useCallback, useRef, useState} from "react";
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
	handleDelta: (delta: DeltaProp) => void;
}

const Canvas = ({
	width,
	height,
	className,
	shapes,
	handleDelta,
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
					x: position.x,
					y: position.y,
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
					x: position.x,
					y: position.y,
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
					points: [position.x, position.y],
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
						width: position?.x - initialPosition.current!.x,
						height: position?.y - initialPosition.current!.y,
					}));
					break;

				case ActionType.CIRCLE:
					setDraftShape((prev) => ({
						...prev!,
						radius: Math.sqrt(
							Math.pow(position?.x - (prev?.y ?? 0), 2) +
								Math.pow(position?.y - (prev?.y ?? 0), 2)
						),
					}));
					break;

				case ActionType.ARROW:
					setDraftShape((prev) => ({
						...prev!,
						points: [prev?.points[0], prev?.points[1], position.x, position?.y],
					}));
					break;

				case ActionType.LINE:
					setDraftShape((prev) => ({
						...prev!,
						points: [prev?.points[0], prev?.points[1], position.x, position.y],
					}));
					break;

				case ActionType.FREE:
					console.log(draftShape.points);

					setDraftShape((prev) => ({
						...prev!,
						points: [...prev?.points, position?.x, position?.y],
					}));
					break;

				default:
					break;
			}
		}
	}, [action, draftShape]);

	const pointerUpHandler = useCallback(() => {
		if (draftShape) {
			handleDelta({operation: "create", data: draftShape});
		}

		isPainting.current = false;
		currentShapeId.current = null;
		initialPosition.current = null;
		removeSelectedShape();
	}, [draftShape]);

	const onclickHandler = (e: KonvaEventObject<MouseEvent>) => {
		e.cancelBubble = true;
		const target = e.currentTarget;
		const id = target.id();

		if (action === ActionType.SELECT) {
			if (target) {
				tranformerRef.current?.nodes([target]);
				setIsShapeSelected(true);
				setCurrentShapeSelected(id);
			}
		} else if (action === ActionType.ERASER) {
			const shape = shapes.find((shape) => shape.id === id);

			if (shape) handleDelta({operation: "update", data: shape});
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
			case ActionType.CIRCLE:
				return (
					<Circle
						key={draftShape.id}
						{...draftShape}
						id={draftShape.id}
						draggable={isDraggable}
						onClick={onclickHandler}
					/>
				);
			case ActionType.ARROW:
				return (
					// @ts-expect-error error
					<Arrow
						{...draftShape}
						key={draftShape.id}
						id={draftShape.id}
						draggable={isDraggable}
						onClick={onclickHandler}
					/>
				);
			case ActionType.LINE:
				return (
					<Line
						key={draftShape.id}
						{...draftShape}
						draggable={isDraggable}
						onClick={(e) => onclickHandler(e)}
					/>
				);
			case ActionType.FREE:
				return (
					<Line
						key={draftShape.id}
						{...draftShape}
						id={draftShape.id}
						draggable={isDraggable}
						onClick={onclickHandler}
						tension={0.5}
					/>
				);
			default:
				return null;
		}
	};

	const onDragEndHandler = useCallback(
		(e: KonvaEventObject<DragEvent>) => {
			const node = e.target;
			const id = node.id();
			const position = node.getPosition();

			const shape = shapes.find((shape) => shape.id === id);

			handleDelta({
				operation: "move",
				data: {
					...shape!,
					x: position.x,
					y: position.y,
				},
			});
		},
		[handleDelta, shapes]
	);

	const onTransformEndHandler = useCallback(
		(e: KonvaEventObject<Event>) => {
			const node = e.target;
			const id = node.id();
			const position = node.getPosition();
			const shape = shapes.find((shape) => shape.id === id);

			if (!shape) return;

			let updateData: Shape | {id: string} = {id: shape.id};

			switch (shape.type) {
				case ActionType.RECTANGLE:
					updateData = {
						...shape,
						x: position.x,
						y: position.y,
						width: node.width() * node.scaleX(),
						height: node.height() * node.scaleY(),
					};
					break;
				case ActionType.CIRCLE:
					updateData = {
						...shape,
						x: position.x,
						y: position.y,
						radius: Math.max(5, (shape.radius || 0) * node.scaleX()),
					};
					break;
				case ActionType.ARROW:
				case ActionType.LINE:
				case ActionType.FREE:
					updateData = {
						...shape,
						x: position.x,
						y: position.y,
						scaleX: node.scaleX(),
						scaleY: node.scaleY(),
					};
					break;
				default:
					break;
			}

			handleDelta({
				operation: "resize",
				data: updateData as Shape,
			});

			// Resetting scale to avoid compounding
			node.scaleX(1);
			node.scaleY(1);
		},
		[shapes, handleDelta]
	);

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
									onDragStart={() => {
										console.log("drag");
									}}
									onDragEnd={onDragEndHandler}
									onTransformEnd={onTransformEndHandler}
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
									onDragEnd={onDragEndHandler}
									onTransformEnd={onTransformEndHandler}
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
									onDragEnd={onDragEndHandler}
									onTransformEnd={onTransformEndHandler}
								/>
							);
						case ActionType.LINE:
							return (
								<Line
									key={shape.id}
									{...shape}
									draggable={isDraggable}
									onClick={(e) => onclickHandler(e)}
									onDragEnd={onDragEndHandler}
									onTransformEnd={onTransformEndHandler}
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
									onDragEnd={onDragEndHandler}
									onTransformEnd={onTransformEndHandler}
								/>
							);
						default:
							return null;
					}
				})}

				{renderDraft()}

				<Transformer
					ref={tranformerRef}
					keepRatio={false}
					boundBoxFunc={(oldBox, newBox) => {
						if (newBox.width < 5 || newBox.height < 5) {
							return oldBox;
						}
						return newBox;
					}}
				/>
			</Layer>
		</Stage>
	);
};

export default Canvas;
