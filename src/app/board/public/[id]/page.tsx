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
import { AlertTriangle } from 'lucide-react';
import { useThrottle } from '@/hooks/useThrottle';
import { Pointer } from '@/components/ui/pointer';
import { toast } from 'sonner';

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
  const { data: collaborators } = useCollaborators(id);

  const [shapes, setShapes] = useState<Shape[]>([]);
  const [userPointer, setUserPointer] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [hideCustomCursor, setHideCustomCursor] = useState<boolean>(false);
  const [collaboratorsCursors, setCollaboratorsCursors] = useState<
    Map<string, { clientId: string; x: number; y: number; username: string }>
  >(new Map());
  const [lockedShapes, setLockedShapes] = useState<
    Record<PropertyKey, { uid: string; username: string }>
  >({});

  const action = useToolbarStore((state) => state.action);
  const isSelected = useToolbarStore((state) => state.isShapeSelected);

  const { socket, emit, on, socketDisconnect } = useSocket();
  const throttledMouse = useThrottle();

  useEffect(() => {
    if (!socket) return;

    emit('joinBoard', { boardId: id });
    emit('activeUsers');
    emit('lockedShapes', { boardId: id });

    const handleBoardState = (data: IBoardState) => {
      setShapes(Object.values(data.currentState));
    };

    const handleUserJoined = (data: { username: string; userId: string }) => {
      toast.info(`${data.username} joined board`, {
        position: 'top-left',
      });
      emit('activeUsers');
    };

    const handleUpdatedBoard = (data: IBoardState) => {
      setShapes(Object.values(data.currentState));
    };

    const handleActiveUsers = (
      data: { userId: string; username: string; clientId: string }[],
    ) => {
      const filteredUsers = data.filter((u) => u.userId !== user?._id);

      filteredUsers.forEach((item) => {
        const user = collaborators?.collaborators.find(
          (c) => c.userId === item.userId,
        );
        if (user?.role === 'view') return;
        setCollaboratorsCursors((prev) => {
          if (!prev.has(item.userId) && item.userId) {
            return prev.set(item.userId, {
              clientId: item.clientId,
              x: 0,
              y: 0,
              username: item.username,
            });
          }

          return prev;
        });
      });
    };

    const handleMouseMove = (data: {
      x: number;
      y: number;
      clientId: string;
      userId: string;
    }) => {
      setCollaboratorsCursors((prev) => {
        if (prev.has(data.userId)) {
          return prev.set(data.userId, {
            ...prev.get(data.userId)!,
            x: data.x,
            y: data.y,
          });
        }
        return prev;
      });
    };

    const handleLeaveUser = (data: {
      clientId: string;
      userId: string;
      username: string;
    }) => {
      setCollaboratorsCursors((prev) => {
        if (prev.has(data.userId)) {
          prev.delete(data.userId);
        }
        return prev;
      });
      toast.info(`${data.username} left`, { position: 'top-left' });
    };

    const handleLockedNewShape = (data: {
      shapeId: string;
      lockUser: { uid: string; username: string };
    }) => {
      const { shapeId, lockUser } = data;
      if (!user) return;
      setLockedShapes((prev) => ({ ...prev, [shapeId]: lockUser }));
    };

    const handleUnlockShape = (data: { shapeId: string }) => {
      const updatedLocks = { ...lockedShapes };
      delete updatedLocks[data.shapeId];
      setLockedShapes(updatedLocks);
    };

    const handleCurrentlyLockedShape = (
      data: Record<PropertyKey, { uid: string; username: string }>,
    ) => {
      setLockedShapes(data);
    };

    on('boardState', handleBoardState);
    on('userJoined', handleUserJoined);
    on('boardUpdate', handleUpdatedBoard);
    on('mouseMove', handleMouseMove);
    on('activeUsers', handleActiveUsers);
    on('userLeft', handleLeaveUser);
    on('lockedNewShape', handleLockedNewShape);
    on('unlockShape', handleUnlockShape);
    on('currentlyLockedShapes', handleCurrentlyLockedShape);

    return () => {
      socketDisconnect();
    };
  }, [socket]);

  useEffect(() => {
    const handleBeforeReload = () => {
      setShapes([]);
      emit('leaveBoard', { boardId: id });
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!permission) return;
      setUserPointer(() => ({ x: event.clientX, y: event.clientY }));
      throttledMouse(2000, () => {
        emit('mouseMove', { x: event.clientX, y: event.clientY });
      });
    };

    window.addEventListener('beforeunload', handleBeforeReload);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeReload);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [emit]);

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
        setShapes((prev) => prev.filter((shape) => shape.id !== delta.data.id));
        break;
      default:
        break;
    }
    emit('boardUpdate', { ...delta, shapeId: delta.data.id });
  };

  const currentUser = collaborators?.collaborators.find(
    (u) => u.userId === user?._id,
  );

  const permission =
    currentUser?.role === 'edit' ||
    boardMeta?.boardMetadata.owner._id === user?._id;

  const handleCursorHideHandler = () => {
    setHideCustomCursor(true);
  };

  const handleCursorShowHandler = () => {
    setHideCustomCursor(false);
  };

  const handleShapeSelect = (shapeId: string) => {
    emit('selectShape', { shapeId });
  };

  const handleShapeDisSelect = (shapeId: string) => {
    emit('unlockShape', { shapeId });
  };

  console.log(lockedShapes);

  return (
    <div
      className={`relative h-screen w-full ${hideCustomCursor ? 'cursor-auto' : 'cursor-none'}`}
    >
      {!hideCustomCursor ? (
        permission ? (
          <Pointer
            x={userPointer.x}
            y={userPointer.y}
            color='red'
            username='You'
          />
        ) : null
      ) : null}
      {collaboratorsCursors
        ? Array.from(collaboratorsCursors)?.map(([key, value]) => (
            <Pointer {...value} color='blue' key={key} className='z-0' />
          ))
        : null}
      {permission ? (
        <div
          onMouseEnter={handleCursorHideHandler}
          onMouseLeave={handleCursorShowHandler}
        >
          <ToolBar />
        </div>
      ) : (
        <div className='bg-destructive/30 outline-destructive/50 fixed top-5 left-1/2 z-10 h-10 w-fit -translate-x-1/2 rounded-md p-2 outline-2'>
          <div className='flex items-center justify-between gap-4'>
            <AlertTriangle className='' />
            <span className='text-sm'>You don't have permission to edit</span>
          </div>
        </div>
      )}
      <div
        onMouseEnter={handleCursorHideHandler}
        onMouseLeave={handleCursorShowHandler}
      >
        <CanvasMenu
          onSave={() => console.log('save')}
          isOwner={boardMeta?.boardMetadata.ownerId === user?._id}
        />
      </div>
      <div>
        <PublicCanvas
          lockedShapes={lockedShapes}
          shapes={shapes}
          width={window.innerWidth}
          height={window.innerHeight}
          className='z-[-99999] h-full w-full'
          handleDelta={handleDelta}
          setShapes={setShapes}
          canEdit={permission}
          onShapeSelect={handleShapeSelect}
          onShapeDisSelect={handleShapeDisSelect}
        />
      </div>
      {!['free', 'eraser'].includes(action) ||
      (action === 'select' && isSelected) ? (
        permission ? (
          <div
            className='absolute bottom-5 left-1/2 -translate-x-1/2'
            onMouseEnter={handleCursorHideHandler}
            onMouseLeave={handleCursorShowHandler}
          >
            <Customize
              onPropertyChange={(prop) => {
                console.log(prop);
              }}
            />
          </div>
        ) : null
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
