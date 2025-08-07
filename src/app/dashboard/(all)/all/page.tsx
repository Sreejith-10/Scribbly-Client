'use client';

import { useState } from 'react';
import {
  Plus,
  ArrowUpDown,
  LinkIcon,
  Pencil,
  Trash,
  Loader,
  HandHelping,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { BoardCreation } from '@/components/dashboard/board-creation';
import { IBoardMetadata } from '@/types';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useBoardMetadatas } from '@/hooks/query/board';
import { toast } from 'sonner';
import Link from 'next/link';
import { deleteBoard } from '@/controllers/board';
import { AxiosError } from 'axios';
import { queryClient } from '@/lib';
import { queryKeys } from '@/lib/query-keys';
import { useUser } from '@/hooks/query/user';

function CreateBoardDialog({ onclick }: { onclick: () => void }) {
  return (
    <Card
      onClick={() => onclick()}
      className='group border-muted-foreground/25 hover:border-primary hover:bg-muted/50 cursor-pointer border-2 border-dashed transition-all'
    >
      <CardContent className='flex h-48 flex-col items-center justify-center p-6'>
        <Plus className='text-muted-foreground group-hover:text-primary size-8' />
        <h3 className='mt-2 font-medium'>Create new board</h3>
        <p className='text-muted-foreground text-sm'>
          Start with a blank canvas
        </p>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { data, isLoading } = useBoardMetadatas('all');
  const { data: user } = useUser();

  const column: ColumnDef<IBoardMetadata>[] = [
    {
      accessorKey: 'title',
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
        const id = row.original.boardId;
        const access = row.original.accessMode;
        const link = `/board/${access}/${id}`;
        return <Link href={link}>{row.original.title}</Link>;
      },
    },
    {
      accessorKey: 'accessMode',
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
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            className='hover:bg-transparent dark:hover:bg-transparent'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Created
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        const createdDate: Date = row.getValue('createdAt');
        return new Date(createdDate).toLocaleDateString();
      },
    },
    {
      accessorKey: 'updatedAt',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            className='hover:bg-transparent dark:hover:bg-transparent'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Updated
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        const createdDate: Date = row.getValue('updatedAt');
        return new Date(createdDate).toLocaleDateString();
      },
    },
    {
      accessorKey: 'owner',
      header: 'Author',
      cell: ({ row }) => {
        const author = row.getValue<{
          username: string;
          avatarUrl: string | null;
        }>('owner');
        return (
          <Tooltip>
            <TooltipTrigger>
              <Avatar className='cursor-pointer'>
                <AvatarImage src={author.avatarUrl ?? ''} alt='user profile' />
                <AvatarFallback>
                  {author.username.split(' ')[0][0].toUpperCase()}
                  {author.username.split(' ')?.[1]?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>{author.username}</TooltipContent>
          </Tooltip>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
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
              {user?._id === row.original.ownerId &&
                row.original.accessMode !== 'private' ? (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.replace(
                      `/dashboard/board-status/${row.original.boardId}`,
                    );
                  }}
                >
                  <HandHelping />
                  Manage
                </DropdownMenuItem>
              ) : null}
              {user?._id === row.original.ownerId &&
                row.original.accessMode !== 'private' ? (
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={(e) => {
                    e.stopPropagation();
                    const url = process.env.NEXT_PUBLIC_CLIENT_URL;
                    const clipUrl = `${url}/board/link?boardId=${row.original.boardId}&status=${row.original.accessMode}`;
                    navigator.clipboard.writeText(clipUrl);
                    toast.success('Link copies');
                  }}
                >
                  <LinkIcon />
                  Copy Link
                </DropdownMenuItem>
              ) : null}
              {user?._id === row.original.ownerId ? (
                <DropdownMenuItem className='cursor-pointer'>
                  <Pencil />
                  Edit
                </DropdownMenuItem>
              ) : null}
              {user?._id !== row.original.ownerId ? (
                <DropdownMenuItem>
                  <LogOut />
                  Leave
                </DropdownMenuItem>
              ) : null}
              {user?._id === row.original.ownerId ? (
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      const res = await deleteBoard(row.original.boardId);
                      queryClient.invalidateQueries({
                        queryKey: queryKeys.boardMetadatas.query('all'),
                      });
                      toast.success(res.message);
                    } catch (error) {
                      const e = error as AxiosError;
                      toast.error(e.message);
                    }
                  }}
                >
                  <Trash />
                  Delete
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  console.log(data?.boardMetadatas);

  return (
    <>
      <BoardCreation
        open={openDialog}
        setOpen={(state: boolean) => setOpenDialog(state)}
      />

      <div className='flex flex-1 flex-col gap-4 p-4'>
        <div className='hidden w-max grid-cols-2 gap-4 md:grid'>
          <CreateBoardDialog
            onclick={() => {
              setOpenDialog(true);
            }}
          />
        </div>
        <div className='h-max w-full'>
          {isLoading ? (
            <span className='inline-block h-full w-full py-8'>
              <Loader className='m-auto size-10 animate-spin' />
            </span>
          ) : (
            <DataTable columns={column} data={data?.boardMetadatas ?? []} />
          )}
        </div>
      </div>
    </>
  );
}
