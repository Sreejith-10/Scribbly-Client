'use client';

import { useCreateBoard } from '@/hooks/mutation/board';
import { createBoardSchema } from '@/schema';
import { IBoardMetadata } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { LoadingButton } from '../ui/loading-button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

interface IEditBoardProps {
  open: boolean;
  setOpen: (state: boolean) => void;
  defaultValues: IBoardMetadata | null;
}

export const EditBoard = ({
  open,
  setOpen,
  defaultValues,
}: IEditBoardProps) => {
  const form = useForm<z.infer<typeof createBoardSchema>>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      description: defaultValues?.description ?? '',
      accessMode: defaultValues?.accessMode ?? 'private',
    },
  });

  const router = useRouter();

  const { mutate, isPending } = useCreateBoard();

  const submitHandler = (values: z.infer<typeof createBoardSchema>) => {
    console.log(values === defaultValues);
    return;
    mutate(
      {
        title: values.title,
        description: values.description,
        accessMode: values.accessMode,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          router.push(
            `/board/${
              response?.board?.board?.accessMode === 'private'
                ? 'private'
                : 'public'
            }/${response?.board?.board?._id}`,
          );
        },
        onError: (error) => {
          console.log({ error });
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent className='flex flex-col gap-3'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className='space-y-3'
          >
            <DialogHeader>
              <DialogTitle className='text-center'>
                Create new board
              </DialogTitle>
              <DialogDescription className='text-center'>
                create your new board add collaborate with others
              </DialogDescription>
            </DialogHeader>
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl {...field}>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl {...field}>
                      <Textarea
                        {...field}
                        placeholder=''
                        className='resize-none'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='accessMode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Access mode</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='bg-secondary w-full'>
                          <SelectValue defaultValue='' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='private'>
                            <Lock />
                            Private
                          </SelectItem>
                          <SelectItem value='public'>
                            <User />
                            Public
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className='text-center'>
              <LoadingButton
                type='submit'
                loading={isPending}
                className='w-full'
              >
                Create
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
