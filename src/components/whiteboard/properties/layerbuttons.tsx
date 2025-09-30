import { Button } from '@/components/ui/button';
import {
  LuArrowDown,
  LuArrowDownToLine,
  LuArrowUp,
  LuArrowUpToLine,
} from 'react-icons/lu';

export const LayerButtons = () => {
  return (
    <div className='h-full space-x-3'>
      <Button
        variant={'outline'}
        className='inline-grid h-full cursor-pointer place-content-center rounded-md border border-slate-200 hover:border hover:border-slate-200'
      >
        <LuArrowDown />
      </Button>
      <Button
        variant={'outline'}
        className='inline-grid h-full cursor-pointer place-content-center rounded-md border border-slate-200 hover:border hover:border-slate-200'
      >
        <LuArrowUp />
      </Button>
      <Button
        variant={'outline'}
        className='inline-grid h-full cursor-pointer place-content-center rounded-md border border-slate-200 hover:border hover:border-slate-200'
      >
        <LuArrowDownToLine />
      </Button>
      <Button
        variant={'outline'}
        className='inline-grid h-full cursor-pointer place-content-center rounded-md border border-slate-200 hover:border hover:border-slate-200'
      >
        <LuArrowUpToLine />
      </Button>
    </div>
  );
};
