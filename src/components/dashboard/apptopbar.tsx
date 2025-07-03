"use client";

import Link from "next/link";
import {Separator} from "../ui/separator";
import {SidebarTrigger} from "../ui/sidebar";
import {ThemeToggle} from "../ui/theme-toggle";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";
import {useUserQuery} from "@/hooks/query/useUserState";

export function Topbar() {
	const {data} = useUserQuery();

	return (
		<>
			<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mr-2 h-4" />
				<div className="flex flex-1 items-center gap-2">
					<div>
						<Link href="/dashboard/all">All</Link>
					</div>
					<div>
						<Link href="/dashboard/recent">recent</Link>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<ThemeToggle />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Avatar className="size-8 cursor-pointer">
								<AvatarImage src="/placeholder-user.jpg" />
								<AvatarFallback>{data?.username.split(" ")[0]}</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Sign out</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<div className="md:hidden flex w-full items-center justify-start py-3 px-6 gap-3">
				<div className="bg-secondary p-1 rounded-md border-2">
					<Link href="/dashboard/all">All</Link>
				</div>
				<div className="bg-secondary p-1 rounded-md border-2">
					<Link href="/dashboard/recent">recent</Link>
				</div>
			</div>
		</>
	);
}
