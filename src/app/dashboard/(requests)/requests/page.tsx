"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {DataTable} from "@/components/ui/data-table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {useCurrentUserRequests} from "@/hooks/query/collaboraion-request/useCurrentUserRequests";
import {useUser} from "@/hooks/query/user";
import {IBoard, ICollaborationRequest} from "@/types";
import {IUser} from "@/types/user.type";
import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown, MoreHorizontal, Trash} from "lucide-react";

interface IUserCollabRequest extends ICollaborationRequest {
	board: IBoard[];
	owner: IUser[];
}

export const column: ColumnDef<IUserCollabRequest>[] = [
	{
		accessorKey: "board",
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
		cell: ({row}) => {
			const board = row.getValue<IBoard[]>("board");
			return <span>{board[0]?.title}</span>;
		},
	},
	{
		accessorKey: "requestedAt",
		header: ({column}) => {
			return (
				<Button
					variant="ghost"
					className="hover:bg-transparent dark:hover:bg-transparent"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Requested At
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({row}) => {
			const formated = row.getValue<string>("requestedAt");
			return new Date(formated).toLocaleDateString();
		},
	},
	{
		accessorKey: "status",
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
		cell: ({row}) => {
			const status = row.getValue<"pending" | "accepted" | "rejected">(
				"status"
			);

			return (
				<Badge
					variant={
						status === "pending"
							? "default"
							: status === "rejected"
							? "destructive"
							: "success"
					}>
					{status}
				</Badge>
			);
		},
	},
	{
		accessorKey: "owner",
		header: "Author",
		cell: ({row}) => {
			const author =
				row.getValue<{username: string; avatarUrl: string | null}[]>("owner");
			return (
				<Tooltip>
					<TooltipTrigger>
						<Avatar className="cursor-pointer">
							<AvatarImage src={author[0].avatarUrl ?? ""} alt="user profile" />
							<AvatarFallback>
								{author[0]?.username?.split(" ")[0][0].toUpperCase()}
								{author[0]?.username?.split(" ")?.[1]?.[0].toUpperCase()}
							</AvatarFallback>
						</Avatar>
					</TooltipTrigger>
					<TooltipContent>{author[0]?.username}</TooltipContent>
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
							<Trash />
							Cancel Request
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export default function RequestsPage() {
	const {data: user} = useUser();
	const requests = useCurrentUserRequests(user?._id ?? "");
	return (
		<div className="p-2">
			<DataTable columns={column} data={requests?.data?.requests ?? []} />
		</div>
	);
}
