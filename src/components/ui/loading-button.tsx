import { Loader2 } from 'lucide-react';
import { Button } from './button';
import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib';

interface ILoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const LoadingButton = ({
  children,
  loading = false,
  className,
  ...props
}: ILoadingButtonProps) => {
  return (
    <Button className={cn(className)} {...props}>
      {children}
      {loading ? <Loader2 className='size-5 animate-spin' /> : null}
    </Button>
  );
};
