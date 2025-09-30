import { cn } from '@/lib';
import { IoLogoGoogle } from 'react-icons/io';
import { Button } from '../ui/button';

export const GoogleAuth = ({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) => {
  return (
    <Button
      variant='outline'
      className={cn(
        'hover:bg-accent hover:text-accent-foreground grid h-auto w-full place-content-center rounded-md border py-2 shadow-xs',
        className,
      )}
    >
      <IoLogoGoogle className='size-6' />
      {title}
    </Button>
  );
};
