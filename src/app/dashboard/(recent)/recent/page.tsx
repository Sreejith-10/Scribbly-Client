"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {DataTable} from "@/components/ui/data-table";
import {
	LinkIcon,
	Pencil,
	Trash,
	ArrowUpDown,
	Loader,
	MoreHorizontal,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {useBoardMetadata} from "@/hooks/query/board";
import {IBoardMetadata} from "@/types";
import {ColumnDef} from "@tanstack/react-table";
import {usePathname} from "next/navigation";

export const column: ColumnDef<IBoardMetadata>[] = [
	{
		accessorKey: "title",
		header: ({column}) => {
			return (
				<Button
					variant="ghost"
					className="hover:bg-transparent dark:hover:bg-transparent"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Title
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "accessMode",
		header: ({column}) => {
			return (
				<Button
					variant="ghost"
					className="hover:bg-transparent dark:hover:bg-transparent"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Status
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: ({column}) => {
			return (
				<Button
					variant="ghost"
					className="hover:bg-transparent dark:hover:bg-transparent"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Created
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({row}) => {
			const createdDate: Date = row.getValue("createdAt");
			return new Date(createdDate).toLocaleDateString();
		},
	},
	{
		accessorKey: "updatedAt",
		header: ({column}) => {
			return (
				<Button
					variant="ghost"
					className="hover:bg-transparent dark:hover:bg-transparent"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Updated
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({row}) => {
			const createdDate: Date = row.getValue("updatedAt");
			return new Date(createdDate).toLocaleDateString();
		},
	},
	{
		accessorKey: "owner",
		header: "Author",
		cell: ({row}) => {
			const author = row.getValue<{username: string; avatarUrl: string | null}>(
				"owner"
			);
			return (
				<Tooltip>
					<TooltipTrigger>
						<Avatar className="cursor-pointer">
							<AvatarImage src={author.avatarUrl ?? ""} alt="user profile" />
							<AvatarFallback>
								{author.username.split(" ")[0][0].toUpperCase()}
								{author.username.split(" ")?.[1]?.[0].toUpperCase()}
							</AvatarFallback>
						</Avatar>
					</TooltipTrigger>
					<TooltipContent>{author.username}</TooltipContent>
				</Tooltip>
			);
		},
	},
	{
		id: "actions",
		cell: ({row}) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="cursor-pointer" align="end">
						<DropdownMenuLabel className="font-semibold">
							Actions
						</DropdownMenuLabel>
						<DropdownMenuItem className="cursor-pointer">
							<LinkIcon />
							Copy Link
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer">
							<Pencil />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer">
							<Trash />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export default function Page() {
	const path = usePathname();

	const {data, isLoading} = useBoardMetadata();

	return (
		<div className="p-4">
			<div className="w-full h-max">
				{isLoading ? (
					<span className="inline-block w-full h-full py-8">
						<Loader className="size-10 animate-spin m-auto" />
					</span>
				) : (
					<DataTable columns={column} data={data?.boardMetadatas ?? []} />
				)}
			</div>
		</div>
	);
}
