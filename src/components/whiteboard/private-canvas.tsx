import { cn } from '@/lib';
import { useBoardStore, useToolbarStore } from '@/stores/canvas';
import { ActionType, DeltaProp, Shape } from '@/types';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { ActivityIcon } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
	Stage,
	Layer,
	Rect,
	Circle,
	Arrow,
	Line,
	Transformer,
	Text,
} from 'react-konva';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface PrivateCanvasProps {
	title?: string;
	action?: ActionType;
	width?: number;
	height?: number;
	className?: string;
	shapes: Shape[];
	handleDelta: (delta: DeltaProp) => void;
}

const PrivateCanvasProps = ({
	title = '',
	width,
	height,
	className,
	shapes,
	handleDelta,
}: Readonly<PrivateCanvasProps>) => {
	const [draftShape, setDraftShape] = useState<Shape | null>(null);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [editingTextId, setEditingTextId] = useState<string | null>(null);
	const [textValue, setTextValue] = useState<string>('');

	const { action, stroke, fill, setIsShapeSelected, strokeWidth } =
		useToolbarStore();
	const { currentShapeSelected, setCurrentShapeSelected } = useBoardStore();

	const stageRef = useRef<Konva.Stage>(null);
	const isPainting = useRef<boolean>(false);
	const currentShapeId = useRef<string | null>(null);
	const initialPosition = useRef<{ x: number; y: number } | null>(null);
	const tranformerRef = useRef<Konva.Transformer>(null);
	const lastUpdateTime = useRef(0);
	const textInputRef = useRef<HTMLTextAreaElement>(null);

	const throttleDelay = 50;
	const isDraggable =
		currentShapeSelected !== null && action === ActionType.SELECT;

	const pointerDownHandler = useCallback(() => {
		if (['move', 'select', 'eraser'].includes(action)) return;

		const stage = stageRef.current;
		if (!stage) return;

		const position = stage.getPointerPosition();
		if (!position) return;

		initialPosition.current = { ...position };
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
					strokeWidth: 2,
					cornerRadius: 10,
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
					strokeWidth: 2,
				}));
				break;

			case ActionType.ARROW:
				setDraftShape((prev) => ({
					...prev,
					id,
					type,
					points: [
						position.x,
						position.y,
						position.x + 20,
						position.y + 20,
					],
					stroke: stroke,
					strokeWidth: 2,
					fill,
				}));
				break;

			case ActionType.PENCIL:
				setDraftShape((prev) => ({
					...prev,
					id,
					type,
					points: [position.x ?? 0, position.y ?? 0],
					fill: stroke,
					lineCap: 'round',
					lineJoin: 'round',
					stroke: stroke,
					strokeWidth: 2,
				}));
				break;

			case ActionType.LINE:
				setDraftShape((prev) => ({
					...prev,
					id,
					type,
					points: [position.x, position.y, position.x, position.y],
					stroke: stroke,
					strokeWidth: 2,
				}));
				break;
			case ActionType.TEXT:
				setDraftShape((prev) => ({
					...prev,
					id,
					type,
					x: position.x,
					y: position.y,
					text: 'Double click to edit',
					fontSize: 16,
					fontFamily: 'Arial',
					strokeWidth: 4,
				}));
				break;

			default:
				break;
		}
	}, [action, fill, stroke, strokeWidth]);

	const pointerMoveHandler = useCallback(() => {
		if (['move', 'select', 'eraser'].includes(action)) return;

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
								Math.pow(
									(position?.y ?? 0) - (prev?.y ?? 0),
									2,
								),
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

				case ActionType.PENCIL:
					setDraftShape((prev) => ({
						...prev!,
						tension: 0.5,
						points: [
							...prev?.points,
							position?.x ?? 0,
							position?.y ?? 0,
						],
					}));
					break;
				case ActionType.TEXT:
					break;
				default:
					break;
			}
		}
	}, [action, draftShape]);

	const pointerUpHandler = useCallback(() => {
		if (currentShapeSelected) return;
		if (draftShape) {
			draftShape.draggable = false;
			handleDelta({
				data: draftShape,
				operation: 'create',
			});
		}

		isPainting.current = false;
		currentShapeId.current = null;
		initialPosition.current = null;
		setDraftShape(null);
	}, [draftShape]);

	const onclickHandler = (e: KonvaEventObject<MouseEvent>) => {
		if (e.evt.defaultPrevented || isPainting.current) return;
		const target = e.currentTarget;
		const id = target.id();

		if (action === ActionType.SELECT) {
			if (target) {
				tranformerRef.current?.nodes([target]);
				setIsShapeSelected(true);
				setCurrentShapeSelected(e.currentTarget.attrs);
			}
		} else if (action === ActionType.ERASER) {
			e.currentTarget.attrs.draggable = false;
			handleDelta({
				data: e.currentTarget.attrs,
				operation: 'delete',
			});
		}
	};

	const onDragEndHandler = (e: KonvaEventObject<DragEvent>) => {
		e.evt.preventDefault();
		const node = e.target;

		handleDelta({
			data: {
				...node.attrs,
				draggable: false,
				x: node.x(),
				y: node.y(),
			},
			operation: 'update',
		});

		tranformerRef.current?.nodes([]);
		setCurrentShapeSelected(null);
		setIsDragging(false);
	};

	const transformerUpdate = () => {
		if (draftShape) {
			handleDelta({
				operation: 'update',
				data: draftShape,
			});
		}
	};

	const onDoubleClickHandler = useCallback(
		(e: KonvaEventObject<MouseEvent>) => {
			if (['eraser'].includes(action)) return;

			const shape = e.target.attrs;
			const shapeData = shapes.find((s) => s.id === shape.id);
			setDraftShape(shapeData!);

			if (shapeData?.type === ActionType.TEXT) {
				setEditingTextId(shape.id);
				setTextValue(shapeData.text || '');

				setTimeout(() => {
					if (textInputRef.current) {
						textInputRef.current.classList.add('absolute');
						textInputRef.current.style.position = 'absolute';
						textInputRef.current.style.top = `${shape.y + 30}px`;
						textInputRef.current.style.left = `${shape.x}px`;
						textInputRef.current.value = shapeData.text || '';
						textInputRef.current.focus();
					}
				}, 100);
			}
		},
		[action, shapes],
	);

	const handleTextCompletion = useCallback(() => {
		if (!editingTextId) return;

		const updatedText = textInputRef.current?.value || '';

		// handle delta
		if (draftShape && draftShape.type === ActionType.TEXT) {
			handleDelta({
				operation: 'update',
				data: { ...draftShape, text: updatedText },
			});
			setEditingTextId(null);
			setTextValue('');
			setDraftShape(null);
		}
	}, [editingTextId]);

	useEffect(() => {
		if (!draftShape) return;

		setDraftShape((prev) => {
			return prev ? { ...prev, stroke, fill } : null;
		});
	}, [stroke, fill]);

	useEffect(() => {
		const escapeKeyHandler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				if (isPainting.current) {
					isPainting.current = false;
					currentShapeId.current = null;
					initialPosition.current = null;
					setDraftShape(null);
					tranformerRef.current?.nodes([]);
					setIsShapeSelected(false);
				} else if (editingTextId) {
					setEditingTextId(null);
					setTextValue('');
				}
			} else if (
				e.key === 'Enter' &&
				editingTextId &&
				textInputRef.current
			) {
				handleTextCompletion();
			}
		};

		window.addEventListener('keydown', escapeKeyHandler);

		return () => {
			window.removeEventListener('keydown', escapeKeyHandler);
		};
	}, [editingTextId, handleTextCompletion]);

	const renderDraft = (shape: Shape | null) => {
		switch (shape?.type) {
			case ActionType.RECTANGLE:
				return (
					<Rect
						key={shape.id}
						{...shape}
						id={shape.id}
						draggable={
							isDraggable && currentShapeSelected.id === shape.id
						}
						onClick={onclickHandler}
					/>
				);
			case ActionType.CIRCLE:
				return (
					<Circle
						key={shape.id}
						{...shape}
						id={shape.id}
						draggable={
							isDraggable && currentShapeSelected.id === shape.id
						}
						onClick={onclickHandler}
					/>
				);
			case ActionType.ARROW:
				return (
					<Arrow
						key={shape.id}
						{...shape}
						id={shape.id}
						points={shape.points}
						draggable={
							isDraggable && currentShapeSelected.id === shape.id
						}
						onClick={onclickHandler}
					/>
				);
			case ActionType.LINE:
				return (
					<Line
						key={shape.id}
						{...shape}
						id={shape.id}
						draggable={
							isDraggable && currentShapeSelected.id === shape.id
						}
						onClick={onclickHandler}
					/>
				);
			case ActionType.PENCIL:
				return (
					<Line
						key={shape.id}
						{...shape}
						id={shape.id}
						points={shape.points}
						tension={0.5}
						draggable={
							isDraggable && currentShapeSelected.id === shape.id
						}
						onClick={onclickHandler}
					/>
				);
			case ActionType.TEXT:
				return <Text key={shape.id} {...shape} />;
			default:
				return null;
		}
	};

	return (
		<>
			<Stage
				ref={stageRef}
				width={width}
				height={height}
				className={cn(className)}
				onPointerDown={pointerDownHandler}
				onPointerUp={pointerUpHandler}
				onPointerMove={pointerMoveHandler}
				title={title}
			>
				<Layer>
					<Rect
						width={window.innerWidth}
						height={window.innerHeight}
						x={0}
						y={0}
						id='bg'
						onClick={() => {
							tranformerRef.current?.nodes([]);
							setIsShapeSelected(false);
							setDraftShape(null);
							setEditingTextId(null);
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
										onClick={onclickHandler}
										draggable={
											isDraggable &&
											currentShapeSelected.id === shape.id
										}
										onDragEnd={onDragEndHandler}
									/>
								);
							case ActionType.CIRCLE:
								return (
									<Circle
										key={shape.id}
										{...shape}
										id={shape.id}
										onClick={onclickHandler}
										draggable={
											isDraggable &&
											currentShapeSelected.id === shape.id
										}
										onDragEnd={onDragEndHandler}
									/>
								);
							case ActionType.ARROW:
								return (
									// @ts-expect-error error
									<Arrow
										{...shape}
										key={shape.id}
										id={shape.id}
										onClick={onclickHandler}
										draggable={
											isDraggable &&
											currentShapeSelected.id === shape.id
										}
										onDragEnd={onDragEndHandler}
									/>
								);
							case ActionType.LINE:
								return (
									<Line
										key={shape.id}
										{...shape}
										onClick={(e) => onclickHandler(e)}
										draggable={
											isDraggable &&
											currentShapeSelected.id === shape.id
										}
										onDragEnd={onDragEndHandler}
									/>
								);
							case ActionType.PENCIL:
								return (
									<Line
										key={shape.id}
										{...shape}
										id={shape.id}
										onClick={onclickHandler}
										tension={0.5}
										draggable={
											isDraggable &&
											currentShapeSelected.id === shape.id
										}
										onDragEnd={onDragEndHandler}
									/>
								);
							case ActionType.TEXT:
								return (
									<Text
										key={shape.id}
										{...shape}
										id={shape.id}
										onClick={onclickHandler}
										onDblClick={onDoubleClickHandler}
										draggable={
											isDraggable &&
											currentShapeSelected.id === shape.id
										}
										onDragEnd={onDragEndHandler}
									/>
								);
							default:
								return null;
						}
					})}

					{renderDraft(draftShape)}

					<Transformer
						ref={tranformerRef}
						keepRatio={true}
						onPointerLeave={transformerUpdate}
					/>
				</Layer>
			</Stage>
			{editingTextId && (
				<Textarea
					ref={textInputRef}
					className='w-fit'
					onChange={(e) => setTextValue(e.target.value)}
					onBlur={handleTextCompletion}
				/>
			)}
		</>
	);
};

export default PrivateCanvasProps;
