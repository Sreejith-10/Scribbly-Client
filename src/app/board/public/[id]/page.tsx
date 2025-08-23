'use client';

import { ToolBar } from '@/components/whiteboard/tool-bar';
import { CanvasMenu } from '@/components/whiteboard/canvas-menu';
import { UndoRedo } from '@/components/whiteboard/undo-redo';
import { useParams } from 'next/navigation';
import { useToolbarStore } from '@/stores/canvas/useToolbarStore';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Customize } from '@/components/whiteboard/customize';
import { DeltaProp, IBoardState, Shape } from '@/types';
import { useSocket } from '@/hooks/useSocket';
import { useBoardMetadata } from '@/hooks/query/board';
import { useUser } from '@/hooks/query/user';
import { useCollaborators } from '@/hooks/query/collaborators';

const PublicCanvas = dynamic(
  () => import('@/components/whiteboard/public-canvas'),
  {
    ssr: false,
  },
);

export default function Page() {
  const { id }: { id: string } = useParams();
  const { data: boardMeta } = useBoardMetadata(id);
  const { data: user } = useUser();
  const { data: collaborators } = useCollaborators(id)

  const [shapes, setShapes] = useState<Shape[]>([]);
  const action = useToolbarStore((state) => state.action);
  const isSelected = useToolbarStore((state) => state.isShapeSelected);

  const { socket, emit, on } = useSocket();

  useEffect(() => {
    if (!socket) return;

    emit('joinBoard', { boardId: id });

    const handleBoardState = (data: IBoardState) => {
      const { currentState } = data;

      console.log(data, 'boardUpdate');
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
      socket.disconnect();
    };
  }, [socket, on, emit, id]);

  console.log(collaborators?.collaborators)

  const handleDelta = (delta: DeltaProp) => {
    switch (delta.operation) {
      case 'create':
        setShapes((prev) => [...prev, delta.data]);
        break;
      case 'update':
        setShapes((prev) => {
          return prev.map((shape) =>
            shape.id === delta.data.id ? delta.data : shape,
          );
        });
        break;
      case 'delete':
        setShapes((prev) =>
          prev.filter((shape) => shape.id !== delta.data.id),
        );
        break;
      case 'resize':
        setShapes((prev) => {
          return prev.map((shape) =>
            shape.id === delta.data.id ? delta.data : shape,
          );
        });
        break;
      case 'free':
        setShapes((prev) => {
          return prev.map((shape) =>
            shape.id === delta.data.id ? delta.data : shape,
          );
        });
        break;
      default:
        break;
    }
    emit('boardUpdate', delta);
  };

  const permission = collaborators?.collaborators.find((u) => u.userId === user?._id)?.role === 'edit'

  return (
    <div className='relative h-screen w-full'>
      <ToolBar />
      < CanvasMenu
        onSave={() => console.log('save')}
        isOwner={boardMeta?.boardMetadata.ownerId === user?._id}
      />       <PublicCanvas
        shapes={shapes}
        width={window.innerWidth}
        height={window.innerHeight}
        className='z-[-99999] h-full w-full'
        handleDelta={handleDelta}
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
