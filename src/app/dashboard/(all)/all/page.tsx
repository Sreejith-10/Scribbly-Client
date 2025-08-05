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
            <DropdownMenuItem className='cursor-pointer'>
              <Pencil />
              Edit
            </DropdownMenuItem>
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
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function Dashboard() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { data, isLoading } = useBoardMetadatas();

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
        {/* <Tabs defaultValue="all" className="w-full">
							<TabsList className="grid w-full grid-cols-4">
								<TabsTrigger value="all">All Boards</TabsTrigger>
								<TabsTrigger value="recent">Recent</TabsTrigger>
								<TabsTrigger value="private">Private</TabsTrigger>
								<TabsTrigger value="public">Public</TabsTrigger>
							</TabsList>
							<TabsContent value="all" className="space-y-4">
								<div className="flex items-center justify-between">
									<h2 className="text-lg font-semibold">All boards</h2>
									<div className="flex items-center gap-2">
										<Button variant="ghost" size="sm">
											Sort by
										</Button>
									</div>
								</div>
								<div
									className={`grid gap-4 ${
										viewMode === "grid"
											? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
											: "grid-cols-1"
									}`}>
									<CreateBoardDialog onclick={() => setOpenDialog(true)} />
									{data?.boardMetadatas.map((board) => (
										<Link
											href={`/board/${
												board.accessMode === "private" ? "private" : "public"
											}/${board.boardId}`}
											key={board.boardId}>
											<BoardCard board={board} type="recent" />
										</Link>
									))}
								</div>
							</TabsContent>
							<TabsContent value="recent" className="space-y-4">
								<div className="flex items-center justify-between">
									<h2 className="text-lg font-semibold">Recent boards</h2>
									<Button variant="ghost" size="sm">
										View all
									</Button>
								</div>
								<div
									className={`grid gap-4 ${
										viewMode === "grid"
											? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
											: "grid-cols-1"
									}`}>
									<CreateBoardDialog onclick={() => setOpenDialog(true)} />
									{data?.boardMetadatas
										.sort((a, b) => {
											const d1 = new Date(a.createdAt);
											const d2 = new Date(b.createdAt);
											return d1.getTime() - d2.getTime();
										})
										.map((board) => (
											<Link
												href={`/board/${
													board.accessMode === "private" ? "private" : "public"
												}/${board.boardId}`}
												key={board.boardId}>
												<BoardCard board={board} type="recent" />
											</Link>
										))}
								</div>
							</TabsContent>
							<TabsContent value="private" className="space-y-4">
								<div className="flex items-center justify-between">
									<h2 className="text-lg font-semibold">Private</h2>
									<Button variant="ghost" size="sm">
										View all
									</Button>
								</div>
								<div
									className={`grid gap-4 ${
										viewMode === "grid"
											? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
											: "grid-cols-1"
									}`}>
									<CreateBoardDialog onclick={() => setOpenDialog(true)} />
									{data?.boardMetadatas
										.filter((meta) => meta.accessMode === "private")
										.map((board) => (
											<Link
												href={`/board/${
													board.accessMode === "private" ? "private" : "public"
												}/${board.boardId}`}
												key={board.boardId}>
												<BoardCard board={board} type="private" />
											</Link>
										))}
								</div>
							</TabsContent>
							<TabsContent value="public" className="space-y-4">
								<div className="flex items-center justify-between">
									<h2 className="text-lg font-semibold">Public</h2>
									<Button variant="ghost" size="sm">
										View all
									</Button>
								</div>
								<div
									className={`grid gap-4 ${
										viewMode === "grid"
											? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
											: "grid-cols-1"
									}`}>
									<CreateBoardDialog onclick={() => setOpenDialog(true)} />
									{data?.boardMetadatas
										.filter((meta) => meta.accessMode === "public")
										.map((board) => (
											<Link
												href={`/board/${
													board.accessMode === "private" ? "private" : "public"
												}/${board.boardId}`}
												key={board.boardId}>
												<BoardCard board={board} type="public" />
											</Link>
										))}
								</div>
							</TabsContent>
						</Tabs> */}
      </div>
    </>
  );
}
