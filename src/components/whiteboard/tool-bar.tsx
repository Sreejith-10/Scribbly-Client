import {
  LuDiamond,
  LuMousePointer2,
  LuPencil,
  LuTextCursor,
} from 'react-icons/lu';
import { FaRegSquare, FaRegCircle } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';
import { GoDash } from 'react-icons/go';
import { IoImageOutline } from 'react-icons/io5';
import { BiEraser } from 'react-icons/bi';
import { ReactNode } from 'react';
import { ActionType } from '@/types';
import { Hand } from 'lucide-react';
import { useToolbarStore } from '@/stores/canvas';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface Tools {
  icon: ReactNode;
  value: ActionType;
}

const tools = [
  {
    icon: <LuMousePointer2 />,
    value: ActionType.SELECT,
  },
  {
    icon: <FaRegSquare />,
    value: ActionType.RECTANGLE,
  },
  {
    icon: <FaRegCircle />,
    value: ActionType.CIRCLE,
  },
  {
    icon: <LuDiamond />,
    value: ActionType.DIAMOND,
  },
  {
    icon: <FaArrowRight />,
    value: ActionType.ARROW,
  },
  {
    icon: <GoDash />,
    value: ActionType.LINE,
  },
  {
    icon: <LuPencil />,
    value: ActionType.PENCIL,
  },
  {
    icon: <LuTextCursor />,
    value: ActionType.TEXT,
  },
  {
    icon: <IoImageOutline />,
    value: ActionType.IMAGE,
  },
  {
    icon: <BiEraser />,
    value: ActionType.ERASER,
  },
] satisfies Tools[];

export const ToolBar = () => {
  const { action, setAction, setToolSelected } = useToolbarStore();

  return (
    <div className='bg-secondary fixed top-5 left-1/2 z-9 h-auto w-fit -translate-x-1/2 rounded-lg border p-2 shadow-md'>
      <div className='flex w-full cursor-pointer gap-2'>
        <div className='relative'>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                onClick={() => {
                  setAction('free' as ActionType);
                  if (!['select', 'eraser', 'free'].includes('free')) {
                    setToolSelected(true);
                  } else {
                    setToolSelected(false);
                  }
                }}
                aria-label={'free'}
                className={`hover:bg-primary/90 flex size-8 items-center justify-center rounded-md ${
                  action === 'free' ? 'bg-primary' : 'bg-secondary'
                }`}
              >
                <Hand className='size-5' />
              </div>
            </TooltipTrigger>
            <TooltipContent>free</TooltipContent>
          </Tooltip>
        </div>
        {tools.map((tool, index) => (
          <div key={index} className='relative'>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  onClick={() => {
                    setAction(tool.value as ActionType);
                    if (!['select', 'eraser', 'free'].includes(tool.value)) {
                      setToolSelected(true);
                    } else {
                      setToolSelected(false);
                    }
                  }}
                  aria-label={tool.value}
                  className={`hover:bg-primary/90 flex size-8 items-center justify-center rounded-md ${
                    action === tool.value ? 'bg-primary' : 'bg-secondary'
                  }`}
                >
                  {tool.icon}
                </div>
              </TooltipTrigger>
              <TooltipContent>{tool.value as string}</TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};
