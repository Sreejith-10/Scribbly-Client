'use client';

import { CanvasMenu } from '@/components/whiteboard/canvas-menu';
import { Customize } from '@/components/whiteboard/customize';
import { ToolBar } from '@/components/whiteboard/tool-bar';
import { UndoRedo } from '@/components/whiteboard/undo-redo';
import { useShapeActions } from '@/hooks/mutation/shape/useShapeActions';
import { useBoardState } from '@/hooks/query/board';
import { useToolbarStore } from '@/stores/canvas/useToolbarStore';
import { DeltaProp } from '@/types';
import { Loader } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const PrivateCanvas = dynamic(
  () => import('@/components/whiteboard/private-canvas'),
  {
    ssr: false,
  },
);

export default function Page() {
  const action = useToolbarStore((state) => state.action);
  const isShapeSelected = useToolbarStore((state) => state.isShapeSelected);
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isFetched } = useBoardState(id);
  const {
    addNewShape,
    editShape,
    removeShape,
    snapShot,
    resizeShape,
    moveShape,
  } = useShapeActions(id);
  console.log(data);
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

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className='relative h-screen w-full'>
      <>
        <ToolBar />
        <CanvasMenu onSave={snapShot.mutate} />
        <PrivateCanvas
          width={window.innerWidth}
          height={window.innerHeight}
          className='h-full w-full'
          shapes={Object.values(data?.currentState ?? [])}
          handleDelta={(shape) => deltaActions(shape)}
        />
        {!['free', 'eraser'].includes(action) ? (
          <div className='absolute bottom-5 left-1/2 -translate-x-1/2'>
            <Customize />
          </div>
        ) : null}

        <div className='fixed bottom-14 left-5'>
          <UndoRedo />
        </div>
      </>
    </div>
  );
}
