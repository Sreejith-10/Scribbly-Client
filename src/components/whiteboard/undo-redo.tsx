import { useCanvasStore } from '@/stores/canvas/useCanvasStore';
import { Minus, Plus } from 'lucide-react';
import { BiRedo, BiUndo } from 'react-icons/bi';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useShapeActions } from '@/hooks/mutation/shape';
import { useParams } from 'next/navigation';

export const UndoRedo = () => {
  const { id }: { id: string } = useParams();

  const zoom = useCanvasStore((state) => state.zoom);
  const setZoom = useCanvasStore((state) => state.setZoom);

  const { undo, redo } = useShapeActions(id);

  return (
    <div className='bg-secondary absolute z-9999 flex h-auto w-max cursor-pointer gap-3 rounded-lg border px-4 py-2'>
      <div className='flex gap-2'>
        <Tooltip>
          <TooltipContent>undo</TooltipContent>
          <TooltipTrigger onClick={() => undo.mutate(id)}>
            <BiUndo className='size-6 cursor-pointer' />
          </TooltipTrigger>
        </Tooltip>
        <Tooltip>
          <TooltipContent>redo</TooltipContent>
          <TooltipTrigger onClick={() => redo.mutate(id)}>
            <BiRedo className='size-6 cursor-pointer' />
          </TooltipTrigger>
        </Tooltip>
      </div>
      <div className='flex gap-2'>
        <Plus
          className='active:rounded-full active:bg-slate-200'
          onClick={() => {
            if (zoom < 200) setZoom(zoom + 10);
          }}
        />
        <span className='pointer-events-none inline-block font-bold'>
          {zoom}%
        </span>
        <Minus
          className='active:rounded-full active:bg-slate-200'
          onClick={() => {
            if (zoom > 10) setZoom(zoom - 10);
          }}
        />
      </div>
    </div>
  );
};
