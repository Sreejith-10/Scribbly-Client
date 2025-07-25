'use client';

import { ToolBar } from '@/components/whiteboard/tool-bar';
import { CanvasMenu } from '@/components/whiteboard/canvas-menu';
import { UndoRedo } from '@/components/whiteboard/undo-redo';
import { useParams } from 'next/navigation';
import { useToolbarStore } from '@/stores/canvas/useToolbarStore';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Customize } from '@/components/whiteboard/customize';
import { IBoardState, Shape } from '@/types';
import { useSocket } from '@/hooks/useSocket';

const PublicCanvas = dynamic(
  () => import('@/components/whiteboard/public-canvas'),
  {
    ssr: false,
  },
);

export default function Page() {
  const { id }: { id: string } = useParams();

  const [shapes, setShapes] = useState<Shape[]>([]);

  const action = useToolbarStore((state) => state.action);
  const isSelected = useToolbarStore((state) => state.isShapeSelected);

  const { socket, emit, on } = useSocket();

  useEffect(() => {
    if (!socket) return;

    emit('joinBoard', { boardId: id });

    const handleBoardState = (data: IBoardState) => {
      const { currentState } = data;

      setShapes((prev) => [...prev, ...Object.values(currentState)]);
    };
    const handleUserJoined = (data) => {
      console.log(data);
    };
    const handleUpdatedBoard = (data: IBoardState) => {
      setShapes(Object.values(data.currentState));
    };

    on('boardState', handleBoardState);
    on('userJoined', handleUserJoined);
    on('boardUpdate', handleUpdatedBoard);

    // Cleanup: remove listeners
    return () => {
      setShapes([]);
      socket.off('boardState', handleBoardState);
      socket.off('userJoined', handleUserJoined);
      socket.off('boardUpdate', handleUpdatedBoard);
    };
  }, [socket, on, emit, id]);

  const addNewShape = (shape: Shape) => {
    const delta = {
      operation: 'create',
      shapeId: shape.id,
      data: shape,
    };
    setShapes((prev) => [...prev, shape]);
    emit('boardUpdate', delta);
  };

  return (
    <div className='relative h-screen w-full'>
      <ToolBar />
      <CanvasMenu onSave={() => console.log('save')} />
      <PublicCanvas
        shapes={shapes}
        width={window.innerWidth}
        height={window.innerHeight}
        className='z-[-99999] h-full w-full'
        addNewShape={addNewShape}
        setShapes={setShapes}
      />
      {!['free', 'eraser'].includes(action) ||
      (action === 'select' && isSelected) ? (
        <div className='absolute bottom-5 left-1/2 -translate-x-1/2'>
          <Customize />
        </div>
      ) : null}
      <div className='fixed bottom-14 left-5'>
        <UndoRedo />
      </div>
    </div>
  );
}
