import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { StrokeWidth } from '@/types';

export const LineThickness = ({ thickness = 5 }: { thickness?: number }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className='grid size-6 cursor-pointer place-content-center rounded border-2 shadow-lg ring-2 ring-offset-1 transition-transform duration-200 hover:scale-110'>
          <span className='inline-block h-[2px] w-5 rounded-md border border-black' />
        </div>
      </PopoverTrigger>
      <PopoverContent className='mb-4 flex w-auto flex-col items-center gap-1'>
        <div className='mb-3 flex items-center justify-between text-center'>
          <h2 className='text-lg font-semibold'>Stroke thickenss</h2>
        </div>
        <div className='flex gap-2'>
          {Object.values(StrokeWidth)
            .filter((stroke) => Number(stroke))
            .map((stroke) => (
              <Button
                key={stroke}
                variant='outline'
                className='inline-grid size-10 cursor-pointer place-content-center rounded-md border border-slate-200 hover:border hover:border-slate-200'
              >
                <span
                  className='inline-block w-5 rounded-md bg-black'
                  style={{ height: `${stroke}px` }}
                />
              </Button>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
