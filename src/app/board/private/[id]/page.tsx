'use client';

import { Pointer } from '@/components/ui/pointer';
import { CanvasMenu } from '@/components/whiteboard/canvas-menu';
import { Customize } from '@/components/whiteboard/customize';
import { ToolBar } from '@/components/whiteboard/tool-bar';
import { UndoRedo } from '@/components/whiteboard/undo-redo';
import { useShapeActions } from '@/hooks/mutation/shape/useShapeActions';
import { useBoardMetadata, useBoardState } from '@/hooks/query/board';
import { useUser } from '@/hooks/query/user';
import { useBoardStore } from '@/stores/canvas';
import { useToolbarStore } from '@/stores/canvas/useToolbarStore';
import { DeltaProp } from '@/types';
import { ShapeConfig } from 'konva/lib/Shape';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const PrivateCanvas = dynamic(
  () => import('@/components/whiteboard/private-canvas'),
  {
    ssr: false,
  },
);

export default function Page() {
  const [userPointer, setUserPointer] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [hideCustomCursor, setHideCustomCursor] = useState<boolean>(false);

  const action = useToolbarStore((state) => state.action);
  const isShapeSelected = useToolbarStore((state) => state.isShapeSelected);
  const currentShapeSelected = useBoardStore(
    (state) => state.currentShapeSelected,
  );

  const { id } = useParams<{ id: string }>();

  const { data: boardMeta } = useBoardMetadata(id);
  const { data, isLoading, isFetched } = useBoardState(id);
  const { data: user } = useUser();
  const {
    addNewShape,
    editShape,
    removeShape,
    snapShot,
    resizeShape,
    moveShape,
    reset,
  } = useShapeActions(id);

  const deltaActions = (delta: DeltaProp) => {
    switch (delta.operation) {
      case 'create':
        addNewShape.mutate(delta.data);
        break;
      case 'update':
        editShape.mutate(delta.data);
        break;
      case 'delete':
        removeShape.mutate(delta.data);
        break;
      case 'resize':
        resizeShape.mutate(delta.data);
        break;
      case 'free':
        moveShape.mutate(delta.data);
        break;
      default:
        break;
    }
  };

  const handleCursorHideHandler = () => {
    setHideCustomCursor(true);
  };

  const handleCursorShowHandler = () => {
    setHideCustomCursor(false);
  };

  const handlePropertyChange = (args: { prop: string; value: string }) => {
    if (currentShapeSelected) {
      const shape = currentShapeSelected;
      shape[args.prop] = args.value;
      editShape.mutate({ ...shape });
    }
  };

  const resetBoard = () => {
    reset.mutate(id, {
      onSuccess: () => {
        toast.success('Board cleared');
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    });
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setUserPointer(() => ({ x: event.clientX, y: event.clientY }));
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div
      className={`relative h-screen w-full ${hideCustomCursor ? 'cursor-auto' : 'cursor-none'}`}
    >
      {!hideCustomCursor ? (
        <Pointer {...userPointer} color='red' />
      ) : null}
      <div
        onMouseEnter={handleCursorHideHandler}
        onMouseLeave={handleCursorShowHandler}
      >
        <ToolBar />
      </div>
      <div
        onMouseEnter={handleCursorHideHandler}
        onMouseLeave={handleCursorShowHandler}
      >
        <CanvasMenu
          onSave={snapShot.mutate}
          isOwner={boardMeta?.boardMetadata.ownerId === user?._id}
          resetBoard={resetBoard}
        />
      </div>
      <PrivateCanvas
        width={window.innerWidth}
        height={window.innerHeight}
        className='relative h-full w-full'
        shapes={Object.values(data?.currentState ?? [])}
        handleDelta={(shape) => deltaActions(shape)}
      />
      {!['free', 'eraser'].includes(action) ||
        (action === 'select' && isShapeSelected) ? (
        <div
          className='absolute bottom-5 left-1/2 -translate-x-1/2'
          onMouseEnter={handleCursorHideHandler}
          onMouseLeave={handleCursorShowHandler}
        >
          <Customize
            onPropertyChange={(args) => handlePropertyChange(args)}
          />
        </div>
      ) : null}

      <div
        className='fixed bottom-14 left-5'
        onMouseEnter={handleCursorHideHandler}
        onMouseLeave={handleCursorShowHandler}
      >
        <UndoRedo />
      </div>
    </div>
  );
}
