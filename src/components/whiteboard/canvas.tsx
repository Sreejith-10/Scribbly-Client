import {cn} from "@/lib/utils";
import {useBoardStore} from "@/stores/useBoardStore";
import {useToolbarStore} from "@/stores/useToolbarStore";
import {ActionType} from "@/types/canvas.types";
import Konva from "konva";
import {KonvaEventObject} from "konva/lib/Node";
import {useRef} from "react";
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
}

const Canvas = ({width, height, className}: Readonly<CanvasProps>) => {
	const {action, stroke, fill, setIsShapeSelected, strokeWidth} =
		useToolbarStore();

	const {
		shapes,
		setShapes,
		addShape,
		removeShape,
		setCurrentShapeSelected,
		removeSelectedShape,
	} = useBoardStore();

	const stageRef = useRef<Konva.Stage>(null);
	const isPainting = useRef<boolean>(false);
	const currentShapeId = useRef<string | null>(null);
	const initialPosition = useRef<{x: number; y: number} | null>(null);
	const tranformerRef = useRef<Konva.Transformer>(null);

	const isDraggable = action === ActionType.SELECT;

	const pointerDownHandler = () => {
		if (["move", "select", "eraser"].includes(action)) return;

		const stage = stageRef.current;
		const position = stage?.getPointerPosition();

		if (!position) return;

		initialPosition.current = {...position!};
		const id = crypto.randomUUID();
		const type = action;
		currentShapeId.current = id;
		isPainting.current = true;

		switch (action) {
			case ActionType.RECTANGLE:
				addShape({
					id,
					type,
					x: position?.x,
					y: position?.y,
					width: 0,
					height: 0,
					stroke: stroke,
					fill,
					strokeWidth,
				});
				break;

			case ActionType.CIRCLE:
				addShape({
					id,
					type,
					x: position?.x,
					y: position?.y,
					radius: 0,
					stroke: stroke,
					fill,
					strokeWidth,
				});
				break;

			case ActionType.ARROW:
				addShape({
					id,
					type,
					points: [position.x, position.y, position.x + 20, position.y + 20],
					stroke: stroke,
					strokeWidth,
				});
				break;

			case ActionType.FREE:
				addShape({
					id,
					type,
					points: [position.x ?? 0, position.y ?? 0],
					fill: stroke,
					lineCap: "round",
					lineJoin: "round",
					stroke: stroke,
					strokeWidth,
				});
				break;

			case ActionType.LINE:
				addShape({
					id,
					type,
					points: [position.x, position.y, position.x, position.y],
					stroke: stroke,
					strokeWidth,
				});
				break;

			default:
				break;
		}
	};

	const pointerMoveHandler = () => {
		if (["move", "select", "eraser"].includes(action)) return;

		const stage = stageRef.current;
		const position = stage?.getPointerPosition();
		const x = position?.x;
		const y = position?.y;

		const updatedShapes = shapes.map((shape) => {
			if (shape.id !== currentShapeId.current) return shape;

			switch (shape.type) {
				case ActionType.RECTANGLE:
					return {
						...shape,
						width: (x ?? 0) - initialPosition.current!.x,
						height: (y ?? 0) - initialPosition.current!.y,
					};

				case ActionType.CIRCLE:
					return {
						...shape,
						radius: Math.sqrt(
							Math.pow((x ?? 0) - (shape.x ?? 0), 2) +
								Math.pow((y ?? 0) - (shape.y ?? 0), 2)
						),
					};

				case ActionType.ARROW:
					return {
						...shape,
						points: [shape.points[0], shape.points[1], x ?? 0, y ?? 0],
					};

				case ActionType.LINE:
					return {
						...shape,
						points: [shape.points[0], shape.points[1], x ?? 0, y ?? 0],
					};

				case ActionType.FREE:
					return {
						...shape,
						points: [...shape.points, x ?? 0, y ?? 0],
					};

				default:
					return shape;
			}
		});

		setShapes(updatedShapes);
	};

	const pointerUpHandler = () => {
		isPainting.current = false;
		currentShapeId.current = null;
		initialPosition.current = null;
		removeSelectedShape();
	};

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
			removeShape(id);
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
								//@ts-expect-error error
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
								/>
							);
						default:
							return null;
					}
				})}

				<Transformer ref={tranformerRef} keepRatio={true} />
			</Layer>
		</Stage>
	);
};

export default Canvas;
