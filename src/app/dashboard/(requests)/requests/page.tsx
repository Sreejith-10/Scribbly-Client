'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useRemoveRequest } from '@/hooks/mutation/collaboration-request';
import { useCurrentUserRequests } from '@/hooks/query/collaboraion-request/useCurrentUserRequests';
import { useUser } from '@/hooks/query/user';
import {
  CollaborationRequestStatusType,
  IBoard,
  ICollaborationRequest,
} from '@/types';
import { IUser } from '@/types/user.type';
import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  DoorOpen,
  Loader,
  MoreHorizontal,
  Trash,
  UserPlus,
} from 'lucide-react';
import { ReactNode } from 'react';
import { toast } from 'sonner';

interface IUserCollabRequest extends ICollaborationRequest {
  board: IBoard[];
  owner: IUser[];
}

export default function RequestsPage() {
  const { data: user } = useUser();
  const { data: requests, isLoading } = useCurrentUserRequests(user?._id ?? '');
  const { mutate } = useRemoveRequest();

  const removeCollaborationRequest = (boardId: string) => {
    if (user)
      mutate(
        { boardId, userId: user?._id },
        {
          onSuccess: () => {
            toast.success('Request removed');
          },
          onError: () => {
            toast.error('Something went wrong');
          },
        },
      );
  };

  const column: ColumnDef<IUserCollabRequest>[] = [
    {
      accessorKey: 'board',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            className='hover:bg-transparent dark:hover:bg-transparent'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Title
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        const board = row.getValue<IBoard[]>('board');
        if (board.length === 0) {
          return <span>Board no longer exist</span>;
        }
        return <span>{board[0]?.title}</span>;
      },
    },
    {
      accessorKey: 'requestedAt',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            className='hover:bg-transparent dark:hover:bg-transparent'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Requested At
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        const formated = row.getValue<string>('requestedAt');
        return new Date(formated).toLocaleDateString();
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            className='hover:bg-transparent dark:hover:bg-transparent'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Status
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        const status = row.getValue<'pending' | 'accepted' | 'rejected'>(
          'status',
        );

        return (
          <Badge
            variant={
              status === 'pending'
                ? 'default'
                : status === 'rejected'
                  ? 'destructive'
                  : 'success'
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'owner',
      header: 'Author',
      cell: ({ row }) => {
        const author =
          row.getValue<{ username: string; avatarUrl: string | null }[]>(
            'owner',
          );
        if (author.length === 0) {
          return <span>Board removed</span>;
        }
        return (
          <Tooltip>
            <TooltipTrigger>
              <Avatar className='cursor-pointer'>
                <AvatarImage
                  src={author[0].avatarUrl ?? ''}
                  alt='user profile'
                />
                <AvatarFallback>
                  {author[0]?.username?.split(' ')[0][0].toUpperCase()}
                  {author[0]?.username?.split(' ')?.[1]?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>{author[0]?.username}</TooltipContent>
          </Tooltip>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const actions: Record<CollaborationRequestStatusType, ReactNode> = {
          accepted: (
            <DropdownMenuItem className='cursor-pointer'>
              <DoorOpen />
              Leave board
            </DropdownMenuItem>
          ),
          pending: (
            <DropdownMenuItem className='cursor-pointer'>
              <Trash />
              Cancel Request
            </DropdownMenuItem>
          ),
          rejected: (
            <DropdownMenuItem className='cursor-pointer'>
              <UserPlus />
              Request again
            </DropdownMenuItem>
          ),
        };
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='cursor-pointer' align='end'>
              <DropdownMenuLabel className='font-semibold'>
                Actions
              </DropdownMenuLabel>
              {actions[row.original.status]}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='cursor-pointer'
                onClick={() => {
                  removeCollaborationRequest(row.original.boardId);
                }}
              >
                <Trash />
                Remove request
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className='p-4'>
      {isLoading ? (
        <span className='inline-block h-full w-full py-8'>
          <Loader className='m-auto size-10 animate-spin' />
        </span>
      ) : (
        <DataTable
          columns={column}
          data={requests?.requests ?? []}
          searchKey='board'
        />
      )}
    </div>
  );
}
