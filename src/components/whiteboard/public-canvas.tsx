import { cn } from '@/lib';
import { useBoardStore, useToolbarStore } from '@/stores/canvas';
import { ActionType, DeltaProp, Shape } from '@/types';
import Konva from 'konva';
import { KonvaEventObject, Node, NodeConfig } from 'konva/lib/Node';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import { Textarea } from '../ui/textarea';

interface PublicCanvasProps {
  action?: ActionType;
  width?: number;
  height?: number;
  className?: string;
  shapes: Shape[];
  setShapes: Dispatch<SetStateAction<Shape[]>>;
  handleDelta: (delta: DeltaProp) => void;
  canEdit?: boolean;
}

const PublicCanvasProps = ({
  width,
  height,
  className,
  shapes,
  handleDelta,
  canEdit,
}: Readonly<PublicCanvasProps>) => {
  const [draftShape, setDraftShape] = useState<Shape | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [textValue, setTextValue] = useState<string>('');

  const { action, stroke, fill, setIsShapeSelected, strokeWidth } =
    useToolbarStore();
  const { setCurrentShapeSelected, removeSelectedShape } = useBoardStore();

  const stageRef = useRef<Konva.Stage>(null);
  const isPainting = useRef<boolean>(false);
  const currentShapeId = useRef<string | null>(null);
  const initialPosition = useRef<{ x: number; y: number } | null>(null);
  const tranformerRef = useRef<Konva.Transformer>(null);
  const lastUpdateTime = useRef(0);
  const textInputRef = useRef<HTMLTextAreaElement>(null)

  const throttleDelay = 50;
  const isDraggable = action === ActionType.SELECT;

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
          cornerRadius: 10
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

  const pointerMoveHandler = useCallback(
    (e: Konva.KonvaEventObject<PointerEvent>) => {
      if (['move', 'select', 'eraser'].includes(action)) return;

      const now = new Date().getTime();
      if (now - lastUpdateTime.current < throttleDelay) return;
      lastUpdateTime.current = now;

      const stage = stageRef.current;
      if (!stage) return;

      const position = stage.getPointerPosition();
      if (
        position?.x &&
        position?.y &&
        initialPosition.current?.x &&
        initialPosition.current.y
      ) {
        switch (draftShape?.type) {
          case ActionType.RECTANGLE:
            const width = Math.abs(position.x - initialPosition.current.x)
            const height = Math.abs(position.y - initialPosition.current.y)
            const x = Math.min(position.x, initialPosition.current.x)
            const y = Math.min(position.y, initialPosition.current.y)
            setDraftShape((prev) => ({
              ...prev!,
              width,
              height,
              x, y
            }));
            break;

          case ActionType.CIRCLE:
            setDraftShape((prev) => ({
              ...prev!,
              radius: Math.sqrt(
                Math.pow(
                  (position?.x ?? 0) - (prev?.x ?? 0),
                  2,
                ) +
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
    },
    [action, draftShape],
  );

  const pointerUpHandler = useCallback(() => {
    if (draftShape) {
      handleDelta({
        data: draftShape,
        operation: 'create',
      });
    }

    isPainting.current = false;
    currentShapeId.current = null;
    initialPosition.current = null;
    removeSelectedShape();
    setDraftShape(null);
    tranformerRef.current?.nodes([]);
  }, [draftShape]);

  const onclickHandler = (e: KonvaEventObject<MouseEvent>) => {
    if (!canEdit) return;
    const target = e.currentTarget;
    const id = target.id();
    const shape = shapes.find((shape) => shape.id === id);

    if (action === ActionType.SELECT) {
      if (target) {
        tranformerRef.current?.nodes([target]);
        setIsShapeSelected(true);
        setCurrentShapeSelected(shape!);
      }
    } else if (action === ActionType.ERASER) {
      handleDelta({
        data: e.currentTarget.attrs,
        operation: 'delete',
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

  const onDragEndHandler = (
    e: KonvaEventObject<DragEvent, Node<NodeConfig>>,
  ) => {
    handleDelta({ operation: 'update', data: e.currentTarget.attrs });
  };

  const renderDraft = (draftShape: Shape | null) => {
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
            key={draftShape.id}
            {...draftShape}
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
            id={draftShape.id}
            draggable={isDraggable}
            onClick={onclickHandler}
          />
        );
      case ActionType.PENCIL:
        return (
          <Line
            key={draftShape.id}
            {...draftShape}
            id={draftShape.id}
            points={draftShape.points}
            draggable={isDraggable}
            onClick={onclickHandler}
            tension={0.5}
          />
        );
      case ActionType.TEXT:
        return (<Text key={draftShape.id} {...draftShape} />);
      default:
        return null;
    }
  };

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
          setDraftShape(null)
          tranformerRef.current?.nodes([])
        } else {
          setDraftShape(null)
          tranformerRef.current?.nodes([])
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
  }, []);

  return (
    <>
      <Stage
        ref={stageRef}
        width={width}
        height={height}
        className={cn(
          className,
          `${canEdit ? 'pointer-events-auto' : 'pointer-events-none'}`,
        )}
        onPointerDown={pointerDownHandler}
        onPointerUp={pointerUpHandler}
        onPointerMove={pointerMoveHandler}
      >
        <Layer id='stage'>
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
                    draggable={isDraggable}
                    onClick={onclickHandler}
                    onDragEnd={onDragEndHandler}
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
                  />
                );
              case ActionType.PENCIL:
                return (
                  <Line
                    key={shape.id}
                    {...shape}
                    id={shape.id}
                    draggable={isDraggable}
                    onClick={onclickHandler}
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
                      isDraggable
                    }
                    onDragEnd={onDragEndHandler}
                  />
                );
              default:
                return null;
            }
          })}

          {renderDraft(draftShape)}

          <Transformer ref={tranformerRef} keepRatio={true} />
        </Layer>
      </Stage>
      {
        editingTextId && (
          <Textarea
            ref={textInputRef}
            className='w-fit'
            onChange={(e) => setTextValue(e.target.value)}
            onBlur={handleTextCompletion}
          />
        )
      }
    </>
  );
};

export default PublicCanvasProps;
